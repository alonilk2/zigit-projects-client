import "./App.css";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/projects";
import { ACCESS_TOKEN } from "./constants";

const PrivateRoute = ({user}) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const user = ()=>localStorage.getItem(ACCESS_TOKEN);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<PrivateRoute user={user} />}>
            <Route path="projects" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
