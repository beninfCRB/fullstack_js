import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light',
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
            state.theme = action.payload.value ? 'dark' : 'light'
            state.themeBackground = action.payload.value ? 'has-background-dark has-text-light' : 'site-layout-background'
            state.themeContent = action.payload.value ? 'has-background-grey-light' : 'site-page-header-ghost-wrapper'
            state.themeText = action.payload.value ? 'has-text-light' : 'has-text-black'
        }
    }
});

export const { reset, update } = themeSlice.actions;
export default themeSlice.reducer;