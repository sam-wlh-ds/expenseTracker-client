import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from "../helpers/helperFnx"
import axios from "axios";
import NavBar from './Navbar';

const ProtectedRoute = ({children}) => {
    const [isValid, setIsValid] = useState(null);
    const navigate = useNavigate();

    const validateUser = async () => {
        try {
            const { userID, username, xAuthToken } = getData();
            if (!userID || !username || !xAuthToken) {
                setIsValid(false);
            }
            const payload = { id: userID };
            const res = await axios.post(
                "http://localhost:1234/api/verify",
                payload, // This is the payload sent in the request body
                {
                  headers: {
                    'x-auth-token': xAuthToken // Include the token in the request header
                  }
                }
              );

            if (res.data.success && username) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        } catch (err) {
            console.error('Validation error:', err);
            setIsValid(false);
        }
    };

    useEffect(() => {
        validateUser();
    }, []);

    useEffect(() => {
        if (isValid === false) {
            navigate("/login");
        }
    }, [isValid, navigate]);

    // Render a loading state while the redirect happens
    if (isValid === null) {
        return <NavBar />;
    }
    // Render a loading state while the redirect happens
    if (isValid === false) {
        localStorage.clear()
        sessionStorage.clear()
        return <div>Restricted Access</div>;
    }

    return children;
};

export default ProtectedRoute;
