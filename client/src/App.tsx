import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "lib/theme";

const Home = lazy(() => import("pages/Home"));
import NoMatch from "pages/NoMatch";
import Schedule from "pages/Schedule";
import ErrorBoundary from "components/ErrorBoundary";
import { DefaultLayout, ScheduleLayout } from "components/Layouts";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <DefaultLayout>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense>
                    <Home />
                  </Suspense>
                }
              />
              <Route path="/schedule" element={<ScheduleLayout />}>
                <Route index element={<Schedule />} />
                <Route path="test" element={<div>TEST</div>} />
              </Route>
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </DefaultLayout>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
