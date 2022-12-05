import { Route, Routes } from "react-router-dom";
import AddBlogForm from "../components/AddBlogForm";
import ProtectRoutes from "../components/ProtectRoutes";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import RegisterPage from "./RegisterPage";

function Router() {
  return (
    <Routes>
      <Route element={<ProtectRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/addblog" element={<AddBlogForm />} />
      </Route>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default Router;
