"use client";

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-6 text-red-400 text-sm font-mono break-words bg-black/60 rounded-xl border border-red-500/40 max-w-xl mx-auto">
          <p className="font-bold mb-2">Lanyard gagal dimuat:</p>
          <p>{this.state.error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
