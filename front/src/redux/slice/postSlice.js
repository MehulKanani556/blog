import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from "axios"
import { BASE_URL } from '../../utils/base_url'

export  const getPosts = createAsyncThunk(
  'post/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-posts`)

      return response.data.post
    } catch (err) {
     
      return rejectWithValue(err.response.data)
    }
  },
)
export const deletePost = createAsyncThunk(
  'post/delete',
  async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")
      const response = await axios.delete(`${BASE_URL}/delete-post/${id}`,{
        headers:{
            Authorization:
                `Bearer ${token}`
            
        }
      })
      return response.data.post
    } catch (err) {
     
      return rejectWithValue(err.response.data)
    }
  },
)
export const createPost = createAsyncThunk(
  'post/create',
  async (data, { rejectWithValue }) => {
    try {
       
        const token = localStorage.getItem("token")
      const response = await axios.post(`${BASE_URL}/create-post`,data,{
        headers:{
            Authorization:
                `Bearer ${token}`
            
        }
      })
      return response.data.post
    } catch (err) {
     
      return rejectWithValue(err.response.data)
    }
  },
)
export const updatePost = createAsyncThunk(
  'post/update',
  async (data, { rejectWithValue }) => {
    try {
        const id  = data.get("id");
        
       
        const token = localStorage.getItem("token")
      const response = await axios.post(`${BASE_URL}/update-post/${id}`,data,{
        headers:{
            Authorization:
                `Bearer ${token}`
            
        }
      })
      return response.data.post
    } catch (err) {
     
      return rejectWithValue(err.response.data)
    }
  },
)

const initialState = {
  post: [],  
} 

export  const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getPosts.fulfilled, (state, action) => {
      state.post= action.payload;
    })
  
  },
})

export const {  } = postSlice.actions

export default postSlice.reducer