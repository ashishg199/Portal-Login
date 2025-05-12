import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Catch errors in children
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Optional: Log error details
  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 font-bold text-center p-4">
          Something went wrong.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
