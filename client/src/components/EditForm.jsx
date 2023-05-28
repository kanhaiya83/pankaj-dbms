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
    <div className="absolute bg-[#dff9fb] z-10  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-blue-500 rounded-md border-t-4">
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
        <div className="flex justify-evenly flex-wrap gap-3">
          {/* Customer Name */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="customerName" className="text-lg mb-2">
              Customer Name:
            </label>
            <input
              id="customerName"
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* appNumber */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="appNumber" className="text-lg mb-2">
              App Number:
            </label>
            <input
              id="appNumber"
              type="text"
              name="appNumber"
              value={form.appNumber}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* company */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="company" className="text-lg mb-2">
              Company:
            </label>
            <input
              id="company"
              type="text"
              name="company"
              value={form.company}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* membership_type */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="membership_type" className="text-lg mb-2">
              Membership Type:
            </label>
            <input
              id="membership_type"
              type="text"
              name="membership_type"
              value={form.membership_type}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* date */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="date" className="text-lg mb-2">
              Date of Purchase:
            </label>
            <input
              id="date"
              type="text"
              name="date"
              value={form.date}
              onChange={handleDateChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* amc */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="amc" className="text-lg mb-2">
              AMC:
            </label>
            <input
              id="amc"
              type="text"
              name="amc"
              value={form.amc}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* GSV */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="GSV" className="text-lg mb-2">
              GSV:
            </label>
            <input
              id="GSV"
              type="text"
              name="GSV"
              value={form.GSV}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* CSV */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="CSV" className="text-lg mb-2">
              CSV:
            </label>
            <input
              id="CSV"
              type="text"
              name="CSV"
              value={form.CSV}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* appNumber */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="appNumber" className="text-lg mb-2">
              App Number:
            </label>
            <input
              id="appNumber"
              type="text"
              name="appNumber"
              value={form.appNumber}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* deposit */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="deposit" className="text-lg mb-2">
              Deposit:
            </label>
            <input
              id="deposit"
              type="text"
              name="deposit"
              value={form.deposit}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* place */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="place" className="text-lg  mb-2">
              Place:
            </label>
            <select
              id="place"
              name="place"
              value={form.place}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="status" className="text-lg  mb-2">
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
