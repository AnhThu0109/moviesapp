import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        isLoadingBanner: false,
        isLoadingTrending: false,
        isLoadingPopular: false,
        isLoadingUpComing: false,
    }
}

export const loading = createSlice({
    //using the same name
    name: "loading",
    initialState,
    reducers:{
        loadingBannerTrue: (state) => {
            state.value.isLoadingBanner = true
        },
        loadingBannerFalse: (state) => {
            state.value.isLoadingBanner = false
        },
        loadingTrendingTrue: (state) => {
            state.value.isLoadingTrending = true
        },
        loadingTrendingFalse: (state) => {
            state.value.isLoadingTrending = false
        },
        loadingPopularTrue: (state) => {
            state.value.isLoadingPopular = true
        },
        loadingPopularFalse: (state) => {
            state.value.isLoadingPopular = false
        },
        loadingUpComingTrue: (state) => {
            state.value.isLoadingUpComing = true
        },
        loadingUpComingFalse: (state) => {
            state.value.isLoadingUpComing = false
        }
    }
})

export const {loadingBannerTrue, loadingBannerFalse, loadingTrendingTrue, loadingTrendingFalse, loadingPopularTrue, loadingPopularFalse, loadingUpComingTrue, loadingUpComingFalse} = loading.actions;

export default loading.reducer;