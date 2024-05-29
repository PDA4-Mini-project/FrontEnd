import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        userId: '',
        name: '',
        image_url: '',
        introduction: '',
        portfolio_url: '',
        userName: '',
        review_score: '',
    },
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
        saveUserName: (state, action) => {
            const newName = action.payload;
            state.user.name = newName;
        },
        saveProfile: (state, action) => {
            const profile = action.payload;
            state.user.image_url = profile.image_url;
            state.user.introduction = profile.introduction;
            state.user.portfolio_url = profile.portfolio_url;
            state.user.userId = profile.profile_id;
        },
        saveReviewScore: (state, action) => {
            const newReviewScore = action.payload;
            state.user.review_score = newReviewScore;
        },
    },
});

export default userSlice.reducer;
export const { reset, saveUserName, saveProfile, saveReviewScore } = userSlice.actions;
