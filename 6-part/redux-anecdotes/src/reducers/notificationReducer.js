import { createSlice } from '@reduxjs/toolkit'

const initialState = ""
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return `You created '${action.payload}'`
    },
    voteNotification(state, action) {
      return `You voted '${action.payload}'`
    },
    clearNotification(state, action) {
      return ""
    }
  }
})

export const { createNotification, voteNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer