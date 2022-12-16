import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
  const { auth }: any = useAuth();
  // console.log(allowedRoles);

  if (auth) {
    <Navigate to="/dashboard" />;
  }
  // console.log("111122222", auth.roles);
  // console.log("111122222333", auth.user);

  return auth?.roles?.find((role: any) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
