import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    roomId: '초기',
    time: 0,
    title: '',
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
    },
});

export default gardenSlice.reducer;
export const { reset, saveRoomId, saveRoomTime, saveRoomTitle } = gardenSlice.actions;
