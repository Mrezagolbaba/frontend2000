import AppRouter from "./router/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./utils/error";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
