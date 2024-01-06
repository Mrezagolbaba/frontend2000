import AppRouter from "./router/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./utils/error";
import TagManager from "react-gtm-module";
import { useEffect } from "react";

const queryClient = new QueryClient();


function App() {

  useEffect(()=>{
    const tagManagerArgs = {
      gtmId: "GTM-WRSW3TKG",
    };
    TagManager.initialize(tagManagerArgs);
  },[])

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
