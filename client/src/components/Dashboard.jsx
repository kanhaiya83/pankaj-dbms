import React,{useEffect} from 'react'
import {Outlet,NavLink} from  'react-router-dom'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
 
const Dashboard = ({links,hideSideBar}) => {
  const navigate=useNavigate();
  const {isAuthenticated,logoutUser,user}=useAppContext();
  
  
  useEffect(()=>{
    if(!isAuthenticated || !user){
      navigate('/auth')
    }

  },[isAuthenticated,user])
  return (
    <div className='flex '>
      {/* side bar */}
     {!hideSideBar && (<div className='w-2/12 py-0'>
        <div className=' flex px-3'>
        <div className='w-10/12'>
          <img   className=' object-contain' src="https://logos-world.net/wp-content/uploads/2021/02/Simple-Logo.png" alt="" />
        </div>
        </div>
        <ul className='mt-8 flex flex-col w-full justify-center px-[2rem] text-[1.1rem]'>
         {links.map((obj)=>{
          return <li key={obj.text} className='mt-4  border-b p-2'> <NavLink end={obj.to==="/"} className={({isActive})=>isActive?" text-[#fd79a8] transform translate-x-20":""} to={obj.to}>{obj.text} </NavLink>  </li>
         })}
        </ul>
      </div>)
      }
      {/* main view */}
      <div className={hideSideBar?"w-full":"w-10/12"}>
        {/* nav */}
        <div className='h-[5.5rem] flex justify-evenly py-4 items-center'>
          {hideSideBar &&  <div className='w-[8rem]'> <img   className=' object-contain' src="https://logos-world.net/wp-content/uploads/2021/02/Simple-Logo.png" alt="" /></div>}
          <p className='flex items-center text-xl capitalize'>
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
            </span>
             {user?.name}</p>
          <h1 className='text-[2rem]'>Dashboard</h1>
          <button onClick={logoutUser} className=" text-white bg-[#020205] font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center">Logout</button>
        </div>
        {/* view */}
        <div className='h-calc(100vh - 5.5rem)'>
        <Outlet />
        </div>
      </div>
    </div>
  )
}
 
export default Dashboard;
