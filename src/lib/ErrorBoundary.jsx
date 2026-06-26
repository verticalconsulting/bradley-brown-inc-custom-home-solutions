import React from "react";
import ServerError from "./ServerError";

/**
 * Site-wide error boundary. Catches uncaught React rendering errors and
 * shows the SEO-friendly 5xx page instead of a blank screen.
 *
 * Wrap around <AuthenticatedApp /> in App.jsx.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "exception", {
        description: error?.message || "Unknown error",
        fatal: true,
      });
    }
  }

  handleRetry() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return <ServerError onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}