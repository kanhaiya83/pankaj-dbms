import React, {useCallback,useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { useAppContext } from '../../context/appContext';


const Upload = () => {


    const {file,setFile,UploadData,isLoading}=useAppContext();
  
  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles);
  }, []) 
//   console.log(file);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div className='flex items-center justify-start flex-col bg-[#f0f4f8] w-full h-screen border-t border-l border-gray-300 '>
        {/* dropzone  */}
      <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='bg-gray-50 p-10 px-[6rem] rounded-md border-4 border-dotted mt-[10rem] mb-[2rem]  border-gray-500 cursor-pointer shadow-lg hover:shadow-xl transition duration-400 ease-in-out'>
      {
        isDragActive ?
          <p className='w-full'>Drop the .xlsx ot .txt file here ...</p> :
          <p className='w-full'>Drag 'n' drop file here,<br/> or click to select files</p>
      }
      </div>
     </div>
     {/* btns */}
      <div className='flex mt-10 '>
        <p className='bg-gray-50 flex items-center justify-center font-medium  rounded-md text-sm w-full  px-5 py-2.5'>{file ? file[0]?.name:"Drop the file above"}</p>
        <button 
        disabled={isLoading}
        onClick={()=>UploadData(file[0])}
        className=" text-white bg-green-400 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
        >{isLoading?"Uploading...":"Upload"}</button>
      </div>
      
    </div>
  )
}




export default Upload;
