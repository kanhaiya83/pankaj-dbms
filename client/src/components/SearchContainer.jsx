
import { useState, } from 'react';
import { useAppContext } from '../context/appContext';

const statusOptions=['Regular','Outstanding']
const placeOptions=["GOA","All"]

const SearchContainer = () => {

  const [form,setForm]=useState({
    status:"All",
    place:"All",
    dri_id:"",
    year:"",
    customerName:"",
    editStatus:"All",
    appNumber:"",
    
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
     <input
      id='dri_id'
      type='text'
      name='dri_id'
      value={form.dri_id}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
      </div>

      {/* App NUMBER */}
      <div className='flex flex-col mb-4 flex-1'>
     <label htmlFor='status' className='text-lg  mb-2'>APP NUMBER:</label>
     <input
      id='appNumber'
      type='text'
      name='appNumber'
      value={form.appNumber}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
      </div>
         {/* status */}
      <div className='flex flex-col mb-4 flex-1'>
    <label htmlFor='status' className='text-lg  mb-2'>STATUS:</label>
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
    <label htmlFor='place' className='text-lg  mb-2'>PLACE:</label>
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
    <label htmlFor='year' className='text-lg  mb-2'>YEAR OF PURCHASE</label>
    <input
  
      id='year'
      type='text'
      name='year'
      value={form.year}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
    {/* {(form.yearofpurchase!='' && form.yearofpurchase.length!==4) ? <p className="text-sm text-red-500">*year should be length of 4</p>:<p></p>
    } */}
  </div>
  {/* Customer Name */}
  <div className='flex flex-col mb-4 flex-1'>
    <label htmlFor='customerName' className='text-lg mb-2'>CUSTOMER NAME:</label>
    <input
      id='customerName'
      type='text'
      name='customerName'
      value={form.customerName}
      onChange={handleInputChange}
      className='border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
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