import AppRouter from "./router/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./utils/error";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    const tagManagerArgs = {
      gtmId: "GTM-WRSW3TKG", // Replace with your GTM container ID
    };

    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
