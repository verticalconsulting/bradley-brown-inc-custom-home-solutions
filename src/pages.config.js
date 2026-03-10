/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import AccountSettings from './pages/AccountSettings';
import AgentChat from './pages/AgentChat';
import CRM from './pages/CRM';
import Contact from './pages/Contact';
import EnergyEfficientUpgrades from './pages/EnergyEfficientUpgrades';
import Home from './pages/Home';
import HomeAdditionIdeas from './pages/HomeAdditionIdeas';
import LandingBrandonRemodelers from './pages/LandingBrandonRemodelers';
import LandingCoreServices from './pages/LandingCoreServices';
import LandingEmergencyRepair from './pages/LandingEmergencyRepair';
import LandingPricing from './pages/LandingPricing';
import LandingTrust from './pages/LandingTrust';
import Legal from './pages/Legal';
import LuxuryHomeRenovations from './pages/LuxuryHomeRenovations';
import Portfolio from './pages/Portfolio';
import ProTips from './pages/ProTips';
import QuoteAssistant from './pages/QuoteAssistant';
import RenovationLoans from './pages/RenovationLoans';
import ScheduleVisit from './pages/ScheduleVisit';
import Services from './pages/Services';
import SmallBathroomIdeas from './pages/SmallBathroomIdeas';
import TikTokSync from './pages/TikTokSync';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AccountSettings": AccountSettings,
    "AgentChat": AgentChat,
    "CRM": CRM,
    "Contact": Contact,
    "EnergyEfficientUpgrades": EnergyEfficientUpgrades,
    "Home": Home,
    "HomeAdditionIdeas": HomeAdditionIdeas,
    "LandingBrandonRemodelers": LandingBrandonRemodelers,
    "LandingCoreServices": LandingCoreServices,
    "LandingEmergencyRepair": LandingEmergencyRepair,
    "LandingPricing": LandingPricing,
    "LandingTrust": LandingTrust,
    "Legal": Legal,
    "LuxuryHomeRenovations": LuxuryHomeRenovations,
    "Portfolio": Portfolio,
    "ProTips": ProTips,
    "QuoteAssistant": QuoteAssistant,
    "RenovationLoans": RenovationLoans,
    "ScheduleVisit": ScheduleVisit,
    "Services": Services,
    "SmallBathroomIdeas": SmallBathroomIdeas,
    "TikTokSync": TikTokSync,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};