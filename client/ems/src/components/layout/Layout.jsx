import Header from "../Header";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 h-full overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
