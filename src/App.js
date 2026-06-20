import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Index from "./pages/Index";
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/Error404';
import AddEmpresa from './pages/AddEmpresa';
import EditEmpresa from './pages/EditEmpresa';
import Blank from './pages/Blank';
import ListEmpresas from './pages/ListEmpresas';
import ListContactos from './pages/ListContactos';
import ListUsuarios from './pages/ListUsuarios';
import ListEmpleados from './pages/ListEmpleados';
import AddEmpleado from './pages/AddEmpleado';
import EditEmpleado from './pages/EditEmpleado';
import AddContacto from './pages/AddContacto';
import EditContacto from './pages/EditContacto';
import AddUsuario from './pages/AddUsuario';
import EditUsuario from './pages/EditUsuario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/index" element={<PrivateRoute><Index /></PrivateRoute>} />
        <Route path="/blank" element={<PrivateRoute><Blank /></PrivateRoute>} />

        <Route path="/empresas" element={<PrivateRoute><ListEmpresas /></PrivateRoute>} />
        <Route path="/addempresa" element={<PrivateRoute><AddEmpresa /></PrivateRoute>} />
        <Route path="/editempresa/:id" element={<PrivateRoute><EditEmpresa /></PrivateRoute>} />

        <Route path="/empleados/:id" element={<PrivateRoute><ListEmpleados /></PrivateRoute>} />
        <Route path="/addempleado/:empresaId" element={<PrivateRoute><AddEmpleado /></PrivateRoute>} />
        <Route path="/editempleado/:id" element={<PrivateRoute><EditEmpleado /></PrivateRoute>} />

        <Route path="/contactos" element={<PrivateRoute><ListContactos /></PrivateRoute>} />
        <Route path="/addcontacto" element={<PrivateRoute><AddContacto /></PrivateRoute>} />
        <Route path="/editcontacto/:id" element={<PrivateRoute><EditContacto /></PrivateRoute>} />

        <Route path="/usuarios" element={<PrivateRoute><ListUsuarios /></PrivateRoute>} />
        <Route path="/addusuario" element={<PrivateRoute><AddUsuario /></PrivateRoute>} />
        <Route path="/editusuario/:id" element={<PrivateRoute><EditUsuario /></PrivateRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
