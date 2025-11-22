import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoverPasswordPageOne from "./pages/RecoverPasswordPageOne";
import RecoverPasswordPageTwo from "./pages/RecoverPasswordPageTwo";
import Library from "./pages/Library";
import AdminPanel from "./pages/AdminPanel";
import BookDetail from "./pages/BookDetail";
import { UserProvider } from "./context/userProvider"; 
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover-password-verify-user" element={<RecoverPasswordPageOne />} />
          <Route path="/recover-password-enter-new-password" element={<RecoverPasswordPageTwo />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/library" element={<Library />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/library/:userId" element={<Library />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="admin-panel" element={<AdminPanel />} />
          </Route>
           <Route path="/book/:bookId" element={<BookDetail />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
