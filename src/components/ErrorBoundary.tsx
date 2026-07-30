import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component:', error, errorInfo);
  }

  private handleReset = () => {
    const comp = this as unknown as React.Component<Props, State>;
    comp.setState({ hasError: false, error: null });
    if (comp.props.onReset) {
      comp.props.onReset();
    }
  };

  public render() {
    const comp = this as unknown as React.Component<Props, State>;
    const { hasError, error } = comp.state;
    const { fallbackTitle, children, onReset } = comp.props;

    if (hasError) {
      return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#2B2622] flex items-center justify-center p-6 font-sans">
          <div className="max-w-lg w-full bg-[#FFFDF8] border-2 border-[#B68D40]/40 rounded-[28px] p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#B83A3A]/10 border border-[#B83A3A]/30 text-[#B83A3A] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#2B2622]">
                {fallbackTitle || 'Curator Console Notice'}
              </h2>
              <p className="text-xs text-[#6A6158] leading-relaxed">
                A temporary component render anomaly was encountered. The Heritage Vault system remains secure.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-[#1F2328] text-[#D9C7AE] text-[11px] font-mono text-left overflow-x-auto max-h-36 border border-[#B68D40]/30">
                <p className="font-bold text-[#B83A3A] mb-1">{error.toString()}</p>
                <p className="opacity-70 text-[10px]">{error.stack?.slice(0, 300)}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-6 py-3 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload View</span>
              </button>

              <button
                onClick={() => {
                  comp.setState({ hasError: false, error: null });
                  if (onReset) onReset();
                  window.location.reload();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#1F2328] hover:bg-black text-[#D9C7AE] text-xs font-bold uppercase tracking-wider rounded-full border border-[#B68D40]/30 transition-all flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Refresh Application</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}
