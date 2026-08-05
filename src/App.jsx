import { Toaster } from "@/components/ui/toaster"
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PageNotFound from './lib/PageNotFound';
import RedirectHandler from './lib/RedirectHandler';
import ErrorBoundary from './lib/ErrorBoundary';
import ServerError from './lib/ServerError';
// Lazy-loaded pages (reduces initial bundle size — ~475 KiB savings on Home page)
const SEODashboard = lazy(() => import('./pages/SEODashboard'));
const SiteImages = lazy(() => import('./pages/SiteImages'));
const BlogAdmin = lazy(() => import('./pages/BlogAdmin'));
const ConversionDashboard = lazy(() => import('./pages/ConversionDashboard'));
const CRM = lazy(() => import('./pages/CRM'));
const AgentChat = lazy(() => import('./pages/AgentChat'));
const TikTokSync = lazy(() => import('./pages/TikTokSync'));
const Estimate = lazy(() => import('./pages/Estimate'));
const LandingCoreServices = lazy(() => import('./pages/LandingCoreServices'));
const LandingPricing = lazy(() => import('./pages/LandingPricing'));
const BathroomRemodelingBrandon = lazy(() => import('./pages/BathroomRemodelingBrandon'));
const MadisonRemodeling = lazy(() => import('./pages/MadisonRemodeling'));
const SmsOptin = lazy(() => import('./pages/SmsOptin'));
const LandingBrandonCustomHomeBuilder = lazy(() => import('./pages/LandingBrandonCustomHomeBuilder'));
const CustomHomeBuilding = lazy(() => import('./pages/services/CustomHomeBuilding'));
const RoomAdditions = lazy(() => import('./pages/services/RoomAdditions'));
const OutdoorLiving = lazy(() => import('./pages/services/OutdoorLiving'));
const BarndominiumsService = lazy(() => import('./pages/services/BarndominiumsService'));
const EmergencyRepairs = lazy(() => import('./pages/services/EmergencyRepairs'));
const KitchenRemodeling = lazy(() => import('./pages/services/KitchenRemodeling'));
const BathroomRemodeling = lazy(() => import('./pages/services/BathroomRemodeling'));
const HistoricHomeRestoration = lazy(() => import('./pages/HistoricHomeRestoration'));
const RemodelingBrandonMS = lazy(() => import('./pages/RemodelingBrandonMS'));
const ProTipDetail = lazy(() => import('./pages/ProTipDetail'));
const JobCheckin = lazy(() => import('./pages/JobCheckin'));
const JobsiteDetail = lazy(() => import('./pages/JobsiteDetail'));
const Leads = lazy(() => import('./pages/Leads'));
const FunnelAnalysis = lazy(() => import('./pages/FunnelAnalysis'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
import AdminRoute from './components/AdminRoute';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import HeadingHierarchyChecker from '@/components/seo/HeadingHierarchyChecker';
import WebVitalsReporter from '@/components/perf/WebVitalsReporter';
import PerformanceAuditor from '@/components/perf/PerformanceAuditor';
import LowercaseRedirect from '@/components/LowercaseRedirect';
import CanonicalRedirect from '@/components/CanonicalRedirect';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}><Suspense fallback={<PageLoader />}>{children}</Suspense></Layout>
  : <Suspense fallback={<PageLoader />}>{children}</Suspense>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {/* Admin routes — auth-gated via AdminRoute, rendered before the pagesConfig loop */}
      <Route path="/crm" element={<LayoutWrapper currentPageName="CRM"><AdminRoute><CRM /></AdminRoute></LayoutWrapper>} />
      <Route path="/agentchat" element={<LayoutWrapper currentPageName="AgentChat"><AdminRoute><AgentChat /></AdminRoute></LayoutWrapper>} />
      <Route path="/tiktoksync" element={<LayoutWrapper currentPageName="TikTokSync"><AdminRoute><TikTokSync /></AdminRoute></LayoutWrapper>} />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path.toLowerCase()}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/seodashboard" element={<LayoutWrapper currentPageName="SEODashboard"><AdminRoute><SEODashboard /></AdminRoute></LayoutWrapper>} />
      <Route path="/funnelanalysis" element={<LayoutWrapper currentPageName="FunnelAnalysis"><AdminRoute><FunnelAnalysis /></AdminRoute></LayoutWrapper>} />
      <Route path="/estimate" element={<LayoutWrapper currentPageName="Estimate"><Estimate /></LayoutWrapper>} />
      <Route path="/contactform" element={<Navigate to="/estimate" replace />} />
      <Route path="/thank-you" element={<LayoutWrapper currentPageName="ThankYou"><ThankYou /></LayoutWrapper>} />
      <Route path="/leads" element={<LayoutWrapper currentPageName="Leads"><AdminRoute><Leads /></AdminRoute></LayoutWrapper>} />
      <Route path="/siteimages" element={<LayoutWrapper currentPageName="SiteImages"><AdminRoute><SiteImages /></AdminRoute></LayoutWrapper>} />
      <Route path="/blogadmin" element={<LayoutWrapper currentPageName="BlogAdmin"><AdminRoute><BlogAdmin /></AdminRoute></LayoutWrapper>} />
      <Route path="/conversiondashboard" element={<LayoutWrapper currentPageName="ConversionDashboard"><AdminRoute><ConversionDashboard /></AdminRoute></LayoutWrapper>} />
      <Route path="/projects/historic-home-restoration" element={<LayoutWrapper currentPageName="HistoricHomeRestoration"><HistoricHomeRestoration /></LayoutWrapper>} />
      <Route path="/quote" element={<Navigate to="/estimate" replace />} />
      <Route path="/customertestimonials" element={<Navigate to="/about" replace />} />
      <Route path="/landingtrust" element={<Navigate to="/about" replace />} />
      <Route path="/remodeling-ms" element={<LayoutWrapper currentPageName="LandingCoreServices"><LandingCoreServices /></LayoutWrapper>} />
      <Route path="/remodeling-brandon-ms" element={<LayoutWrapper currentPageName="RemodelingBrandonMS"><RemodelingBrandonMS /></LayoutWrapper>} />
      <Route path="/landingbrandonremodelers" element={<Navigate to="/remodeling-brandon-ms" replace />} />
      <Route path="/landingcoreservices" element={<Navigate to="/remodeling-brandon-ms" replace />} />
      <Route path="/pricing" element={<LayoutWrapper currentPageName="LandingPricing"><LandingPricing /></LayoutWrapper>} />
      <Route path="/home-remodeling-cost" element={<Navigate to="/pricing" replace />} />
      <Route path="/landingpricing" element={<Navigate to="/pricing" replace />} />
      {/* Service detail pages */}
      <Route path="/services/custom-home-building" element={<LayoutWrapper currentPageName="CustomHomeBuilding"><CustomHomeBuilding /></LayoutWrapper>} />
      <Route path="/services/kitchen-bathroom-remodeling" element={<Navigate to="/services/kitchen-remodeling" replace />} />
      <Route path="/services/kitchen-remodeling" element={<LayoutWrapper currentPageName="KitchenRemodeling"><KitchenRemodeling /></LayoutWrapper>} />
      <Route path="/services/bathroom-remodeling" element={<LayoutWrapper currentPageName="BathroomRemodeling"><BathroomRemodeling /></LayoutWrapper>} />
      <Route path="/services/room-additions" element={<LayoutWrapper currentPageName="RoomAdditions"><RoomAdditions /></LayoutWrapper>} />
      <Route path="/services/outdoor-living" element={<LayoutWrapper currentPageName="OutdoorLiving"><OutdoorLiving /></LayoutWrapper>} />
      <Route path="/services/barndominiums" element={<LayoutWrapper currentPageName="BarndominiumsService"><BarndominiumsService /></LayoutWrapper>} />
      <Route path="/services/emergency-repairs" element={<LayoutWrapper currentPageName="EmergencyRepairs"><EmergencyRepairs /></LayoutWrapper>} />

      <Route path="/bathroom-remodeling-brandon-ms" element={<LayoutWrapper currentPageName="BathroomRemodelingBrandon"><BathroomRemodelingBrandon /></LayoutWrapper>} />
      <Route path="/madison-ms-home-remodeling" element={<LayoutWrapper currentPageName="MadisonRemodeling"><MadisonRemodeling /></LayoutWrapper>} />

      {/* Barndominium redirects → /services/barndominiums */}
      <Route path="/barndominium-builder" element={<Navigate to="/services/barndominiums" replace />} />
      <Route path="/barndominiums-ms" element={<Navigate to="/services/barndominiums" replace />} />
      <Route path="/barndominium-cost-mississippi" element={<Navigate to="/services/barndominiums" replace />} />
      <Route path="/finish-package-studio" element={<Navigate to="/estimate" replace />} />
      <Route path="/custom-home-builder-brandon-ms" element={<LayoutWrapper currentPageName="LandingBrandonCustomHomeBuilder"><LandingBrandonCustomHomeBuilder /></LayoutWrapper>} />

      {/* Legacy / alternate URL redirects (Google Ads + old backlinks) */}
      {/* LowercaseRedirect handles all uppercase → lowercase case redirects. Only non-matching legacy paths are redirected below. */}
      <Route path="/projects" element={<Navigate to="/portfolio" replace />} />
      <Route path="/projects/custom-home-build" element={<Navigate to="/portfolio" replace />} />
      <Route path="/projects/gourmet-kitchen-renovation" element={<Navigate to="/portfolio" replace />} />
      <Route path="/projects/two-story-home-addition" element={<Navigate to="/portfolio" replace />} />
      <Route path="/ai-quote" element={<Navigate to="/estimate" replace />} />
      <Route path="/quoteassistant" element={<Navigate to="/estimate" replace />} />
      <Route path="/schedulevisit" element={<Navigate to="/estimate" replace />} />
      {/* Emergency & luxury renovation redirects */}
      <Route path="/landingemergencyrepair" element={<Navigate to="/services/emergency-repairs" replace />} />
      <Route path="/luxuryhomerenovations" element={<Navigate to="/services" replace />} />

      {/* Guide page redirects → blog */}
      <Route path="/homeadditionideas" element={<Navigate to="/protips/home-addition-ideas" replace />} />
      <Route path="/smallbathroomideas" element={<Navigate to="/protips/small-bathroom-ideas" replace />} />
      <Route path="/energyefficientupgrades" element={<Navigate to="/protips/energy-efficient-upgrades" replace />} />
      <Route path="/renovationloans" element={<Navigate to="/protips/renovation-loans" replace />} />
      {/* Historic home restoration redirect */}
      <Route path="/historichomerestoration" element={<Navigate to="/projects/historic-home-restoration" replace />} />

      <Route path="/sms-optin" element={<LayoutWrapper currentPageName="SmsOptin"><SmsOptin /></LayoutWrapper>} />
      <Route path="/jobsite-checkin" element={<LayoutWrapper currentPageName="JobCheckin"><JobCheckin /></LayoutWrapper>} />
      <Route path="/jobsites" element={<Navigate to="/about" replace />} />
      <Route path="/jobsites/:slug" element={<LayoutWrapper currentPageName="JobsiteDetail"><JobsiteDetail /></LayoutWrapper>} />
      <Route path="/protips/:slug" element={<LayoutWrapper currentPageName="ProTipDetail"><ProTipDetail /></LayoutWrapper>} />
      <Route path="/error" element={<LayoutWrapper currentPageName="ServerError"><ServerError /></LayoutWrapper>} />
      <Route path="*" element={<RedirectHandler><PageNotFound /></RedirectHandler>} />
    </Routes>
  );
};


function App() {

  return (
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <LowercaseRedirect />
            <CanonicalRedirect />
            <NavigationTracker />
            <HeadingHierarchyChecker />
            <WebVitalsReporter />
            <PerformanceAuditor />
            <ErrorBoundary>
              <AuthenticatedApp />
            </ErrorBoundary>
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App