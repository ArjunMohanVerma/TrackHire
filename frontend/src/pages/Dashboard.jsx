import React from 'react'
import { logoutUser } from "../services/authService";
import {useAuth} from "../context/AuthContext";
import Navbar from "../components/Navbar";


const Dashboard = () => {
  const { user } = useAuth();
  return (
    <>
    <Navbar/>
    <div>Dashboard Page Hehe!!
      <h2> Welcome! {user?.firstName} {user?.lastName} To the Page</h2>
    </div>
    </>
  )
};

export default Dashboard
