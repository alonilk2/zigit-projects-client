import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addComment, addProject, getComments, getProjects } from "../../utils/ProjectsAPI";
const initialState = {
  list: null,
  commentslist: null,
  search: null
};

export const _getProjects = createAsyncThunk(
  "projects/get",
  async (thunkAPI) => {
    try {
      const response = await getProjects();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _getComments = createAsyncThunk(
  "projects/getcomments",
  async (project, thunkAPI) => {
    try {
      const response = await getComments(project);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _addProject = createAsyncThunk(
  "projects/add",
  async (project, thunkAPI) => {
    try {
      const response = await addProject(project);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _addComment = createAsyncThunk(
  "projects/addcomment",
  async (comment, thunkAPI) => {
    try {
      const response = await addComment(comment);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  reducers: {
    search: (state, action) => {
      state.search = action.payload
    }
  },
  initialState,
  extraReducers: {
    [_getProjects.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [_getProjects.rejected]: (state, action) => {
      state.list = null;
    },
    [_addProject.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [_addProject.rejected]: (state, action) => {
      state.list = null;
    },
    [_getComments.fulfilled]: (state, action) => {
      state.commentslist = action.payload;
    },
    [_getComments.rejected]: (state, action) => {
      state.commentslist = null;
    },
  },
});

export const { search } = projectsSlice.actions;

export default projectsSlice.reducer;
