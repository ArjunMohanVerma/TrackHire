import { useEffect, useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import ApplicationPipeline from "../components/dashboard/ApplicationPipeline";
import UpcomingInterviews from "../components/dashboard/UpcomingInterviews";
import RecentApplications from "../components/dashboard/RecentApplications";
import ProfileCompletion from "../components/dashboard/ProfileCompletion";
import UpcomingFollowUps from "../components/dashboard/UpcomingFollowUps";
import { getDashboard } from "../services/dashboardService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboard();

        if (data.success) {
          setDashboard(data.dashboard);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex min-h-75 items-center justify-center">
            <p className="text-sm text-slate-500">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }
  // Error state
  if (error) {
    return (
      <div className="min-h-screen w-full bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <section>
          <DashboardHeader />
        </section>
        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Applications"
            value={dashboard?.stats?.totalApplications ?? 0}
            icon="📋"
            iconBg="bg-blue-100"
          />

          <StatCard
            title="Interviews"
            value={dashboard?.stats?.interviews ?? 0}
            icon="🎯"
            iconBg="bg-purple-100"
          />

          <StatCard
            title="Offers"
            value={dashboard?.stats?.offers ?? 0}
            icon="🎉"
            iconBg="bg-green-100"
          />

          <StatCard
            title="Rejected"
            value={dashboard?.stats?.rejected ?? 0}
            icon="❌"
            iconBg="bg-red-100"
          />
        </section>

        {/* Main Dashboard */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <ApplicationPipeline pipeline={dashboard.pipeline} />
          </div>

          <div>
            <UpcomingInterviews interviews={dashboard.upcomingInterviews} />
          </div>
        </section>

        {/* Recent Applications */}
        <section className="mt-6">
          <RecentApplications applications={dashboard.recentApplications} />
        </section>

        {/* Bottom Section */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <ProfileCompletion completion={dashboard.profileCompletion} />

          <UpcomingFollowUps followUps={dashboard.upcomingFollowUps || []} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;