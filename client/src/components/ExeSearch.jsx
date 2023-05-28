
import { useState, } from 'react';
import { useAppContext } from '../context/appContext';

const statusOptions=['Regular','Outstanding']
const placeOptions=["Ajmer","Delhi"]
const actionOptions=["pending","approved","rejected"]

const SearchContainer = () => {

  const [form,setForm]=useState({
    status:"All",
    place:"All",
    yearOfPurchase:"",
    customerName:"",
    editStatus:"All"
  });
  
  const {getAllData}=useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
    getAllData(form); 
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <div >
      <form onSubmit={handleSubmit} className='bg-gray-50 w-full mx-auto rounded p-7  shadow-md hover:shadow-lg transition duration-400 ease-in-out'>
 
  <h1 className='text-[2rem] mb-5'>Search form </h1>
      <div className='flex justify-evenly flex-wrap gap-3'>
        {/* DRI_ID */}
        <div className='flex flex-col mb-4 flex-1'>
     <label htmlFor='status' className='text-lg  mb-2'>DRI-ID:</label>
     <select
      id='status'
      name='status'
      value={form.status}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    >
      {
        ['All',...statusOptions].map((data)=>{
          return <option key={data} value={data}>{data}</option>
        })
      }
    </select>
      </div>
        
         {/* status */}
      <div className='flex flex-col mb-4 flex-1'>
    <label htmlFor='status' className='text-lg  mb-2'>Status:</label>
    <select
      id='status'
      name='status'
      value={form.status}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    >
      {
        ['All',...statusOptions].map((data)=>{
          return <option key={data} value={data}>{data}</option>
        })
      }
    </select>
      </div>
  {/* place */}
  <div className='flex flex-col mb-4 flex-1'>
    <label htmlFor='place' className='text-lg  mb-2'>Place:</label>
    <select
      id='place'
      name='place'
      value={form.place}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    >
      {
        ['All',...placeOptions].map((data)=>{
          return <option key={data} value={data}>{data}</option>
        })
      }
    </select>
  </div>
  {/* Year of Purchase */}
  <div className='flex flex-col mb-4 flex-1'>
    <label htmlFor='yearOfPurchase' className='text-lg  mb-2'>Year of Purchase</label>
    <input
  
      id='yearOfPurchase'
      type='number'
      name='yearOfPurchase' 
      value={form.yearOfPurchase}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
    {(form.yearOfPurchase!='' && form.yearOfPurchase.length!==4) ? <p className="text-sm text-red-500">*year should be length of 4</p>:<p></p>
    }
  </div>
  {/* Customer Name */}
  <div className='flex flex-col mb-4 flex-1'>
    <label htmlFor='customerName' className='text-lg mb-2'>Customer Name:</label>
    <input
      id='customerName'
      type='text'
      name='customerName'
      value={form.customerName}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
  </div>

  <div className='flex flex-col mb-4 flex-1'>
    <label htmlFor='place' className='text-lg  mb-2'>Action:</label>
    <select
      id='editStatus'
      name='editStatus'
      value={form.editStatus}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    >
      {
        ['All',...actionOptions].map((data)=>{
          return <option key={data} value={data}>{data}</option>
        })
      }
    </select>
  </div>

      </div>
      
  
  <button
    type='submit'
    className='w-3/12 mt-6 mx-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 '
  >
    Apply filters
  </button>
  
</form>

  
    </div>
  )
  }; 

export default SearchContainer;