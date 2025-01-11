import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllEvents } from '../event/eventActions'; // Import getAllEvents action
// const backendURL =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:8080'
//     : import.meta.env.VITE_SERVER_URL

const backendURL ='http://127.0.0.1:8080'



export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${backendURL}/api/auth/signin`,
        { username, password },
        config
      )
      console.log(data)

      // store user's token in local storage
      localStorage.setItem('userToken', data.accessToken)
      localStorage.setItem('userInfo', JSON.stringify(data))
      await dispatch(getAllEvents());
      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Making the POST request to the signup endpoint
      let data= await axios.post(
        `${backendURL}/api/auth/signup`,  // Ensure correct endpoint here
        { username, email, password },
        config
      );

      // let data = await axios.post(`${backendURL}/api/auth/signup`, {
      //   username: username,
      //   email: email,
      //   password: password
      // });

      console.log(data)


    } catch (error) {
      // Check for specific error response and return the message, or fallback to the generic error message
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);  // In case of network or unexpected errors
      }
    }
  }
);
