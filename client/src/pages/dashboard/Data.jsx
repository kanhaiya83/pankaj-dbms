import React, { useEffect, useState } from "react";
// import  Pagination  from '../../pages/dashboard/pagination'
import { Loader, SearchContainer } from "../../components";
import { useAppContext } from "../../context/appContext";
import ReactPaginate from "react-paginate";
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
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
  const { getAllData, mainData, isLoading } = useAppContext();

  useEffect(() => {
    getAllData({
      status: "All",
      place: "All",
      yearOfPurchase: "",
      customerName: "",
      editStatus: "All",
    });
  }, []);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 25;
  const currentItems = mainData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(mainData.length / 25);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 25) % mainData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="bg-[#f0f4f8] h-full  py-10 px-[3rem] border-t border-l border-gray-300">
        <SearchContainer />
        {/* <Pagination/> */}
        {/* <p className='mt-10'> {!mainData?.length>0?"Data not found":`${mainData?.length} results found`} </p> */}

        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <Loader></Loader>
          </div>
        ) : (
          <>
          <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName={
                "pagination"
              } /* as this work same as bootstrap class */
              subContainerClassName={
                "pages pagination"
              } /* as this work same as bootstrap class */
              activeClassName={"active"}
            />
            <Items currentItems={currentItems} />
          </>
        )}
        {/* <Pagination {...pageInfo} /> */}
      </div>
    </>
  );
};

export default Data;
