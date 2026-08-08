// 🛡️ SPRINT 11: ENTERPRISE UI - ERROR BOUNDARY
// Prevents a single widget crash from taking down the entire Operations Dashboard.

import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        // TODO: Log error to Observability Telemetry (ADR 004)
        console.error("Widget Crash Detected:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', border: '1px solid red', borderRadius: '8px', backgroundColor: '#fee' }}>
                    <h4 style={{ color: 'red' }}>⚠️ Widget Render Failure</h4>
                    <p>This component encountered an error. The rest of the dashboard remains operational.</p>
                </div>
            );
        }
        return this.props.children;
    }
}