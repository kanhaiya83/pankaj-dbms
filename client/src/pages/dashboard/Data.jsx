import React, { useEffect, useState } from "react";
// import  Pagination  from '../../pages/dashboard/pagination'
import { Loader, SearchContainer } from "../../components";
import { useAppContext } from "../../context/appContext";
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import PaginationContainer from "../../components/PaginationContainer";
dayjs.extend(localizedFormat)
function Items({ currentItems }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              DRI-ID
            </th>
            <th scope="col" className="px-6 py-3">
              PLACE
            </th>
            <th scope="col" className="px-6 py-3">
              APP NO
            </th>
            <th scope="col" className="px-6 py-3">
             COMPANY
            </th>
            <th scope="col" className="px-6 py-3">
             MEMBERSHIP TYPE
            </th>
            <th scope="col" className="px-6 py-3">
              DATE OF PURCHASE
            </th>
            <th scope="col" className="px-6 py-3">
              AMC
            </th>
            <th scope="col" className="px-6 py-3">
              CUSTOMER NAME
            </th>
            <th scope="col" className="px-6 py-3">
              GSV
            </th>
            <th scope="col" className="px-6 py-3">
              CSV
            </th>
            <th scope="col" className="px-6 py-3">
              DEPOSIT
            </th>
            <th scope="col" className="px-6 py-3">
              STATUS
            </th>
            <th scope="col" className="px-6 py-3">
              OUTSTANDING
            </th>
            <th scope="col" className="px-6 py-3">
              YEAR TILL NOW
            </th>
            <th scope="col" className="px-6 py-3">
              AFTER DEDUCTING LICENSE FEE
            </th>
            <th scope="col" className="px-6 py-3">
              REMARKS
            </th>
          

          </tr>
        </thead>
        <tbody>
          {currentItems.map((obj) => {
            const yearsCountTillNow = new Date().getFullYear()-parseInt(obj.date.split("-")[0])
            const afterFeesDeduction = Math.round((obj.deposit-(obj.deposit/99)*yearsCountTillNow))
            return (
              <tr key={obj._id} className="bg-white border-b dark:bg-gray-100 ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                >
                 {obj.dri_id}
                </td>
                
                <td className="px-6 py-4">{obj.place}</td>
                <td className="px-6 py-4 ">{obj.appNumber}</td>
                <td className="px-6 py-4 text-center">{obj.company || "-"}</td>
                <td className="px-6 py-4">{obj.membership_type}</td>
                <td className="px-6 py-4">{dayjs(obj.date,"YYYY-MM-DD").format("LL")}</td>
                <td className="px-6 py-4">{obj.amc}</td>
                <td className="px-6 py-4">{obj.customerName}</td>
                <td className="px-6 py-4">{obj.GSV}</td>
                <td className="px-6 py-4">{obj.CSV}</td>
                <td className="px-6 py-4">{obj.deposit}</td>
                <td className="px-6 py-4">{obj.status}</td>

                <td className="px-6 py-4">{obj.CSV-obj.deposit }</td>
                <td className="px-6 py-4">{yearsCountTillNow}</td>
                <td className="px-6 py-4">{afterFeesDeduction}</td>
                <td className="px-6 py-4">{obj.remarks}</td>

                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const Data = () => {
  const { getAllData, mainData, isLoading,setPage,pageInfo,page } = useAppContext();
  const [form,setForm]=useState({
    status:"All",
    place:"All",
    dri_id:"",
    year:"",
    customerName:"",
    editStatus:"All",
    appNumber:"",
    
  });
  useEffect(() => {
    getAllData(form);
  }, []);

  return (
    <>
      <div className="bg-[#f0f4f8] h-full  py-10 px-[3rem] border-t border-l border-gray-300">
        <div className="sticky top-0 z-10 w-full  bg-[#F0F4F8] shadow ">
        <SearchContainer form={form} setForm={setForm}/>
      <PaginationContainer form={form}/>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <Loader></Loader>
          </div>
        ) : (
          <>
         
            <Items currentItems={ mainData} />
          </>
        )}
        {/* <Pagination {...pageInfo} /> */}
      </div>
    </>
  );
};

export default Data;
