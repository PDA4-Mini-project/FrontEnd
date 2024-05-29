import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    roomId: '초기',
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
    },
});

export default gardenSlice.reducer;
export const { reset, saveRoomId } = gardenSlice.actions;
