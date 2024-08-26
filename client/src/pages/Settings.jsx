import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { clearData, deleteUser } from '../helpers/helperFnx';
import Error from '../components/Error';

function Settings() {
    const [clearDataError, setClearDataError] = useState(null);
    const [deleteUserError , setDeleteUserError] = useState(null);
    const navigate = useNavigate();

    function logout(){
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login');
    }

    const handleClearData = async() => {
        // confirm
        const isConfirmed = window.confirm("Are you sure you want to clear all data? This action cannot be undone.");
        if (!isConfirmed) return;

        try{
            const res = await clearData();
            if (res.error){
                setClearDataError("Error: ", res.message || "Something went wrong")
            }
            else{
                navigate("/dashboard");
            }
        } catch(error){
            console.error("Error Clearing Data: ", error);
            setClearDataError("Error: Something went wrong while clearing data");
        }
    };

    const handleDeleteUser = async() => {
        // confirm
        const isConfirmed = window.confirm("Are you sure you want to delete this account? This action cannot be undone.");
        if (!isConfirmed) return;
        
        try{
            const res = await deleteUser();
            if (res.error){
                setDeleteUserError("Error: ", res.message || "Something went wrong")
            }
            else{
                localStorage.clear();
                sessionStorage.clear();
                navigate("/login");
            }
        } catch(error){
            console.error("Error Clearing Data: ", error);
            setDeleteUserError("Error: Something went wrong while clearing data");
        }
    };

    return (
        <>
        <ProtectedRoute>
            <div className='sideBySide'>
                <Navbar current={"Settings"}/>
                <div className='container settings-content'>
                    <div className="card w-75 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Log Out</h5>
                            <p className="card-text">Logout From this device</p>
                            <button onClick={logout} className="btn text-bg-primary text-white">Logout</button>
                        </div>
                    </div>
                    <div className="card w-75 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Clear User Data</h5>
                            <p className="card-text">Clearing User data will remove all user data and history from the application. This action is permanent.
                                <br />If you wish to keep any data, ensure you have backed it up before continuing.</p>
                            <Error message={clearDataError}/>
                            <button onClick={handleClearData} className="btn text-bg-warning text-white">Clear Data</button>
                        </div>
                    </div>
                    <div className="card w-75 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Delete Account</h5>
                            <p className="card-text">This will permanently delete your account and all associated data. This action cannot be undone.</p>
                            <Error message={deleteUserError}/>
                            <button onClick={handleDeleteUser} className="btn text-bg-danger">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
        </>
    )
}

export default Settings;

