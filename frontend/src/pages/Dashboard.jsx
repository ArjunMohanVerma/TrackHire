import React ,{useContext} from 'react'
import { AuthContext } from "../context/AuthContext";


const Dashboard = () => {
  const {user} = useContext(AuthContext);
  console.log(user);
  
  return (
    <>
    <h1>Hello {user?.firstName} {user?.lastName}, thank for using our Platform!</h1>
    </>
  )
};

export default Dashboard
