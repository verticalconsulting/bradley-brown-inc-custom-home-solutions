import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
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
import SmsOptin from './pages/SmsOptin';
import BarndominiumBuilder from './pages/BarndominiumBuilder';
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
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/SEODashboard" element={<LayoutWrapper currentPageName="SEODashboard"><AdminRoute><SEODashboard /></AdminRoute></LayoutWrapper>} />
      <Route path="/FunnelAnalysis" element={<LayoutWrapper currentPageName="FunnelAnalysis"><AdminRoute><FunnelAnalysis /></AdminRoute></LayoutWrapper>} />
      <Route path="/ContactForm" element={<LayoutWrapper currentPageName="ContactForm"><ContactForm /></LayoutWrapper>} />
      <Route path="/thank-you" element={<LayoutWrapper currentPageName="ThankYou"><ThankYou /></LayoutWrapper>} />
      <Route path="/Leads" element={<LayoutWrapper currentPageName="Leads"><AdminRoute><Leads /></AdminRoute></LayoutWrapper>} />
      <Route path="/SiteImages" element={<LayoutWrapper currentPageName="SiteImages"><AdminRoute><SiteImages /></AdminRoute></LayoutWrapper>} />
      <Route path="/BlogAdmin" element={<LayoutWrapper currentPageName="BlogAdmin"><AdminRoute><BlogAdmin /></AdminRoute></LayoutWrapper>} />
      <Route path="/ConversionDashboard" element={<LayoutWrapper currentPageName="ConversionDashboard"><AdminRoute><ConversionDashboard /></AdminRoute></LayoutWrapper>} />
      <Route path="/projects/historic-home-restoration" element={<LayoutWrapper currentPageName="HistoricHomeRestoration"><HistoricHomeRestoration /></LayoutWrapper>} />
      <Route path="/quote" element={<LayoutWrapper currentPageName="ContactForm"><Quote /></LayoutWrapper>} />
      <Route path="/customertestimonials" element={<LayoutWrapper currentPageName="LandingTrust"><LandingTrust /></LayoutWrapper>} />
      <Route path="/remodeling-ms" element={<LayoutWrapper currentPageName="LandingCoreServices"><LandingCoreServices /></LayoutWrapper>} />
      <Route path="/home-remodeling-cost" element={<LayoutWrapper currentPageName="LandingPricing"><LandingPricing /></LayoutWrapper>} />
      <Route path="/barndominiums-ms" element={<LayoutWrapper currentPageName="Barndominiums"><Barndominiums /></LayoutWrapper>} />
      <Route path="/barndominium-builder" element={<LayoutWrapper currentPageName="BarndominiumBuilder"><BarndominiumBuilder /></LayoutWrapper>} />

      {/* Legacy / alternate URL redirects (Google Ads + old backlinks) */}
      {/* Note: React Router matches paths case-insensitively, so /about → /About and /contact → /Contact already work automatically. Only non-matching legacy paths are redirected below. */}
      <Route path="/projects" element={<Navigate to="/Portfolio" replace />} />
      <Route path="/projects/custom-home-build" element={<Navigate to="/Portfolio" replace />} />
      <Route path="/projects/gourmet-kitchen-renovation" element={<Navigate to="/Portfolio" replace />} />
      <Route path="/projects/two-story-home-addition" element={<Navigate to="/Portfolio" replace />} />
      <Route path="/ai-quote" element={<Navigate to="/QuoteAssistant" replace />} />
      <Route path="/sms-optin" element={<LayoutWrapper currentPageName="SmsOptin"><SmsOptin /></LayoutWrapper>} />
      <Route path="/jobsite-checkin" element={<LayoutWrapper currentPageName="JobCheckin"><JobCheckin /></LayoutWrapper>} />
      <Route path="/jobsites" element={<LayoutWrapper currentPageName="Jobsites"><Jobsites /></LayoutWrapper>} />
      <Route path="/jobsites/:slug" element={<LayoutWrapper currentPageName="JobsiteDetail"><JobsiteDetail /></LayoutWrapper>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App