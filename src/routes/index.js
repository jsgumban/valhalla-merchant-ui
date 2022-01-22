import LoginPage from "../pages/Login";
import {Redirect} from "react-router-dom";
import DashboardPage from "../pages/Dashboard";

const authProtectedRoutes = [
	{ path: "/dashboard", component: DashboardPage },
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
	{ path: "/login", component: LoginPage },
]

export { authProtectedRoutes, publicRoutes }
