import React, { useEffect, useState } from "react";
import { Loader } from "../../components";
import { useAppContext } from "../../context/appContext";
import PaginationContainer from "../../components/PaginationContainer";

const Data = () => {
  const {
    editRequestData,
    getAllEditRequest,
    getAllData,
    mainData,
    isLoading,
    editDataStatusChange,
    approveEditRequest,
    rejectEditRequest,
    pageInfo,
  } = useAppContext();

  useEffect(() => {
    getAllData({
      status: "All",
      place: "All",
      yearOfPurchase: "",
      customerName: "",
      editStatus: "All",
    });
    getAllEditRequest();
  }, [editDataStatusChange]);

  const DataToShow = mainData.filter((data) =>
    editRequestData.some((editData) => {
      return (
        String(editData.dataId) === String(data._id) &&
        editData.status === "pending"
      );
    })
  );

  // making all entries of data in DataToShow array for [lastValue,editedValue]
  for (let i = 0; i < DataToShow.length; i++) {
    const data = DataToShow[i];

    for (let j = 0; j < editRequestData.length; j++) {
      const editData = editRequestData[j];

      if (String(data._id) === String(editData.dataId)) {
        for (let key in data) {
          if (
            editData?.dataToUpdate?.hasOwnProperty(key) &&
            data[key] !== editData?.dataToUpdate[key]
          ) {
            if (typeof data[key] !== "object") {
              let lastValue = data[key];
              let editedValue = editData.dataToUpdate[key];
              data[key] = [lastValue, editedValue];
            }
          } else {
            if (typeof data[key] !== "object") {
              let lastValue = data[key];
              data[key] = [lastValue];
            }
          }
        }
      }
    }
  }

  console.log(DataToShow);
  return (
    <>
      <div className="bg-[#f0f4f8] h-screen py-10 px-[3rem] border-t border-l border-gray-300">
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <Loader></Loader>
          </div>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {DataToShow.length > 0 ? (
              <table className="w-full text-sm text-left text-center">
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
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DataToShow.map((obj) => {
                    const yearsCountTillNow =
                      new Date().getFullYear() -
                      parseInt(obj.date[0].split("-")[0]);
                    const yearsCountTillNow2 =
                      obj.date[1] &&
                      new Date().getFullYear() -
                        parseInt(obj.date[1].split("-")[0]);

                    const afterFeesDeduction = Math.round(
                      obj.deposit[0] - (obj.deposit[0] / 99) * yearsCountTillNow
                    );
                    const afterFeesDeduction2 =
                      (obj.deposit[1] || obj.date[1]) &&
                      Math.round(
                        (obj.deposit[1] || obj.deposit[0]) -
                          ((obj.deposit[1] || obj.deposit[0]) / 99) *
                            (yearsCountTillNow2 || yearsCountTillNow)
                      );
                    return (
                      <tr
                        key={obj._id[0]}
                        className="bg-white border-b dark:bg-gray-100 "
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.dri_id.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.dri_id[0]}
                          </p>
                          {obj.dri_id[1] && (
                            <p className="text-blue-600">{obj.dri_id[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.place.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.place[0]}
                          </p>
                          {obj.place[1] && (
                            <p className="text-blue-600">{obj.place[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.appNumber.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.appNumber[0]}
                          </p>
                          {obj.appNumber[1] && (
                            <p className="text-blue-600">{obj.appNumber[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.company.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.company[0] || "-"}
                          </p>
                          {obj.company[1] && (
                            <p className="text-blue-600">{obj.company[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.membership_type.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.membership_type[0]}
                          </p>
                          {obj.membership_type[1] && (
                            <p className="text-blue-600">
                              {obj.membership_type[1]}
                            </p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.date.length > 1 && "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.date[0]}
                          </p>
                          {obj.date[1] && (
                            <p className="text-blue-600">{obj.date[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.amc.length > 1 && "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.amc[0]}
                          </p>
                          {obj.amc[1] && (
                            <p className="text-blue-600">{obj.amc[1]}</p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.customerName.length > 1 &&
                              "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.customerName[0]}
                          </p>
                          {obj.customerName[1] && (
                            <p className="text-blue-600">
                              {obj.customerName[1]}
                            </p>
                          )}
                        </td>{" "}
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <p
                            className={`${
                              obj.GSV.length > 1 && "text-red-500 line-through"
                            }`}
                          >
                            {" "}
                            {obj.GSV[0]}
                          </p>
                          {obj.GSV[1] && (
                            <p className="text-blue-600">{obj.GSV[1]}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p
                            className={`${
                              obj.CSV.length > 1 && "line-through"
                            }`}
                          >
                            {obj.CSV[0]}
                          </p>
                          {obj.CSV[1] && (
                            <p className="text-blue-600">{obj.CSV[1]}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p
                            className={`${
                              obj.deposit.length > 1 && "line-through"
                            }`}
                          >
                            {obj.deposit[0]}
                          </p>
                          {obj.deposit[1] && (
                            <p className="text-blue-600">{obj.deposit[1]}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <p
                            className={`${
                              obj.status.length > 1 && "line-through"
                            }`}
                          >
                            {obj.status[0]}
                          </p>
                          {obj.status[1] && (
                            <p className="text-blue-600">{obj.status[1]}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <p
                            className={`${
                              (obj.GSV.length > 1 || obj.deposit.length > 1) &&
                              "line-through"
                            }`}
                          >
                            {obj.CSV[0] - obj.deposit[0]}
                          </p>
                          {(obj.GSV.length || obj.deposit.length) && (
                            <p className="text-blue-600">
                              {(obj.CSV[1] || obj.CSV[0]) -
                                (obj.deposit[1] || obj.deposit[0])}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <p
                            className={`${
                              obj.date.length > 1 && "line-through"
                            }`}
                          >
                            {yearsCountTillNow}
                          </p>
                          {obj.date[1] && (
                            <p className="text-blue-600">
                              {yearsCountTillNow2}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <p
                            className={`${
                              afterFeesDeduction2 && "line-through"
                            }`}
                          >
                            {afterFeesDeduction}
                          </p>
                          {afterFeesDeduction2 && (
                            <p className="text-blue-600">
                              {afterFeesDeduction2}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p
                            className={`${
                              obj.remarks.length > 1 && "line-through"
                            }`}
                          >
                            {obj.remarks[0]}
                          </p>
                          {obj.remarks[1] && (
                            <p className="text-blue-600">{obj.remarks[1]}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 flex justify-center flex-col relative">
                          <button
                            onClick={() => approveEditRequest(obj._id)}
                            className="block mb-1 font-medium text-green-400 dark:text-green-500 hover:underline"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectEditRequest(obj._id)}
                            className="block font-medium text-red-400 dark:text-red-500 hover:underline"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center  text-[3rem]">
                No changes made
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Data;
