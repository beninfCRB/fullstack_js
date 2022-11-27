import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeBackground: 'site-layout-background',
    themeContent: 'site-page-header-ghost-wrapper',
    themeText: 'has-text-black'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        reset: (state) => initialState,
        update: (state, action) => {
            state.themeBackground = action.payload.value ? 'has-background-dark has-text-light' : 'site-layout-background'
            state.themeContent = action.payload.value ? 'has-background-black-ter has-text-light' : 'site-page-header-ghost-wrapper'
            state.themeText = action.payload.value ? 'has-text-light' : 'has-text-black'
        }
    }
});

export const { reset, update } = themeSlice.actions;
export default themeSlice.reducer;