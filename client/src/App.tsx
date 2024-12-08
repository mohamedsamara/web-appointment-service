import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "lib/theme";

const Home = lazy(() => import("pages/Home"));
import NoMatch from "pages/NoMatch";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense>
                  <Home />
                </Suspense>
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
