import { createSlice } from '@reduxjs/toolkit';
const ResumeSlice=createSlice({
    name:"resume",
    initialState:{
        themeData: {
            personalData: {
                profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNI3kQLeYMnpy05PhEiuzS1rtRmNVL7VKvwcE4ACmQSQT1rRmUO5mHLyjH-mGHq0ueUQY&usqp=CAU',
                name: "Your Name",
                summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                profile: "Work Profile",
                address: "Address Line",
                phone: "Phone Number",
                email: "Email Address",
                skill: 'Your, Skills, are, shown, here',
            },
            projectData: {
                projectTitles: { pTitle1: "Project Title 1" },
                projectDesc: { pDescription1: "Project Description 1" },
            },
            educationData: {
                educationTitles: { eTitle1: "Education Title 1" },
                educationDesc: { eDescription1: "Education Description 1" },
            },
            workData: {
                workTitles: { wTitle1: "Work Title 1" },
                workDesc: { wDescription1: "Work Description 1" },
            },
            awardData: {
                awards: 'Certificate of Appreciation - 2019, Certificate of Appreciation - 2018'
            }
        },
        checkProj: false,
        checkWork: false,
        checkAward: false,
        loading: false,
        showComponent: false,
        currentTheme: 'Theme1',
        selectBtn: true,
 
    },
    reducers:{
            setThemeData: (state, action) => {
                state.themeData = action.payload;
            },
            setCheckProj: (state, action) => {
                state.checkProj = action.payload;
            },
            setCheckWork: (state, action) => {
                state.checkWork = action.payload;
            },
            setCheckAward: (state, action) => {
                state.checkAward = action.payload;
            },
            setLoading: (state, action) => {
                state.loading = action.payload;
            },
            setShowComponent: (state, action) => {
                state.showComponent = action.payload;
            },
            setCurrentTheme: (state, action) => {
                state.currentTheme = action.payload;
            },
            setSelectBtn: (state, action) => {
                state.selectBtn = action.payload;
            },
            
    
        }
})
export const {
    setThemeData,
    setCheckProj,
    setCheckWork,
    setCheckAward,
    setLoading,
    setShowComponent,
    setCurrentTheme,
    setSelectBtn,
    setComponentRef
} = ResumeSlice.actions;
export default ResumeSlice.reducer;

