import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();

        setDashboard(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;