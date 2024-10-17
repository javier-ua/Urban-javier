import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EntradaLogin } from "./components/EntradaLogin/EntradaLogin";
import { Recupera } from "./components/EntradaLogin/Recupera";
import { AdminDashboard } from "./components/Dashboards/Admin/AdminDashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<EntradaLogin />} />
        <Route path="/recupera" element={<Recupera />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        {/* <Route path="/dashboard/gestor" element={<GestorDashboard />} />
        <Route path="/dashboard/ciudadano" element={<CiudadanoDashboard />} />
        <Route path="/dashboard/director" element={<DirectorDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
