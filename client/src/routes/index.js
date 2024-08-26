import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Statistics from "../pages/Statistics";
import Transaction from "../pages/Transaction";
import Settings from "../pages/Settings";
import NoPage from "../pages/NoPage";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    },
    {
        path: "/statistics",
        element: <Statistics/>
    },
    {
        path: "/transaction",
        element: <Transaction/>
    },
    {
        path: "/settings",
        element: <Settings/>
    },
    {
        path: "*",
        element: <NoPage/>
    }
])


export default router;