import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from "axios"
import { BASE_URL } from '../../utils/base_url'

export  const register = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`,userData)
      localStorage.setItem("user",JSON.stringify(response.data.user))
      localStorage.setItem("token",response.data.token)
      return response.data.user
    } catch (err) {
     
      return rejectWithValue(err.response.data)
    }
  },
)
export const login = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`,userData)
      localStorage.setItem("user",JSON.stringify(response.data.checkUser))
      localStorage.setItem("token",response.data.token)
      return response.data.checkUser
    } catch (err) {
     
      return rejectWithValue(err.response.data)
    }
  },
)
export const updateUser = createAsyncThunk(
  'user/update',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/update-user/${userData._id}`,userData)
      return response.data.user
    } catch (err) {
     
      return rejectWithValue(err.response.data)
    }
  },
)
export const deleteUser = createAsyncThunk(
  'user/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-user/${id}`)
      return response.data.user
    } catch (err) {
     
      return rejectWithValue(err.response.data)
    }
  },
)
export const getUsers = createAsyncThunk(
  'user/get-users',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-users`)
      return response.data.user
    } catch (err) {
     
      return rejectWithValue(err.response.data)
    }
  },
)


const initialState = {
  user: null,  
  users:[]
} 

export  const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.fulfilled, (state, action) => {
      state.user= action.payload;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user= action.payload;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.users= action.payload;
    })
  },
})

export const {  } = userSlice.actions

export default userSlice.reducer