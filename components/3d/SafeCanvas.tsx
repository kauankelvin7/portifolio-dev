import React, { useState, useEffect, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

interface SafeCanvasProps {
  children: ReactNode;
  fallback: ReactNode;
  [key: string]: any; // Allow other props to pass through to Canvas
}

/**
 * A wrapper for @react-three/fiber's Canvas that handles WebGL context creation failures
 * gracefully and displays a fallback component.
 */
export default function SafeCanvas({ children, fallback, ...props }: SafeCanvasProps) {
  const { webglSupported, isReady } = useDeviceCapability();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const handleContextCreationError = (e: Event) => {
      console.error("WebGL context creation failed:", e);
      setError(true);
    };

    window.addEventListener("webglcontextcreationerror", handleContextCreationError);
    return () => {
      window.removeEventListener("webglcontextcreationerror", handleContextCreationError);
    };
  }, []);

  if (!isReady) return null;

  if (webglSupported === false || error) {
    return <>{fallback}</>;
  }

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${props.className || ''}`}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
        <ErrorBoundary fallback={fallback} onError={() => setError(true)}>
            <Canvas 
              {...props}
              style={{ ...props.style, width: '100%', height: '100%' }}
            >
                {children}
            </Canvas>
        </ErrorBoundary>
    </div>
  );
}

/**
 * Simple Error Boundary to catch R3F initialization crashes
 */
class ErrorBoundary extends React.Component<{ 
    fallback: React.ReactNode, 
    children: React.ReactNode,
    onError: () => void 
}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("SafeCanvas caught an error:", error, errorInfo);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
