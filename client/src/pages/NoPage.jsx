import React from 'react';
import noPage from "../images/404.png"
import { Link } from 'react-router-dom';

function NoPage() {
    return (
        <>
            <div className="card text-center">
                <div className="card-header">
                    <h4>404 Error: Page Not Found</h4>
                </div>
                <img src={noPage} className="img-fluid mx-auto home-intro" alt="404 page not found" />
                <div className="card-body">
                    <h5 className="card-title">Oops! Page Not Found</h5>
                    <p className="card-text">It seems you've wandered off the map return Home and we'll get you back on track.</p>
                    <Link to="/" className="btn btn-primary">Home</Link>
                </div>
            </div>
        </>
    )
}

export default NoPage;