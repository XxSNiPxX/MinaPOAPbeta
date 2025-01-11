import { createSlice } from '@reduxjs/toolkit'
import { createEvent,getAllEvents,joinEvent,getUserEvents,getReservedEvents,getReservedUsers,endEvent,claimEvent } from './eventActions'

const initialState = {
  loading: false,
  events: [],
  userevents:[],
  claimedevents:[],
  unclaimedevents:[],
  pendingEvents:[],
  reservedusers:[],
  alleventsjoined:[],
  reserved_user_modal:false,
  error: null,
  success: false,
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    resetEvents: (state) => {
      state.events = [];
      state.error = null;
      state.success = false;
    },
    closeReservedUserModal: (state) => {
      state.reserved_user_modal = false; // Close the modal
    },
  },
  extraReducers: (builder) => {
    // Create event
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createEvent.fulfilled, (state, { payload }) => {
        state.loading = false
        state.events.push(payload) // Add the created event to the events list
        state.success = true
      })
      .addCase(createEvent.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      });

      builder
      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEvents.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.events = payload.events; // Replace the events list with the fetched events
        state.success = true;
      })
      .addCase(getAllEvents.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

      builder
      .addCase(joinEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinEvent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.events = state.events.map(event =>
        event.eventid === payload.event.eventid ? payload.event : event
        ); // Replace the matching event with the new one from the payload
        state.success = true;
      })
      .addCase(joinEvent.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

      builder
      .addCase(getUserEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserEvents.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userevents=payload.events;
        state.success = true;
      })
      .addCase(getUserEvents.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

      builder
      .addCase(getReservedEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservedEvents.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.claimedevents=payload.claimedEvents;
        state.unclaimedevents=payload.unclaimedEvents;
        state.pendingEvents=payload.pendingEvents;
        state.alleventsjoined=payload.allEvents;

        state.success = true;
      })
      .addCase(getReservedEvents.rejected, (state, { payload }) => {
        state.loading = false;
        state.claimedevents=[]
        state.unclaimedevents=[]
        state.pendingEvents=[]
        state.alleventsjoined=[]
        state.error = payload;
      });

      builder
      .addCase(getReservedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservedUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reservedusers=payload.users;
        state.reserved_user_modal=true;

        state.success = true;
      })
      .addCase(getReservedUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

      builder
      .addCase(endEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endEvent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.events = state.events.map(event =>
              event.id === payload.event.eventid ? payload.event : event
        ); // Replace the matching event with the new one from the payload

        state.reserved_user_modal=false;

        state.success = true;
      })
      .addCase(endEvent.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });


      builder
      .addCase(claimEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(claimEvent.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.events = state.events.map(event =>
        //       event.id === payload.event.id ? payload.event : event
        // ); // Replace the matching event with the new one from the payload
        //
        // state.reserved_user_modal=false;

        state.success = true;
      })
      .addCase(claimEvent.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });


  },
})

export const { resetEvents,closeReservedUserModal } = eventSlice.actions
export default eventSlice.reducer
