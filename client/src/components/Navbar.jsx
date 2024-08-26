import {React, useEffect} from "react";
import { Link } from "react-router-dom";
import userPic from "../images/user.png"
import { getData } from "../helpers/helperFnx"

function NavBar({current}){
    const { username } = getData();

    return(
        <nav className="nav inline">
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary nav-style">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                {/* <svg className="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> */}
                <span className="fs-4">Expense Tracker</span>
                </Link>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to={`/Dashboard`} className={current=="Dashboard"? "nav-link  active":"nav-link link-body-emphasis"}>
                    {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg> */}
                    Dashboard
                    </Link>
                </li>
                <li>
                    <Link to={`/Statistics`} className={current=="Statistics"? "nav-link  active":"nav-link link-body-emphasis"}>
                    {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg> */}
                    Statistics
                    </Link>
                </li>
                <li>
                    <Link to={`/Transaction`} className={current=="Transaction"? "nav-link  active":"nav-link link-body-emphasis"}>
                    {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"></use></svg> */}
                    Transaction
                    </Link>
                </li>
                <li>
                    <Link to={`/Settings`}  className={current=="Settings"? "nav-link  active":"nav-link link-body-emphasis"}>
                    {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"></use></svg> */}
                    Settings
                    </Link>
                </li>
                </ul>
                <div className="bottom">
                <hr/>
                <div className="dropdown">
                <a className="d-flex align-items-center link-body-emphasis text-decoration-none" aria-expanded="false">
                    <img src={userPic} alt="" width="32" height="32" className="rounded-circle me-2 image" />
                    <strong>{username}</strong>
                </a>
                </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;

