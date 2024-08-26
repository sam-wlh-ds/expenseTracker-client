import React from "react";
import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/AuthNav";
import home from "../images/home.png"
import todolist from "../images/todolist.png"

const Layout = () => {
    const isSmallWidth = window.innerWidth < 900;
    return(
        <>
            <AuthNavbar/>
            <main className={isSmallWidth?"main-close":"main-open"}>
                <div className="card text-bg-light mb-3 card-style inline">
                    <img src={home} className="img-fluid img-thumbnail mx-auto home-intro" alt="image of people tracking their expense" />
                    <div className="card-body">
                        <h5 className="card-title text-center text-bg-success text-wrap fs-1">Expense Tracker</h5>
                        <p className="card-text text-center fs-4 text-primary">Login to start tracking!</p>
                    </div>
                </div>
                {' '}
                <div className="card text-bg-light mb-3 card-style inline">
                    <img src={todolist} className="img-fluid img-thumbnail mx-auto home-intro" alt="image of people tracking their todolist" />
                    <div className="card-body">
                        <h5 className="card-title text-center text-bg-success text-wrap fs-1">Todo List</h5>
                        <p className="card-text text-center fs-4 text-primary">Upcoming in future updates</p>
                    </div>
                </div>
            </main>
            <Outlet/>
        </>
    )
}

export default Layout;