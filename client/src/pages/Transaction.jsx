import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import { addTransaction, getTranData } from "../helpers/helperFnx";
import Error from "../components/Error";

function Transaction() {
  const [tranData, setTranData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    For: "",
    amount: 0,
  });
  const [addError, setAddError] = useState(null);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await addTransaction(formData); 
       if (res.error){
            if (res.message.includes("minimum allowed value") ){
                setAddError(`Insufficient ${formData.For} Balance`)
            }
            else{
                setAddError(res.message || `Something Went Wrong. Please check Input validity`)
            }
       }
      // Refresh transaction data after adding a new transaction
      const data = await getTranData();
      setTranData(data.transactions || []);
      // Reset form data
      setFormData({
        name: "",
        description: "",
        type: "",
        For: "",
        amount: 0,
      });
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  if (loading) {
    return <div><Navbar current={"Transaction"} /></div>;
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

  return (
    <>
      <ProtectedRoute>
        <div className="sideBySide">
          <Navbar current={"Transaction"} />
          <div className="container transaction-content">
            <div className="container settings-content">
              <div className="card w-75 mb-3">
                <div className="card-body">
                  <h5 className="card-title">New Transaction</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="transName">
                        Name
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="transDesc">
                        Description
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <label className="input-group-text" htmlFor="type">
                        Type
                      </label>
                      <select
                        className="form-select"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                      </select>
                    </div>
                    <div className="input-group mb-3">
                      <label className="input-group-text" htmlFor="for">
                        For
                      </label>
                      <select
                        className="form-select"
                        id="For"
                        name="For"
                        value={formData.For}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Choose...
                        </option>
                        <option value="Current Balance">Current Balance</option>
                        <option value="Total Income">Total Income</option>
                        <option value="Total Expense">Total Expense</option>
                      </select>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="amount">
                        Rs.
                      </span>
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0.01"
                        step=".01"
                        className="form-control"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Error message={addError} />
                    <button type="submit" className="btn text-bg-primary text-white">
                      Add Transaction
                    </button>
                  </form>
                </div>
              </div>
              <div className="card w-75 mb-3">
                <div className="card-body">
                  <h5 className="card-title">Transaction History</h5>
                  <table className="table table-light table-hover table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">For</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tranData.map((transaction, index) => (
                        <tr key={transaction._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{transaction.name}</td>
                          <td>{transaction.description}</td>
                          <td>{transaction.type}</td>
                          <td>{transaction.For}</td>
                          <td>{transaction.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}

export default Transaction;
