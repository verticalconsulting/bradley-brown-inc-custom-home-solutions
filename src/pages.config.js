import { lazy } from 'react';
import Home from './pages/Home';
import __Layout from './Layout.jsx';

const About = lazy(() => import('./pages/About'));
const AccountSettings = lazy(() => import('./pages/AccountSettings'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProTips = lazy(() => import('./pages/ProTips'));
const Services = lazy(() => import('./pages/Services'));

export const PAGES = {
    "About": About,
    "AccountSettings": AccountSettings,
    "Contact": Contact,
    "Home": Home,
    "Legal": Legal,
    "Portfolio": Portfolio,
    "ProTips": ProTips,
    "Services": Services,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};