import AdminBottomNavBar from "../../components/AdminBottomNavBar";
import TopNavBar from "../../components/TopNavBar";

const AdminHomePage = () => {
  return (
    <div className="min-h-screen">
      <TopNavBar />
      <AdminBottomNavBar />
    </div>
  );
};

export default AdminHomePage;