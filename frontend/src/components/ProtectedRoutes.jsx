import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loader";

function ProtectedRoute({ children }) {

    const {user, loading} = useContext(AuthContext);
    if (loading) {
        return <Loading />;
    }
    return user? children : <Navigate to="/" />;
}

export default ProtectedRoute;