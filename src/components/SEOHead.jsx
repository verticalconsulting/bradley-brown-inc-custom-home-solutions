// Shim so extensionless imports like `@/components/SEOHead` resolve to the
// .jsx component without needing to update every page file.
import SEOHead from "./SEOHead.jsx";
export * from "./SEOHead.jsx";
export default SEOHead;