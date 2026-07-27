import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

function Navbar() {

    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        try{
            await logoutUser();
        
        setUser(null);

        navigate("/");
        }catch(err){
             alert("Logout Failed");
            console.log(err.message);
        }

    };

    return (

        <nav>

            <h2>Notes App</h2>

            <div>

                <span>
                    Welcome {user?.firstName}
                </span>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;