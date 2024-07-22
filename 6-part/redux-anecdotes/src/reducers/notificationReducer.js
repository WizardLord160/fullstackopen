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

export const setNotification = (message, notifType, duration) => {
  return async dispatch => {
    if (notifType == "CREATE") {
      dispatch(createNotification(message))
    } else if (notifType == "VOTE") {
      dispatch(voteNotification(message))
    }
    setTimeout(() => dispatch(clearNotification()), duration)
  }
}
export default notificationSlice.reducer

