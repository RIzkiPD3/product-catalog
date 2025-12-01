import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-2xl font-bold text-red-600">
              Terjadi kesalahan pada aplikasi 😵‍💫
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              Coba refresh halaman.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
