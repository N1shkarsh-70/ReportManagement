import { v4 as uuidv4 } from "uuid";
import crypto from "crypto"
import Issue from "../model/issueModel.js";
import Admin from "../model/adminModel.js";
import ProjectIncharge from "../model/projectEngineerModel.js";
import SiteEngineer from "../model/siteEngineerModel.js";


const issueController = {
  addIssue: async (req, res) => {
    try {
      const {  description, problemType, issueTime } = req.body;

      if ( !description || !problemType) {
        return res.status(400).json({ message: "All fields are required" });
      }

     function generateId(){
      return crypto.randomBytes(5).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0,10);
     }
     const uniqueId= await generateId()
       const plaza= await SiteEngineer.findById(req.user.user).populate('assignedPlaza');
      
       if (!plaza) {
        return res.status(404).json({ message: "Site Engineer not found" });
      }

      console.log("Populated Site Engineer:", plaza);
       


      const newIssue = new Issue({
       
        issueId: uniqueId, // Generate unique issue ID
        reportedBy: req.user?.user,
        plazaId: plaza.assignedPlaza._id, // Ensure req.user exists
        description,
        problemType,
        issueTime,
      });

      await newIssue.save();

      // Save issue ID to Admin and Project Incharge schemas
      await Admin.updateMany({}, { $push: { manageIssues: newIssue._id } });
     

      res.status(201).json({ msg: "Issue Created", issue: newIssue });
    } catch (error) {
      console.error("Error adding issue:", error);
      res.status(500).json({ msg: "Server Error" });
    }
  },

  getAllIssues: async (req, res) => {
    try {
      const issues = await Issue.find().populate("reportedBy", "username")
      .populate("plazaId", "plazaName")
      
          console.log(issues);
          
      res.status(200).json({ issues });
    } catch (error) {
      console.error("Error fetching issues:", error);
      res.status(500).json({ msg: "Server Error" });
    }
  },
  getAllIssuesById: async (req, res) => {
    try {
      const userId = req.user.user; // Get logged-in user ID
      const issues = await Issue.find({ reportedBy: userId })
        .populate("reportedBy", "username")
        .populate("plazaId", "plazaName")
        .populate("rectifiedBy", "firstName");
     console.log(issues);
     
      if (issues.length === 0) {
        return res.status(400).json({ msg: "No issues found for this user" });
      }
  
      res.status(200).json({ issues });
    } catch (error) {
      console.error("Error fetching user issues:", error);
      res.status(500).json({ msg: "Server Error" });
    }
  },
};

export default issueController;
