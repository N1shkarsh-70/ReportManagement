import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addIssue } from "../../features/issueSlice";

import "react-toastify/dist/ReactToastify.css";

const IssueGeneration = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    problemType: "",
    description: "",
    timeOfIssue: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Issue:", formData);
    
    try {
      const result = await dispatch(addIssue(formData)).unwrap();
      toast.success("Issue created successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Failed to create issue!", { position: "top-right" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Generate New Issue</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Issue Type Selection */}
          <select name="problemType" className={inputField} onChange={handleChange} required>
            <option value="">Select Issue Type</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
          </select>

          {/* Issue Description */}
          <textarea
            name="description"
            className={inputField}
            placeholder="Issue Description"
            onChange={handleChange}
            required
          ></textarea>

          {/* Time of Issue */}
          <input type="datetime-local" name="timeOfIssue" className={inputField} onChange={handleChange} />

          {/* Submit Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Submit Issue
          </button>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default IssueGeneration;

// Tailwind Input Field Styling
const inputField = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";
