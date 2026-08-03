import { Toaster } from "@/components/ui/toaster"
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import RedirectHandler from './lib/RedirectHandler';
import ErrorBoundary from './lib/ErrorBoundary';
import ServerError from './lib/ServerError';
import SEODashboard from './pages/SEODashboard';
import SiteImages from './pages/SiteImages';
import BlogAdmin from './pages/BlogAdmin';
import ConversionDashboard from './pages/ConversionDashboard';
import HistoricHomeRestoration from './pages/HistoricHomeRestoration';
import Quote from './pages/Quote';
import LandingTrust from './pages/LandingTrust';
import LandingCoreServices from './pages/LandingCoreServices';
import LandingPricing from './pages/LandingPricing';
import Barndominiums from './pages/Barndominiums';
import BathroomRemodelingBrandon from './pages/BathroomRemodelingBrandon';
import BarndominiumCost from './pages/BarndominiumCost';
import MadisonRemodeling from './pages/MadisonRemodeling';
import SmsOptin from './pages/SmsOptin';
import BarndominiumBuilder from './pages/BarndominiumBuilder';
import FinishPackageStudio from './pages/FinishPackageStudio';
import LandingBrandonCustomHomeBuilder from './pages/LandingBrandonCustomHomeBuilder';
import ProTipDetail from './pages/ProTipDetail';
import JobCheckin from './pages/JobCheckin';
import Jobsites from './pages/Jobsites';
import JobsiteDetail from './pages/JobsiteDetail';
import { Navigate } from 'react-router-dom';
import Leads from './pages/Leads';
import FunnelAnalysis from './pages/FunnelAnalysis';
import AdminRoute from './components/AdminRoute';
import ContactForm from './pages/ContactForm';
import ThankYou from './pages/ThankYou';
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

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

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
      <Route path="/contactform" element={<LayoutWrapper currentPageName="ContactForm"><ContactForm /></LayoutWrapper>} />
      <Route path="/thank-you" element={<LayoutWrapper currentPageName="ThankYou"><ThankYou /></LayoutWrapper>} />
      <Route path="/leads" element={<LayoutWrapper currentPageName="Leads"><AdminRoute><Leads /></AdminRoute></LayoutWrapper>} />
      <Route path="/siteimages" element={<LayoutWrapper currentPageName="SiteImages"><AdminRoute><SiteImages /></AdminRoute></LayoutWrapper>} />
      <Route path="/blogadmin" element={<LayoutWrapper currentPageName="BlogAdmin"><AdminRoute><BlogAdmin /></AdminRoute></LayoutWrapper>} />
      <Route path="/conversiondashboard" element={<LayoutWrapper currentPageName="ConversionDashboard"><AdminRoute><ConversionDashboard /></AdminRoute></LayoutWrapper>} />
      <Route path="/projects/historic-home-restoration" element={<LayoutWrapper currentPageName="HistoricHomeRestoration"><HistoricHomeRestoration /></LayoutWrapper>} />
      <Route path="/quote" element={<LayoutWrapper currentPageName="ContactForm"><Quote /></LayoutWrapper>} />
      <Route path="/customertestimonials" element={<LayoutWrapper currentPageName="LandingTrust"><LandingTrust /></LayoutWrapper>} />
      <Route path="/remodeling-ms" element={<LayoutWrapper currentPageName="LandingCoreServices"><LandingCoreServices /></LayoutWrapper>} />
      <Route path="/home-remodeling-cost" element={<LayoutWrapper currentPageName="LandingPricing"><LandingPricing /></LayoutWrapper>} />
      <Route path="/barndominiums-ms" element={<Navigate to="/barndominium-builder" replace />} />
      <Route path="/bathroom-remodeling-brandon-ms" element={<LayoutWrapper currentPageName="BathroomRemodelingBrandon"><BathroomRemodelingBrandon /></LayoutWrapper>} />
      <Route path="/barndominium-cost-mississippi" element={<LayoutWrapper currentPageName="BarndominiumCost"><BarndominiumCost /></LayoutWrapper>} />
      <Route path="/madison-ms-home-remodeling" element={<LayoutWrapper currentPageName="MadisonRemodeling"><MadisonRemodeling /></LayoutWrapper>} />
      <Route path="/barndominium-builder" element={<LayoutWrapper currentPageName="BarndominiumBuilder"><BarndominiumBuilder /></LayoutWrapper>} />
      <Route path="/finish-package-studio" element={<LayoutWrapper currentPageName="FinishPackageStudio"><FinishPackageStudio /></LayoutWrapper>} />
      <Route path="/custom-home-builder-brandon-ms" element={<LayoutWrapper currentPageName="LandingBrandonCustomHomeBuilder"><LandingBrandonCustomHomeBuilder /></LayoutWrapper>} />

      {/* Legacy / alternate URL redirects (Google Ads + old backlinks) */}
      {/* LowercaseRedirect handles all uppercase → lowercase case redirects. Only non-matching legacy paths are redirected below. */}
      <Route path="/projects" element={<Navigate to="/portfolio" replace />} />
      <Route path="/projects/custom-home-build" element={<Navigate to="/portfolio" replace />} />
      <Route path="/projects/gourmet-kitchen-renovation" element={<Navigate to="/portfolio" replace />} />
      <Route path="/projects/two-story-home-addition" element={<Navigate to="/portfolio" replace />} />
      <Route path="/ai-quote" element={<Navigate to="/quoteassistant" replace />} />
      <Route path="/sms-optin" element={<LayoutWrapper currentPageName="SmsOptin"><SmsOptin /></LayoutWrapper>} />
      <Route path="/jobsite-checkin" element={<LayoutWrapper currentPageName="JobCheckin"><JobCheckin /></LayoutWrapper>} />
      <Route path="/jobsites" element={<LayoutWrapper currentPageName="Jobsites"><Jobsites /></LayoutWrapper>} />
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