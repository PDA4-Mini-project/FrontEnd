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
        saveIntroduction: (state, action) => {
            const newIntroduction = action.payload;
            state.user.introduction = newIntroduction;
        },
        savePortfolio: (state, action) => {
            const newPortfolio = action.payload;
            state.user.portfolio_url = newPortfolio;
        },
        saveImageUrl: (state, action) => {
            const newImageUrl = action.payload;
            state.user.image_url = newImageUrl;
        },
    },
});

export default userSlice.reducer;
export const { reset, saveUserName, saveProfile, saveReviewScore, saveIntroduction, savePortfolio, saveImageUrl } =
    userSlice.actions;
