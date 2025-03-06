import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIssuesById } from "../../features/issueSlice";
import { CheckCircle, AlertTriangle, Clock, User, ClipboardList, Eye, X } from "lucide-react";

const EngineersIssues = () => {
  const dispatch = useDispatch();
  const { allIssues, status, error } = useSelector((state) => state.issue);
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    dispatch(getIssuesById());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-center p-6">Loading issues...</div>;
  }

  // if (status === "failed") {
  //   console.log("Error Object:", error); // Debugging
  //   return (
  //     <div className="text-center p-6 text-red-600">
  //       Error fetching issues: {typeof error === "object" ? JSON.stringify(error) : error}
  //     </div>
  //   );
  // }
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Issue Tracking</h2>
      
      {allIssues.length === 0 ? (
        <div className="text-center text-gray-600 p-6 bg-white shadow-lg rounded-lg">
          No issues found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="p-3">Issue ID</th>
                <th className="p-3">Problem Type</th>
                <th className="p-3">Description</th>
                <th className="p-3">Issue Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">View Details</th>
              </tr>
            </thead>
            <tbody>
              {allIssues.map((issue, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{issue.issueId}</td>
                  <td className="p-3 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-blue-600" />
                    {issue.problemType}
                  </td>
                  <td className="p-3">{issue.description}</td>
                  <td className="p-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    {issue.issueTime}
                  </td>
                  <td className="p-3">
                    {issue.status === "Resolved" ? (
                      <span className="text-green-600 font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> {issue.status}
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> {issue.status}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {issue.status === "Resolved" ? (
                      <button
                        onClick={() => setSelectedIssue(issue)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                      >
                        <Eye className="w-5 h-5" /> View
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL FOR ISSUE DETAILS */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setSelectedIssue(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Issue Details</h3>
            <p className="text-gray-700"><strong>Issue ID:</strong> {selectedIssue.issueId}</p>
            <p className="text-gray-700"><strong>Problem Type:</strong> {selectedIssue.problemType}</p>
            <p className="text-gray-700"><strong>Description:</strong> {selectedIssue.description}</p>
            <p className="text-gray-700"><strong>Issue Time:</strong> {selectedIssue.issueTime}</p>
            <p className="text-gray-700"><strong>Status:</strong> {selectedIssue.status}</p>
            <hr className="my-4" />
            <p className="text-gray-700 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-600" /> <strong>Rectified By:</strong> {selectedIssue.rectifiedBy.firstName}
            </p>
            <p className="text-gray-700"><strong>Rectified Time:</strong> {new Date(selectedIssue.rectifiedTime).toLocaleString()}</p>
            <p className="text-gray-700"><strong>Remark:</strong> {selectedIssue.remarks}</p>
            <button
              onClick={() => setSelectedIssue(null)}
              className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineersIssues;
