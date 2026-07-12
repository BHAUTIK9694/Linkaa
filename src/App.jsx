import { ErrorBoundary } from '@components/common';
import AppRoutes from '@routes';

/**
 * Application root. Wraps the route tree in a top-level error boundary.
 * Router context is provided in main.jsx.
 */
function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
