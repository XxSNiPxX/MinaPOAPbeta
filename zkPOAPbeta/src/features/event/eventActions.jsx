import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://127.0.0.1:8080'  // Update if needed

// Action to create an event
export const createEvent = createAsyncThunk(
  'event/create',
  async (eventData, { rejectWithValue }) => {
    console.log(eventData)
    try {

      const userToken = localStorage.getItem('userToken')


      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type
          'x-access-token': userToken, // Send the JWT token in the x-access-token header
        },
      }
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      console.log("data")

      const formData = new FormData();
      formData.append('name', eventData.name);          // Adds to the body
      formData.append('description', eventData.description); // Adds to the body
      formData.append('userinfo', eventData.userinfo);  // Adds to the body
      formData.append('totalslots', eventData.totalslots); // Adds to the body
      eventData.append('userid', userInfo.id);      // Adds to the body
      if (eventData.image) {
        eventData.append('file', eventData.image, eventData.image.name);
      }
      console.log(eventData,formData,userInfo.id)


      const { data } = await axios.post(
        `${backendURL}/api/event/create`,
        eventData,
        config
      )
      console.log("data")
      return data
    } catch (error) {
      // Return a custom error message if available
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const getAllEvents = createAsyncThunk(
  'event/getall',
  async (eventData, { rejectWithValue }) => {
    console.log(eventData)
    try {



      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type
                },
      }


      const { data } = await axios.get(
        `${backendURL}/api/event/getallevents`,
        config
      )
      console.log(data)
      return data
    } catch (error) {
      // Return a custom error message if available
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)



export const joinEvent = createAsyncThunk(
  'event/join',
  async (eventData, { rejectWithValue }) => {
    console.log(eventData)
    try {

      const userToken = localStorage.getItem('userToken')


      const config = {
        headers: {
          'x-access-token': userToken, // Send the JWT token in the x-access-token header
        },
      }
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      console.log("data")



      const { data } = await axios.post(
        `${backendURL}/api/event/join`,
        {eventId:eventData.eventid,userId:userInfo.id},
        config
      )
      console.log("data")
      return data
    } catch (error) {
      // Return a custom error message if available
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const getUserEvents = createAsyncThunk(
  'event/getuserevents',
  async (eventData, { rejectWithValue }) => {
    const userToken = localStorage.getItem('userToken')

    try {



      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type
          'x-access-token': userToken, // Send the JWT token in the x-access-token header

                },
      }


      const { data } = await axios.get(
        `${backendURL}/api/event/getuserevents`,
        config
      )
      console.log(data)
      return data
    } catch (error) {
      // Return a custom error message if available
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getReservedEvents = createAsyncThunk(
  'event/getreservedevents',
  async (eventData, { rejectWithValue }) => {
    const userToken = localStorage.getItem('userToken')

    try {



      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type
          'x-access-token': userToken, // Send the JWT token in the x-access-token header

                },
      }


      const { data } = await axios.get(
        `${backendURL}/api/event/getreservedevents`,
        config
      )
      console.log(data)
      return data
    } catch (error) {
      // Return a custom error message if available
      // if (error.response && error.response.data.message) {
      //   return rejectWithValue(error.response.data.message)
      // } else {
      //   return rejectWithValue(error.message)
      // }
    }
  }
)

export const getReservedUsers = createAsyncThunk(
  'event/getreservedusers',
  async (eventData, { rejectWithValue }) => {
    const userToken = localStorage.getItem('userToken')
console.log("resuser",eventData)
    try {



      const config = {
        headers: {
          'x-access-token': userToken, // Send the JWT token in the x-access-token header

                },
      }


      const { data } = await axios.post(
        `${backendURL}/api/event/getreservedusers`,
        {eventId:eventData.eventid},
        config
      )
      console.log(data,"heree")
      return data
    } catch (error) {
      // Return a custom error message if available
      // if (error.response && error.response.data.message) {
      //   return rejectWithValue(error.response.data.message)
      // } else {
      //   return rejectWithValue(error.message)
      // }
    }
  }
)

export const endEvent = createAsyncThunk(
  'event/endEvent',
  async (eventData, { rejectWithValue }) => {
    console.log(eventData)
    try {

      const userToken = localStorage.getItem('userToken')


      const config = {
        headers: {
          'x-access-token': userToken, // Send the JWT token in the x-access-token header
        },
      }
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      console.log("data")



      const { data } = await axios.post(
        `${backendURL}/api/event/endEvent`,
        eventData,
        config
      )
      console.log("data")
      return data
    } catch (error) {
      // Return a custom error message if available
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const claimEvent = createAsyncThunk(
  'event/claim',
  async ({eventData,account}, { rejectWithValue }) => {
    console.log(eventData,account)
    try {

      const userToken = localStorage.getItem('userToken')


      const config = {
        headers: {
          'x-access-token': userToken, // Send the JWT token in the x-access-token header
        },
      }
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      console.log(eventData,"data")



      const { data } = await axios.post(
        `${backendURL}/api/event/claim`,
        {eventId:eventData.eventid,account:account},
        config
      )
      console.log("data")
      return data
    } catch (error) {
      // Return a custom error message if available
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
