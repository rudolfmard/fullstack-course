import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message: 'initial',
    visible: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      state.message = action.payload
    },
    notificationOn(state, action){
        state.visible = true
    },
    notificationOff(state, action){
        state.visible = false
    }
  }
})

export const { notificationChange, notificationOn, notificationOff } = notificationSlice.actions
export default notificationSlice.reducer