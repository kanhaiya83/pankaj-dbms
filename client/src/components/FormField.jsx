

const FormField = ({labelName,type,name,placeholder,value,handleChange}) => {
  return (
    <div>
      <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-100 border-b border-gray-500 focus:outline-none focus:border-gray-700 block w-full pl-0 p-3 text-sm text placeholder-black"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
      />
     
     <div className='relative bg-gray '>

     </div>
    </div>
  )
}

export default FormField