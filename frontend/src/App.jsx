import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/home/Dashboard";
import ProtectedRoute from "./protectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Signin />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}
export default App;
