import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ Application Error:', error);
    console.error('Error Info:', errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050812] flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-400 mb-4">
              The application encountered an error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
            >
              Refresh Page
            </button>
            <div className="mt-4 p-3 bg-black/50 rounded-lg overflow-auto max-h-60">
              <p className="text-red-300 font-mono text-sm">{this.state.error?.message}</p>
              <pre className="text-xs text-slate-300 whitespace-pre-wrap mt-2">
                {this.state.errorInfo?.componentStack || this.state.error?.stack}
              </pre>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
