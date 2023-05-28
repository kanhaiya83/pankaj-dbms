import React,{useState,useEffect} from 'react'
import loginShow from '../assets/img/loginshow.jpg'
import { FormField ,Loader} from '../components'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const navigate =useNavigate();
    const {signupUser,loginUser,isAuthenticated,isLoading,isAdmin,user}=useAppContext();
    // userForm state
    const [userForm,setUser]=useState({
        name:"",
        email:"executive@gmail.com",
        password:"123executive",
        haveAccount:true
      })
    // id user is authenticated then there is no need of login page
    useEffect(()=>{
        if(isAuthenticated && isAdmin){
          navigate('/');
        }else if(isAuthenticated && user?.role==="executive"){
            navigate('/executive');
        }else if(isAuthenticated && user?.role==="verifier"){
          navigate('/verifier');
        }
    },[isAuthenticated]);
    // onSubmit
    const onSubmit=(e)=>{
        e.preventDefault();
        const { name, email, password, haveAccount } = userForm;
        if (!email || !password || (!haveAccount && !name)) {
          alert("provide all values")
          return;
        }
        if(haveAccount){
          loginUser({
            email:userForm.email,
            password:userForm.password
          });
        }else{
          signupUser({
            name:userForm.name,
            email:userForm.email,
            password:userForm.password
          });
        }
      }
    // handel change
    const handleChange =(e)=>{
        setUser({...userForm,[e.target.name]:e.target.value})
      } 
    //    
     
  //  if(isLoading){
  //   return <Loader/>
  //  }   
  return (
    <div className='bg-gray-100 h-screen w-full flex flex-col sm:flex-row'>
        {/* login section */}
        <div className='lg:w-5/12 w-full sm:w-8/12 p-3'>
            <div className='w-3/12'>
            <img   className=' object-contain' src="https://logos-world.net/wp-content/uploads/2021/02/Simple-Logo.png" alt="" />
            </div>
            <div>
                <h1 className='mx-auto w-full my-[5rem] flex justify-center font-bold text-[2rem]'>Welcome back</h1>

                {/* from */}
                <form onSubmit={onSubmit} className='flex items-center justify-center flex-col h-full '>
                    
                   
                    {/* email feild */}
                    <div className="sm:w-80 xs:w-9/12 mt-6">
                    <FormField
                            labelName="Email"
                            type="text"
                            name="email"
                            placeholder="email"
                            value={userForm.email}
                            handleChange={handleChange}
                    />
                    </div>
                    {/* passwoard feild */}
                    <div className="sm:w-80 xs:w-9/12 mt-6">
                    <FormField
                            labelName="Password"
                            type="text"
                            name="password"
                            placeholder="password"
                            value={userForm.password}
                            handleChange={handleChange}
                    />
                    </div>
                    {/* btn */}
                    <div>
                        <button 
                        type='submit'
                        className=" text-white bg-[#020205] my-4 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
                        > {userForm.haveAccount?"Login":"SignUp"}</button>
                    </div>
                    
                </form>
            </div>
        </div>
        {/* image section */}
        <div className='h-full lg:w-7/12 w-full sm:w-4/12 mt-[6rem] sm:mt-0'>
            <img src={loginShow} alt="loginShow" className='h-full rounded-t-[3.5rem] sm:rounded-tr-[0] sm:rounded-l-[3.5rem]  object-cover '  />
        </div>

     
    </div>
  )
}

export default LoginPage
