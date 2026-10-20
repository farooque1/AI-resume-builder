import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`${this.props.name || "Application"} failed to render:`, error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section
        className="rounded-lg border border-red-200 bg-red-50 p-6 text-center"
        role="alert"
      >
        <h2 className="font-semibold text-red-900">
          {this.props.name || "This part of the app"} could not be displayed.
        </h2>
        <p className="mt-2 text-sm text-red-800">
          Try again. If the problem continues, reload the page.
        </p>
        <button
          className="mt-4 rounded bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
          onClick={this.reset}
          type="button"
        >
          Try again
        </button>
      </section>
    );
  }
}

export default ErrorBoundary;
