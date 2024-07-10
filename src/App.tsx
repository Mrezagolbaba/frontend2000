import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRouter from "router/AppRouter";
import ErrorBoundary from "utils/error";
import { JWTProvider as AuthProvider } from "contexts/JWTContext";
import InstallPWAPrompt from "components/InstallPWAPropmt";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: "GTM-WRSW3TKG",
    };
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthProvider>
            <>
              <AppRouter />
              <InstallPWAPrompt />
            </>
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
