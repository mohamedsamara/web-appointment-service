import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
import NoMatch from "pages/NoMatch";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
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
  );
};

export default App;
