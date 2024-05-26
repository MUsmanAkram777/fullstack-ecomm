import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import axios from "axios";


const initialState =  {
    userInfo: JSON.parse(localStorage.getItem('user')) ?? {},
    error:''
}



export const fetchUserLogin = createAsyncThunk("fetchUserLogin", async ({ email, password }) => { 
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        const {data} = await axios.post(`/api/users/login`,{
            email,
            password
        },config)  
        return data;
    } catch (error) { 
        return {error:error.response.data.message}
    }
    
});



export const fetchUserRegister = createAsyncThunk("fetchUserRegister", async ({ name,email, password }) => { 
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        const {data} = await axios.post(`/api/users/`,{
            name,
            email,
            password
        },config)  
        return data;
    } catch (error) { 
        return {error:error.response.data.message}
    }
    
});


export const updateUser = createAsyncThunk("updateUser", async ({ name,email },{getState}) => { 
    const state = getState() 
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization:`Bearer ${state.user.userInfo.token}`
        }
    }
    
    try {
        const {data} = await axios.put(`/api/users/profile`,{
            name,
            email
        },config)  
        return data;
    } catch (error) { 
        console.log(error.response.data.message)
        return {error:error.response.data.message}
    } 
});


export const userSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {  
        logout: (state,action)=>{
            state.userInfo = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserLogin.pending, (state, action) => {
            
        })
        builder.addCase(fetchUserLogin.fulfilled, (state, action) => { 
            if(action.payload.error){
                state.error = action.payload.error
            }else{
                state.userInfo = action.payload;
                state.error = ''
            }
        })
        builder.addCase(fetchUserLogin.rejected, (state, action) => { 
            state.error = 'Something went wrong'
        })


        builder.addCase(fetchUserRegister.pending, (state, action) => {
            
        })
        builder.addCase(fetchUserRegister.fulfilled, (state, action) => { 
            if(action.payload.error){
                state.error = action.payload.error
            }else{
                state.userInfo = action.payload;
                state.error = ''
            }
        })
        builder.addCase(fetchUserRegister.rejected, (state, action) => { 
            state.error = 'Something went wrong'
        })



        builder.addCase(updateUser.pending, (state, action) => {
            
        })
        builder.addCase(updateUser.fulfilled, (state, action) => { 
            if(action.payload.error){
                state.error = action.payload.error
            }else{
                state.userInfo = action.payload;
                state.error = ''
            }
        })
        builder.addCase(updateUser.rejected, (state, action) => {  
            state.error = 'Something went wrong'
        })
    }
})





export const {logout} = userSlice.actions
export default userSlice.reducer