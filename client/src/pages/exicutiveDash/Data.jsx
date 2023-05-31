import React, { useEffect, useState } from "react";
import { Loader, EditForm, SearchContainer } from "../../components";
import { useAppContext } from "../../context/appContext";
import { ExeSearchContainer } from "../../components";
import PaginationContainer from "../../components/PaginationContainer";

const Data = () => {
  const {
    getAllEditRequest,
    toggleAction,
    mainData,
    isLoading,
    editRequestData,
    getAllData,
  } = useAppContext();
  const [form, setForm] = useState({
    status: "All",
    place: "All",
    dri_id: "",
    year: "",
    customerName: "",
    editStatus: "All",
    appNumber: "",
  });
  useEffect(() => {
    getAllData({
      status: "All",
      place: "All",
      yearOfPurchase: "",
      customerName: "",
      editStatus: "All",
    });
    getAllEditRequest();
  }, []);
  useEffect(() => {
    getAllEditRequest();
  }, [toggleAction]);

  const [show, setShow] = useState(false);
  const [dataId, setDataId] = useState(null);

  const showForm = (id) => {
    setShow(true);
    setDataId(id);
  };

  const DataToShow = JSON.parse(JSON.stringify(mainData));

  for (let i = 0; i < DataToShow.length; i++) {
    const data = DataToShow[i];

    const editData = editRequestData.find((ed) => ed.dataId === data._id);
    console.log(editData);
    data.editStatus = editData?.status;

    for (let key in data) {
      let lastValue = data[key];
      data[key] = [lastValue];

      if (editData) {
        if (
          editData.dataToUpdate?.hasOwnProperty(key) &&
          data[key].length <= 2 &&
          editData.status !== "approved"
        ) {
          data[key].push(editData.dataToUpdate[key]);
        }
      }
    }
  }

  const color = (cl) => {
    if (cl == "pending") return "text-yellow-500";
    else if (cl == "rejected") return "text-red-500";
    else return "text-green-500";
  };

  console.log(DataToShow);
  return (
    <>
      {show && <EditForm setShow={setShow} dataId={dataId} />}
      <div className="bg-[#f0f4f8]  py-10 px-[3rem] border-t border-l border-gray-300">
        <div className="sticky top-0 z-10 w-full  bg-[#F0F4F8] shadow ">
          <SearchContainer form={form} setForm={setForm} />
          <PaginationContainer form={form} />
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <Loader></Loader>
          </div>
        ) : (
          <>
            <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-center">
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
                    <th scope="col" className="px-6 py-3">
                      Action status
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
                        key={obj._id}
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
                          {(obj.GSV.length>1 || obj.deposit.length>1) && (
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
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => showForm(obj._id[0])}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                        </td>
                        <td className="px-6 py-4 ">
                          {obj.editStatus[0] ? (
                            <p className={color(obj.editStatus[0])}>
                              {obj.editStatus[0]}
                            </p>
                          ) : (
                            <p>No changes</p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Data;
