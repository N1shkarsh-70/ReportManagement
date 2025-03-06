import Project from "../model/projectModel.js"; // Adjust the path accordingly
import ProjectIncharge from "../model/projectEngineerModel.js";
import mongoose from "mongoose";
import authEssentials from "./index.js";
import Admin from "../model/adminModel.js";
import { dotenvVar } from "../config.js";
import Issue from "../model/issueModel.js";
const adminCtrl= {

//project create read update delete
createProject: async (req, res) => {
    try {
        const { clientName, projectName, assignedTo, PIU_Name, location } = req.body;
        const createdBy = req.user.user; // Assuming you have user info in req.user

        if (!clientName || !projectName || !PIU_Name || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let projectData = { clientName, projectName, createdBy, PIU_Name, location };

        if (assignedTo && assignedTo.trim() !== "") {
            if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
                return res.status(400).json({ message: "Invalid ID" });
            }

            const incharge = await ProjectIncharge.findById(assignedTo);
            if (!incharge) {
                return res.status(400).json({ message: "Project incharge not found" });
            }

            projectData.assignedTo = assignedTo;
        }

        const project = new Project(projectData);
        await project.save();

        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
},

// Get all projects
 getProjects : async (req, res) => {
    try {
        const projects = await Project.find().populate("createdBy", "name email")
        .populate("assignedTo");
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

getProjectBYInchargeId: async(req,res)=>{
    try{
        const id =  req.user.user;

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "id is missing or invalid id "})
        }

        const project= await Project.find({assignedTo: id}).populate("assignedTo")
        .populate("plazas");

        if(!project){
            return res.state(400).json({message: "no Project found"})
        }

        return res.status(200).json({message: "founded", project})
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "internal server error"})
        
    }
},
// Get a single project by ID
 getProjectById : async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("createdBy", "name email");
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

// Update a project
 updateProject : async (req, res) => {
    const {id}= req.params
    const { clientName, projectName, assignedTo , PIU_Name, location} = req.body;
    try {
        console.log(id);
        console.log(clientName);
        console.log(projectName);
        console.log(assignedTo);
        console.log(PIU_Name);
        console.log(location);
        
        
        
        
        
        
        if(!id || !mongoose.Types.ObjectId.isValid(id) || !assignedTo || !mongoose.Types.ObjectId.isValid(assignedTo)){
            return res.status(400).json({message: "invalid id"})
        }
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { clientName, projectName, assignedTo , PIU_Name, location},
            { new: true, runValidators: true }
        );
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project updated successfully", project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

// Delete a project
deleteProject : async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

//projectEngineer create read update delete 
// Create a new Project Incharge
createProjectIncharge: async (req, res) => {
    try {
        const { firstName, lastName, phoneNO, username, password, email, assignedProject, address } = req.body;
        
        
        // Logging (for debugging)
        console.log(req.body);
        
        // Validation
        if (!firstName || !lastName || !phoneNO || !username || !email || !password || !assignedProject || !address?.city || !address?.state || !address?.homeAddress) {
            return res.status(400).json({ message: "All fields are required" });
        }
    
        // Hash Password
        const hash = await authEssentials.createHash(password, dotenvVar.SALT);

        // Create Project Incharge
        const projectIncharge = new ProjectIncharge({
            firstName,
            lastName,
            phoneNO,
            username,
            password: hash,
            email,
            assignedProject,
            assignedBy: req.user.user,  // ✅ Store ObjectId, not an object
            assignedByModel: req.user.role, // ✅ Store the role ("Admin" or "SuperAdmin")
            address
        });

        await projectIncharge.save();
        res.status(201).json({ message: "Project Incharge created successfully", projectIncharge });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
getProjectIncharges: async (req, res) => {
    try {
        const projectIncharges = await ProjectIncharge.find()
            .populate("assignedProject", "projectName")
            .populate("assignedBy", "firstName");

        console.log(projectIncharges);
        res.status(200).json(projectIncharges);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
},
 // Get a single Project Incharge by ID
 getProjectInchargeById : async (req, res) => {
    const {id}= req.params;
    try {
        const projectIncharge = await ProjectIncharge.findById(id).populate("assignedProject", "projectName").populate("assignedBy", "email");
        if (!projectIncharge) {
            return res.status(404).json({ message: "Project Incharge not found" });
        }
        res.status(200).json(projectIncharge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
// Update a Project Incharge
 updateProjectIncharge : async (req, res) => {
    const {id}= req.params;
    try {
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "invalid id"})
        }
        const { firstName, lastName, phoneNO, username, email, assignedProject,  } = req.body;
        
        const projectIncharge = await ProjectIncharge.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, phoneNO, username, email, assignedProject },
            { new: true, runValidators: true }
        );
        
        if (!projectIncharge) {
            return res.status(404).json({ message: "Project Incharge not found" });
        }
        res.status(200).json({ message: "Project Incharge updated successfully", projectIncharge });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

// Delete a Project Incharge
 deleteProjectIncharge : async (req, res) => {
    const {id}= req.params
    try {
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "invalid id"})
        }
        const projectIncharge = await ProjectIncharge.findByIdAndUpdate(id, {isActive: false});
        if (!projectIncharge) {
            return res.status(404).json({ message: "Project Incharge not found" });
        }
        res.status(200).json({ message: "Project Incharge deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

//resolve issue

resoleIssue: async (req, res) => {
    try {
        const { remarks, issueId } = req.body;

        if (!remarks || !issueId) {
            return res.status(400).json({ message: "Details are missing" });
        }

        const issueExist = await Issue.findOne({ issueId: issueId });

        if (!issueExist) {
            return res.status(404).json({ message: "Issue not found" });
        }

        // Update issue with resolution details
        issueExist.remarks = remarks;
        issueExist.rectifiedBy = req.user.user; // Assuming req.user contains authenticated user info
        issueExist.rectifiedTime = new Date(); // Store current timestamp
        issueExist.status = "Resolved"; // Mark issue as resolved

        await issueExist.save(); // Save the updated issue
  // Remove issue from Admin and Project Incharge manageIssues array
  await Admin.updateMany({}, { $pull: { manageIssues: issueExist._id } });
        return res.status(200).json({ message: "Issue resolved successfully", issue: issueExist });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


}

export default adminCtrl;