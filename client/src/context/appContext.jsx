import reducer from "./reducer";
import axios from "axios";

import {
    EDIT_DATA_BEGIN,
    EDIT_DATA_SUCCESS,
    EDIT_DATA_FAIL,
    UPLOAD_DATA_SUCCESS,
    UPLOAD_DATA_FAIL,
    API_CALL_BEGIN,
    API_CALL_FAIL,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    LOGOUT_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    SET_FILE,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    GET_ALL_DATA_SUCCESS,
    GET_ALL_EDIT_REQUEST_SUCCESS,
    APPROVE_EDIT_SUCCESS,
    REJECT_EDIT_SUCCESS
    
   
    
} from './action'
import React, { useReducer, useContext,useEffect } from 'react';



export const initialState  ={
    isLoading:false,
    isAuthenticated:false,
    user:null,
    isAdmin:false,
    mainData:[],
    file:null,
    message:"",
    editRequestData:[],
    editDataStatusChange:false,
    toggleAction:false,
}
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer,initialState);
  // axios --base url
  const instance = axios.create({
     baseURL: import.meta.env.VITE_SERVER_URL+"/api/v1",
     headers:{"token":localStorage.getItem("token")}
      // to get cookies in browser during development
    // production
    // baseURL: '/api/v1',
  }); 
  useEffect(()=>{
    instance.defaults.headers["token"] = localStorage.getItem("token")
  },[instance,state.isAuthenticated])
  const setFile=(file)=>{
    dispatch({type:SET_FILE,payload:file});  
  } 
    
  
    
    const signupUser=async (currUser)=>{
      dispatch({type:API_CALL_BEGIN});
      try {
        const {data}= await instance.post('/auth/signup',currUser);
          dispatch({
            type:SIGNUP_USER_SUCCESS,
            payload:data.user
          })
      } catch (error) {
        dispatch({type:SIGNUP_USER_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  alert(error.response.data.message);
        } 
        
        alert(error.message || 'something went wrong tru later');
      }
    }

    const loginUser=async(currUser)=>{
      dispatch({type:API_CALL_BEGIN});
      try{
        const {data} =await instance.post(`/auth/login`,currUser);
        console.log("data",data)
        localStorage.setItem("token",data.token);
        dispatch({ 
          type:LOGIN_USER_SUCCESS,
          payload:data.user
        })
      }catch(error){
        dispatch({type:LOGIN_USER_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  alert(error.response.data.message);
        } 
        
        alert(error.message || 'something went wrong tru later');
      }

    }


    const logoutUser =async()=>{
      await instance.get(`/auth/logout`);
      dispatch({type:LOGOUT_USER});  
    }


    const getCurrUser=async()=>{
        dispatch({type:API_CALL_BEGIN});
        try{
          const {data}= await instance(`/auth/getCurrUser`);
          
          dispatch({
            type:GET_USER_SUCCESS,
            payload:data.user
          })
        }catch(err){
          
          if (err.response.status === 401) {
           
            return;
          };
          
          dispatch({type:GET_USER_FAIL})
          logoutUser();
          // console.log(err.responce.data.msg);
        }
    }
    
    
    
    
     const getAllData=async(queryObject)=>{
      let {status="",place="",year="",customerName="",editStatus="",dri_id="",appNumber=""}=queryObject;
      customerName=customerName.toUpperCase()
      dispatch({type:API_CALL_BEGIN});     
      try {
  
        const {data}= await instance(`/getData?dri_id=${dri_id}&appNumber=${appNumber}&year=${year}&status=${status}&place=${place}&customerName=${customerName}&editStatus=${editStatus}`) 
        console.log(data);
        
        dispatch({type:GET_ALL_DATA_SUCCESS,
          payload:data.result
        })
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
        console.log(error)
      }
      
    }

    const UploadData=async(file)=>{
     
      dispatch({type:API_CALL_BEGIN});

     
      try {
        const formData = new FormData();
        formData.append('file', file);
        const {data}= await instance.post(`/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      
        dispatch({type:UPLOAD_DATA_SUCCESS,
          payload:data.message
        })
        alert(data.message);
      } catch (error) {
        
        dispatch({type:UPLOAD_DATA_FAIL, payload:error.message});
        
      }
    }
 
    // EXECUTIVE
    const editData=async(id,changedData)=>{
     
      dispatch({type:EDIT_DATA_BEGIN});
      
      try {
       
        const {data}= await instance.post(`/edit/${id}`,changedData)
       
        dispatch({type:EDIT_DATA_SUCCESS,
          payload:data.data
        })
        
      } catch (error) { 
        dispatch({type:EDIT_DATA_FAIL});  
      }
    }
    // VERIFIER
    const  getAllEditRequest=async()=>{
     
      dispatch({type:API_CALL_BEGIN});
     
      try {
       
        const {data}= await instance.get(`/edit/allData`)
        console.log(data);
        dispatch({type:GET_ALL_EDIT_REQUEST_SUCCESS,
          payload:data.data
        })
        
      } catch (error) { 
        dispatch({type:API_CALL_FAIL});  
      }
    }
    const approveEditRequest=async(id)=>{
      dispatch({type:API_CALL_BEGIN});
      try {
       
        const {data}= await instance.patch(`/edit/update/${id}`)
        console.log(data);
        dispatch({type:APPROVE_EDIT_SUCCESS
        })
        
      } catch (error) { 
        dispatch({type:API_CALL_FAIL});  
      }

    }
    const rejectEditRequest=async(id)=>{
      dispatch({type:API_CALL_BEGIN});
      try {
       
        const {data}= await instance.patch(`/edit/${id}`)
        console.log(data);
        dispatch({type:REJECT_EDIT_SUCCESS
        })
        
      } catch (error) { 
        dispatch({type:API_CALL_FAIL});  
      }
    }
    // initial app load
    useEffect(()=>{
     // getUser
      getCurrUser();
    // raw data  
      getAllData({
        status:"All",
        place:"All",
        yearofpurchase:"",
        dri_id:"",
        customerName:"",
        editStatus:"All",
        appNumber:"",
      });
      getAllEditRequest();
    },[])
    return (
        <AppContext.Provider
          value={{...state,
            setFile,UploadData,getAllData,editData,getAllEditRequest,approveEditRequest,rejectEditRequest
            ,signupUser,loginUser,logoutUser,getCurrUser}}
        >
          {children}
        </AppContext.Provider>
      );
}
export const useAppContext = () => {
    return useContext(AppContext);
  };
  
  export { AppProvider };