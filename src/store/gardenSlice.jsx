import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    roomId: '초기',
    time: 0,
    title: '',
    _id: '',
};

const gardenSlice = createSlice({
    name: 'gardenSlice',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
        saveRoomId: (state, action) => {
            const newRoomId = action.payload;
            state.roomId = newRoomId;
        },
        saveRoomTime: (state, action) => {
            const newTime = action.payload;
            state.time = newTime;
        },
        saveRoomTitle: (state, action) => {
            const newTitle = action.payload;
            state.title = newTitle;
        },
        saveId: (state, action) => {
            const newId = action.payload;
            state._id = newId;
        },
    },
});

export default gardenSlice.reducer;
export const { reset, saveRoomId, saveRoomTime, saveRoomTitle, saveId } = gardenSlice.actions;
