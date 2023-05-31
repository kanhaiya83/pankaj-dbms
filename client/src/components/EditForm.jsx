import { useState } from "react";
import { useAppContext } from "../context/appContext";

const statusOptions = ["Regular", "Outstanding"];
const placeOptions = ["All", "GOA"];

function EditForm({ setShow, dataId }) {
  const { mainData, editData } = useAppContext();
  const data = mainData.find((obj) => obj._id === dataId);
  const [changed,setChanged] = useState(false)
  const [form, setFormData] = useState({
    place: data.place || "",
    appNumber: data.appNumber || "",
    company: data.company || "",
    membership_type: data.membership_type || "",
    date: data.date || "",
    amc: data.amc || "",
    customerName: data.customerName || "",
    GSV: data.GSV || "",
    CSV: data.CSV || "",
    deposit: data.deposit || "",
    status: data.status || "",
    dri_id: data.dri_id || "",
    remarks: data.remarks || "",
    address: data.address || "",
    residentialPhone: data.residentialPhone || "",
    officePhone: data.officePhone || "",
    profession: data.profession || "",
  });

  const handleInputChange = (e) => {
    if(!changed) setChanged(true)
    if (e.target.name === "customerName") {
      e.target.value = e.target.value.toUpperCase();
    }
    setFormData({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleDateChange = (e) => {

    if(!changed) setChanged(true)
    setFormData({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    form.yearOfPurchase = Number(form.yearOfPurchase);
    const changedData = {};

    for (let key in data) {
      if (form.hasOwnProperty(key) && data[key] !== form[key]) {
        changedData[key] = form[key];
      }
    }

    editData(dataId, changedData);
    console.log(changedData);
  };

  return (
    <div className="fixed bg-[#dff9fb] z-20  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-blue-500 rounded-md border-t-4 w-full max-w-[1200px] h-[90vh] overflow-scroll">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 w-full mx-auto rounded p-7  shadow-md hover:shadow-lg transition duration-400 ease-in-out"
      >
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[2rem] mb">Edit Data </h1>
          <button onClick={() => setShow(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {/* Customer Name */}
          <div className="flex flex-col mb-4">
            <label htmlFor="customerName" className="text-xs mb-1">
              Customer Name:
            </label>
            <input
              id="customerName"
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* driid */}
          <div className="flex flex-col mb-4">
            <label htmlFor="dri_id" className="text-xs mb-1">
              DRI ID:
            </label>
            <input
              id="dri_id"
              type="text"
              name="dri_id"
              value={form.dri_id}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* appNumber */}
          <div className="flex flex-col mb-4">
            <label htmlFor="appNumber" className="text-xs mb-1">
              App Number:
            </label>
            <input
              id="appNumber"
              type="text"
              name="appNumber"
              value={form.appNumber}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* company */}
          <div className="flex flex-col mb-4">
            <label htmlFor="company" className="text-xs mb-1">
              Company:
            </label>
            <input
              id="company"
              type="text"
              name="company"
              value={form.company}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>{/* residentialPhone */}
          <div className="flex flex-col mb-4">
            <label htmlFor="residentialPhone" className="text-xs mb-1">
              Residential Phone:
            </label>
            <input
              id="residentialPhone"
              type="text"
              name="residentialPhone"
              value={form.residentialPhone}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>{/* officePhone */}
          <div className="flex flex-col mb-4">
            <label htmlFor="officePhone" className="text-xs mb-1">
              Office Phone:
            </label>
            <input
              id="officePhone"
              type="text"
              name="officePhone"
              value={form.officePhone}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>{/* profession */}
          <div className="flex flex-col mb-4">
            <label htmlFor="profession" className="text-xs mb-1">
              Profession:
            </label>
            <input
              id="profession"
              type="text"
              name="profession"
              value={form.profession}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* membership_type */}
          <div className="flex flex-col mb-4">
            <label htmlFor="membership_type" className="text-xs mb-1">
              Membership Type:
            </label>
            <input
              id="membership_type"
              type="text"
              name="membership_type"
              value={form.membership_type}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* date */}
          <div className="flex flex-col mb-4">
            <label htmlFor="date" className="text-xs mb-1">
              Date of Purchase:
            </label>
            <input
              id="date"
              type="text"
              name="date"
              value={form.date}
              onChange={handleDateChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* amc */}
          <div className="flex flex-col mb-4">
            <label htmlFor="amc" className="text-xs mb-1">
              AMC:
            </label>
            <input
              id="amc"
              type="text"
              name="amc"
              value={form.amc}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* GSV */}
          <div className="flex flex-col mb-4">
            <label htmlFor="GSV" className="text-xs mb-1">
              GSV:
            </label>
            <input
              id="GSV"
              type="text"
              name="GSV"
              value={form.GSV}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* CSV */}
          <div className="flex flex-col mb-4">
            <label htmlFor="CSV" className="text-xs mb-1">
              CSV:
            </label>
            <input
              id="CSV"
              type="text"
              name="CSV"
              value={form.CSV}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* appNumber */}
          <div className="flex flex-col mb-4">
            <label htmlFor="appNumber" className="text-xs mb-1">
              App Number:
            </label>
            <input
              id="appNumber"
              type="text"
              name="appNumber"
              value={form.appNumber}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* deposit */}
          <div className="flex flex-col mb-4">
            <label htmlFor="deposit" className="text-xs mb-1">
              Deposit:
            </label>
            <input
              id="deposit"
              type="text"
              name="deposit"
              value={form.deposit}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* place */}
          <div className="flex flex-col mb-4">
            <label htmlFor="place" className="text-xs mb-1">
              Place:
            </label>
            <select
              id="place"
              name="place"
              value={form.place}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...placeOptions].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          {/* status */}
          <div className="flex flex-col mb-4">
            <label htmlFor="status" className="text-xs mb-1">
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...statusOptions].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
               {/* address */}
               <div className="flex flex-col mb-4">
            <label htmlFor="address" className="text-xs mb-1">
              Address:
            </label>
            <textarea
              id="address"
              type="text"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* remarks */}
          <div className="flex flex-col mb-4 ">
            <label htmlFor="remarks" className="text-xs mb-1">
              Remarks:
            </label>
            <textarea
              id="remarks"
              type="text"
              name="remarks"
              value={form.remarks}
              onChange={handleInputChange}
              className="border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!changed}
          className={`w-3/12 mt-4 mx-auto  text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 ${changed ? "bg-blue-500 hover:bg-blue-700": "opacity-50 bg-gray-800"}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditForm;
