import {
    API_CALL_BEGIN,
    API_CALL_FAIL,
    SET_FILE,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    LOGOUT_USER,
    GET_ALL_DATA_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    UPLOAD_DATA_SUCCESS,
    UPLOAD_DATA_FAIL,
    EDIT_DATA_BEGIN,
    EDIT_DATA_FAIL,
    EDIT_DATA_SUCCESS,
    GET_ALL_EDIT_REQUEST_SUCCESS,
    APPROVE_EDIT_SUCCESS,
    REJECT_EDIT_SUCCESS,
    
   
} from './action'

const reducer =(state,action)=>{
    
    if( action.type===API_CALL_BEGIN ||action.type=== EDIT_DATA_BEGIN){
        return{
            ...state,
            isLoading:true         
        }
    }
    if(action.type=== EDIT_DATA_BEGIN){
        return{
           
            ...state,
            
            isLoading:true         
        }
    }
    if(action.type===GET_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,
            isAdmin:action.payload?.role==="admin",
            
        }
    }
    if(action.type===GET_USER_FAIL || action.type===API_CALL_FAIL){
        return {
            ...state,
            isLoading:false,
        }
    }
    if(action.type==LOGIN_USER_FAIL || action.type===SIGNUP_USER_FAIL){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:false,
            user:null,
        }
    }
    if(action.type===LOGOUT_USER){
        return {
            ...state,
            user:null,
            isAuthenticated:false,
            isAdmin:false
        }
    }
    
    if(action.type===LOGIN_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,
            isAdmin:action.payload?.role==="admin",
           

        }
    }
    
    if(action.type===SIGNUP_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,
            isAdmin:action.payload?.role==="admin",
            
        }
    }
    if(action.type===GET_ALL_DATA_SUCCESS){
        return {
            ...state,
            isLoading:false,
           mainData:action.payload,
            
        }
    }
    if(action.type===SET_FILE){
        return {
            ...state,
           file:action.payload
          
            
        }
    }
    if(action.type===UPLOAD_DATA_SUCCESS || action.type===UPLOAD_DATA_FAIL ){
        return {
            ...state,
            file:null,
            isLoading:false,
           message:action.payload    
        }
    }
    if(action.type===EDIT_DATA_SUCCESS || action.type===EDIT_DATA_FAIL ){
        return {
            ...state,
            toggleAction:!state.toggleAction,
            isLoading:false,
             
        }
    }
    if(action.type===  GET_ALL_EDIT_REQUEST_SUCCESS ){
        return {
            ...state,
            editRequestData:action.payload,
            isLoading:false,
             
        }
    }
    if(action.type===APPROVE_EDIT_SUCCESS ||action.type=== REJECT_EDIT_SUCCESS ){
        return {
            ...state,
            editDataStatusChange:!state.editDataStatusChange,
            isLoading:false,
             
        }
    }
    
    
    
    
   
    throw new Error(`no such action : ${action.type}`)
}
export default reducer;
