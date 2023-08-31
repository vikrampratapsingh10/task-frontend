import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
import Api from "../webApi/Api";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
axios.interceptors.request.use((e)=>{
    const token = user.token;
    if(token)
        e.headers.authorization = token;
    return e
  },
    (err)=>{
        Promise.reject(err);
    })
  const fetchData = async () => {
    try {
      let response = await axios.post(Api.TOTAL_USER_COUNT, { id: user._id });
      if (response.data.status) {
        setUsers(response.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const SignOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return <>
     <div className="navbar">
       <h3>User Dashboard</h3>
       <div className="user-info1">
         <p>Welcome, {user.fName+" "+user.lName}</p>&nbsp;&nbsp;&nbsp;&nbsp;
         <Link to="/" id="signout" onClick={SignOut}>
           SignOut
         </Link>
       </div>
     </div>
     <div className="container">
       <div className="user-info">
         <div className="referral-box">
           <h2>Total Bonus</h2>
           <p>{user.tokenBonus}</p>
         </div>
         <div className="referral-box">
           <h2>Total Users</h2>
           <p>{user.refCodeCount}</p>
         </div>
         <div className="referral-box">
           <h2>Your Referral Code</h2>
           <p>{user.refCode}</p>
         </div>
       </div>
       <div className="user-list">
         <h2>User List</h2>
         <table className="table table-bordered table-hover">
           <thead>
             <tr>
               <th>S. No</th>
               <th>Name</th>
               <th>Email</th>
             </tr>
           </thead>
           <tbody>
             {users.map((data, index) => (
               <tr>
                 <td>{index + 1}</td>
                 <td>{data.fName + " " + data.lName}</td>
                 <td>{data.email}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
    </>
}
