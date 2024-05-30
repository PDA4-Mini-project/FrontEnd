import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    roomId: '초기',
    time: 0,
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
    },
});

export default gardenSlice.reducer;
export const { reset, saveRoomId, saveRoomTime } = gardenSlice.actions;
