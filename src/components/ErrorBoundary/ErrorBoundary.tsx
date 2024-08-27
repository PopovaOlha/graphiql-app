'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { ErrorBoundaryProps } from '@/types/interfaces';

export interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
    openSnackbar: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
    state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
        openSnackbar: false,
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            hasError: true,
            error,
            errorInfo,
            openSnackbar: true,
        });
    }

    handleCloseSnackbar = () => {
        this.setState({ openSnackbar: false });
    };

    onResetButtonClick = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render(): ReactNode {
        const { hasError, error, openSnackbar } = this.state;

        if (hasError) {
            const errorMessage = error
                ? error.message
                : 'An unknown error occurred.';

            return (
                <div>
                    <h2>Something went wrong</h2>
                    <button onClick={this.onResetButtonClick}>Reset</button>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={this.handleCloseSnackbar}
                    >
                        <Alert onClose={this.handleCloseSnackbar} severity="error">
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
