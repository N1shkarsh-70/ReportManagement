import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteEngineers } from "../../features/siteEngineer.js"; // Adjust the path as needed

export default function AllSiteEngineer() {
  const dispatch = useDispatch();
  const { engineers, status, error } = useSelector((state) => state.siteEngineer);

  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const engineersPerPage = 10;

  // Fetch engineers on component mount
  useEffect(() => {
    dispatch(fetchSiteEngineers());
  }, [dispatch]);

  // Pagination Logic
  const indexOfLastEngineer = currentPage * engineersPerPage;
  const indexOfFirstEngineer = indexOfLastEngineer - engineersPerPage;
  const currentEngineers = engineers.slice(indexOfFirstEngineer, indexOfLastEngineer);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Site Engineers</h2>

      {/* Show loading state */}
      {status === "loading" && <p className="text-blue-500 text-lg">Loading site engineers...</p>}
      {status === "failed" && <p className="text-red-500 text-lg">Error: {error}</p>}

      {/* Engineers Table */}
      {status === "succeeded" && engineers.length > 0 && (
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                {["First Name", "Last Name", "Username", "Email", "Plaza", "Role", "Actions"].map((heading) => (
                  <th key={heading} className="py-3 px-4 text-lg">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentEngineers.map((engineer) => (
                <tr key={engineer._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{engineer.firstName}</td>
                  <td className="py-3 px-4">{engineer.lastName}</td>
                  <td className="py-3 px-4">{engineer.username}</td>
                  <td className="py-3 px-4">{engineer.email}</td>
                  <td className="py-3 px-4">{engineer.assignedPlaza.plazaName}</td>
                  <td className="py-3 px-4">{engineer.role}</td>
                  <td className="py-3 px-4">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                      onClick={() => setSelectedEngineer(engineer)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              className={`px-4 py-2 text-white rounded-lg transition ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg font-semibold">Page {currentPage}</span>
            <button
              className={`px-4 py-2 text-white rounded-lg transition ${indexOfLastEngineer >= engineers.length ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(engineers.length / engineersPerPage)))}
              disabled={indexOfLastEngineer >= engineers.length}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedEngineer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {selectedEngineer.firstName} {selectedEngineer.lastName}
            </h3>

            <p className="text-gray-600 mb-2"><strong>Username:</strong> {selectedEngineer.username}</p>
            <p className="text-gray-600 mb-2"><strong>Email:</strong> {selectedEngineer.email}</p>
            <p className="text-gray-600 mb-2"><strong>Plaza:</strong> {selectedEngineer.assignedPlaza.plazaName}</p>
            <p className="text-gray-600 mb-2"><strong>Role:</strong> {selectedEngineer.role}</p>
            <p className="text-gray-600 mb-2"><strong>Phone:</strong> {selectedEngineer.phoneNO}</p>

            <h4 className="text-lg font-semibold text-gray-700 mt-4">Address</h4>
            <p className="text-gray-600"><strong>City:</strong> {selectedEngineer.address.city}</p>
            <p className="text-gray-600"><strong>State:</strong> {selectedEngineer.address.state}</p>
            <p className="text-gray-600"><strong>Home Address:</strong> {selectedEngineer.address.homeAddress}</p>

            <button
              className="mt-6 w-full py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
              onClick={() => setSelectedEngineer(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}