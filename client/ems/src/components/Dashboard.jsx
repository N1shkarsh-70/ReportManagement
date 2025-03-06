import { FaBuilding, FaExclamationTriangle, FaUsers, FaProjectDiagram, FaUserTie } from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Plazas",
      value: 24,
      icon: <FaBuilding className="text-blue-500 text-4xl" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Pending Issues",
      value: 8,
      icon: <FaExclamationTriangle className="text-red-500 text-4xl" />,
      color: "bg-red-100 text-red-800",
    },
    {
      title: "Total Site Engineers",
      value: 15,
      icon: <FaUsers className="text-green-500 text-4xl" />,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Total Projects",
      value: 12,
      icon: <FaProjectDiagram className="text-purple-500 text-4xl" />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Total Project Incharge",
      value: 5,
      icon: <FaUserTie className="text-orange-500 text-4xl" />,
      color: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {stats.map((stat, index) => (
        <div key={index} className={`flex items-center p-6 rounded-2xl shadow-lg ${stat.color} transition hover:scale-105`}>
          <div className="p-4 bg-white rounded-full shadow-md">{stat.icon}</div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{stat.title}</h3>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
