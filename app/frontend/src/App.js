import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPasswordPageOne from "./pages/RecoverPasswordPageOne";
import RecoverPasswordPageTwo from "./pages/RecoverPasswordPageTwo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password-verify-user" element={<RecoverPasswordPageOne />} />
        <Route path="/recover-password-enter-new-password" element={<RecoverPasswordPageTwo />} />
      </Routes>
    </Router>
  );
}

export default App;
