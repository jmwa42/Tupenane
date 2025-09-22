import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import MyProjects from "./pages/MyProjects";
import Investments from "./pages/Investments";
import UsersGrouped from "./pages/UsersGrouped";
import Navbar from "./components/Navbar";
import Contributions from "./pages/Contributions";

const Authed = ({ children }) =>
  localStorage.getItem("access") ? children : <Navigate to="/login" />;

export default function App() {
  const isAuth = !!localStorage.getItem("access");
  return (
    <BrowserRouter>
      {isAuth && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Authed><Projects /></Authed>} />
        <Route path="/projects/create" element={<Authed><CreateProject /></Authed>} />
        <Route path="/projects/mine" element={<Authed><MyProjects /></Authed>} />
        <Route path="/investments" element={<Authed><Investments /></Authed>} />
        <Route path="/users/grouped" element={<Authed><UsersGrouped /></Authed>} />
        <Route path="*" element={<Navigate to="/projects" />} />
        <Route path="/contributions" element={<Contributions />} />
      </Routes>
    </BrowserRouter>
  );
}

