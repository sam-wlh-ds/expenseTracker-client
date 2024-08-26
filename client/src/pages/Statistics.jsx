import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import LineChart from "../models/Line-chart";
import ProtectedRoute from '../components/ProtectedRoute';
import { getTranData } from '../helpers/helperFnx';

function Statistics() {
    const [tranData, setTranData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getTranData();
            setTranData(data.transactions || []);
          } catch (error) {
            setError("Failed to fetch data");
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData(); // Call the async function
      }, []);
    
    if (loading) {
        return <div><Navbar current={"Statistics"}/></div>;
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

    const name = [];
    const amount = [];
    tranData.forEach((tran, index) => {
        name.push(tran.name);
        amount.push((tran.For==="Total Expense"?-1:1)*(tran.type==="Debit"?-1:1)*tran.amount);
    });
    const data=[name,amount];

    return (
        <>
        <ProtectedRoute>
            <div className='sideBySide'>
                <Navbar current={"Statistics"}/>
                <div className='container statistics-content'>
                    <LineChart label={data[0]} info={data[1]}/>
                </div>
            </div>
        </ProtectedRoute>
        </>
    )
}

export default Statistics;