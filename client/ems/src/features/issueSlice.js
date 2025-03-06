import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to add an issue
export const addIssue = createAsyncThunk("plaza/addIssue", async (payload, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.post("http://82.29.162.1:3000/superadmin/add-issue", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; 
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Error adding issue");
  }
});

// Async thunk to get all issues
export const getAllIssues = createAsyncThunk("plaza/getAllIssues", async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get("http://82.29.162.1:3000/superadmin/get-allIssues", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API Response:", response.data);
    return response.data.issues; 
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Error fetching issues");
  }
});

export const resolveIssue = createAsyncThunk(
  "issues/resolveIssue",
  async ({ issueId, remarks }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post("http://82.29.162.1:3000/superadmin/resolve-issue", {
        issueId,
        remarks,
      },{
        headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response);
  
      return response.data; // Return updated issue
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getIssuesById = createAsyncThunk(
  "issues/getIssuesById",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get("http://82.29.162.1:3000/superadmin/get-allIssuesById",{
        headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response);
  
      return response.data || []; // Return updated issue
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Issue slice
const issueSlice = createSlice({
  name: "issue",
  initialState: {
    allIssues: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addIssue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addIssue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allIssues.push(action.payload); // Fixed here
      })
      .addCase(addIssue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllIssues.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllIssues.fulfilled, (state, action) => {
        console.log("Redux Store Updated:", action.payload);
        state.status = "succeeded";
        state.allIssues = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllIssues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resolveIssue.fulfilled, (state, action) => {
        state.allIssues = state.allIssues.filter((issue) => issue.issueId !== action.payload.issue.issueId);
      })
      .addCase(resolveIssue.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getIssuesById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getIssuesById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allIssues = Array.isArray(action.payload) ? action.payload : []; // Ensure it's always an array
      })
      .addCase(getIssuesById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "error fetching issues by id";
      });
  },
});

export const { resetStatus } = issueSlice.actions;
export default issueSlice.reducer;
