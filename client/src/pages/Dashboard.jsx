import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from "../components/Navbar";
import PieChart from "../models/Pie-chart";
import { getFinData } from '../helpers/helperFnx';

function DashBoard() {
    const [finData, setFinData] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getFinData(); 
          setFinData(data); 
        } catch (error) {
          setError('Failed to fetch data'); 
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData(); // Call the async function
    }, []); // Empty dependency array means this runs once after the component mounts
  
    if (loading) {
      return <div><Navbar current={"Dashboard"}/></div>; 
    }
  
    if (error) {
        return (
          <>
          <ProtectedRoute>
              <div>Error: {error}</div>
          </ProtectedRoute>
          </>
        );
    }

    const { currBal, totInc, totExp } = finData;
    const data = [currBal, totInc, totExp];
    return (
        <>
        <ProtectedRoute>
            <div className='sideBySide'>
                <Navbar current={"Dashboard"}/>
                <div className='container dashboard-content'>
                    <div className='inline'>
                        <div className="card text-bg-primary mb-3 dashboard-card">
                            <div className="card-header">Current Balance</div>
                            <div className="card-body">
                                <h5 className="card-title">Rs. {data[0]}</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            </div>
                        </div>
                        <div className="card text-bg-success mb-3 dashboard-card">
                            <div className="card-header">Total Income</div>
                            <div className="card-body">
                                <h5 className="card-title">Rs. {data[1]}</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            </div>
                        </div>
                        <div className="card text-bg-danger mb-3 dashboard-card">
                            <div className="card-header">Total Expense</div>
                            <div className="card-body">
                                <h5 className="card-title">Rs. {data[2]}</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='chart'>
                        <div className="card text-bg-light mb-3 dashboard-card">
                            <div className="card-header">Overview</div>
                            <div className="card-body">
                                <PieChart currBal={data[0]} totInc={data[1]} totExp={data[2]}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
        </>
    )
}


export default DashBoard;