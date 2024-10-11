import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import CourseContextProvider from "./contexts/CourseContext";

function App() {
  return (
    <AuthContextProvider>
      <CourseContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Auth authRoute="login" />} />
            <Route
              exact
              path="/register"
              element={<Auth authRoute="register" />}
            />
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route path="" element={<Dashboard />} />
            </Route>
            <Route path="/about" element={<ProtectedRoute />}>
              <Route path="" element={<About />} />
            </Route>
          </Routes>
        </Router>
      </CourseContextProvider>
    </AuthContextProvider>
  );
}

export default App;
