import catchAsyncError from "../middleware/catchAsyncError.js";
import MainData from "../models/MainData.js";
import XLSX from "xlsx";
import fs from "fs";
import UpdateData from "../models/UpdateData.js";
import writeXlsxFile from "write-excel-file/node";

const upload = catchAsyncError(async (req, res) => {
  try {
    const file = req.file;
    if (file.originalname.split(".")[file.originalname.split(".").length - 1]) {
      return uploadText(req, res);
    }
    console.log("Converting to json!", req.file);

    const workbook = XLSX.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log("Success!");

    // Insert the data in batches
    const batchSize = 500;
    let batchData = [];
    let insertedCount = 0;
    let temp = 0;
    if (jsonData) {
      for (const row of jsonData) {
        temp += 1;
        // if (temp > 105) {
        //   break;
        // }
        console.log(temp);
        const date =
          row["Year Of Purchase"] + "-" + row["PP D"] + "-" + row["A"];
        const documentData = {
          dri_id: row["DRI-ID"],
          place: row["Place"],
          appNumber: row["APP No."],
          company: row["Company"],
          membership_type: row["Membership\nType"] || row["Membership Type"],
          amc: row["AMC"],
          customerName: row["CUSTOMER NAME"],
          GSV: row[" GSV "],
          CSV: row[" CSV "],
          deposit: row[" Deposit "],
          status: row["Status"],
          currentValue: row["Current Value "],
          remarks: row["Remarks"],
          date: date.replaceAll("/", ""),
        };

        batchData.push(documentData);

        if (batchData.length === batchSize) {
          console.log("Inserting batch!");

          await MainData.insertMany(batchData);
          insertedCount += batchData.length;
          batchData = [];
        }
      }

      // Insert any remaining documents in the batch
      if (batchData.length > 0) {
        await MainData.insertMany(batchData);
        insertedCount += batchData.length;
      }
    }
    // await MainData.updateMany({}, [
    //   {
    //     $set: {
    //       date: {
    //         $concat: ["$a", "$pp_d", "$year"],
    //       },
    //     },
    //   }
    // ]);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      insertedCount: insertedCount,
    });

    // Update the documents in the collection
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading the file",
    });
  }
});
const uploadText = catchAsyncError(async (req, res) => {
  try {
    const file = req.file;
    let str = fs.readFileSync(file.path);
    str = str.toString("utf8");
    str = str.replaceAll("\x1BH\n", "").replaceAll("\f", "");
    let arr = str.split(
      "------------------------------------------------------------------------------------------"
    );
    arr = arr.map((e) => e.trim());

    arr = arr.filter((e) => {
      return Number.isInteger(parseInt(e.substring(0, 1)));
    });
    arr = arr.map((ele) => ele.replaceAll("\r\n", "\n"));
    arr = arr.map((ele) => ele.replaceAll("\n \n", "\n\n"));
    arr = arr
      .join("\n\n")
      .split("\n\n")
      .map((e) => e.trim());
    arr = arr.filter((e) => {
      return Number.isInteger(parseInt(e.substring(0, 1)));
    });
    const data = [];
    arr.forEach((s, i) => {
      data[i] = { address: "", index: i };

      let lineArr = s.split("\n").map((e) => e.trim());
      let addressArr = [];
      lineArr.forEach((l, lineIndex) => {
        if (lineIndex === 0) {
          const tempArr = l
            .replaceAll("  ", " ")
            .replaceAll("  ", " ")
            .replaceAll("  ", " ")
            .replaceAll("  ", " ")
            .replaceAll("  ", " ")
            .replaceAll("  ", " ")
            .replaceAll("  ", " ")
            .split(" ");
          const dri_id = tempArr[1] + " " + tempArr[2] + " " + tempArr[3];
          data[i].dri_id = dri_id;
          return;
        }
        if (l.includes("PROFESSION")) {
          const temp = l.trim().replace("PROFESSION:", "").trim();
          data[i].profession = temp;
          return;
        }
        if (l.includes("RES :")) {
          const tempArr = l
            .replaceAll(" ", "")
            .replaceAll("RES:", "")
            .split("OFF:");
          data[i].residentialPhone = tempArr[0] || "";
          data[i].officePhone = tempArr[1] || "";

          return;
        }
        addressArr.push(l);
      });
      addressArr.forEach((ele) => {
        const temp = ele.split("                   ");
        if (
          temp.length === 1 &&
          (temp[0].includes("G.S.V") ||
            temp[0].includes("C.S.V") ||
            temp[0].includes("D. AMT") ||
            temp[0].includes("QUATERLY"))
        )
          return;
        if (temp.length === 1) {
          data[i].address += " " + temp[0];
        } else {
          data[i].address += " " + temp[1];
        }
      });
      data[i].address = data[i].address
        .toString()
        .replaceAll("  ", " ")
        .replaceAll("  ", " ")
        .replaceAll("  ", " ")
        .replaceAll("  ", " ")
        .replace(":", "Pin:");
    });
    // console.log(data)
    data.forEach(async (doc, i) => {
      try {
        const update = await MainData.findOneAndUpdate(
          { dri_id: doc.dri_id },
          doc
        );
        console.log("Updated", i);
      } catch (e) {
        console.log("Error occurred for", i);
      }
    });
    res.status(200).json({
      success: true,
      message: "File uploaded successfully! Data will be updated shortly",
    });

    // Update the documents in the collection
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading the file",
    });
  }
});

const getDataList = catchAsyncError(async (req, res, next) => {
  try {
    const {
      status,
      place,
      year,
      customerName,
      editStatus,
      dri_id,
      appNumber,
      amc,
    } = req.query;
    const page = parseInt(req.query.page) || 1; // Get the requested page number
    const limit = parseInt(req.query.limit) || 25; // Get the requested limit per page
    console.log(req.query);
    // Calculate the skip value based on the page number and limit
    const skip = (page - 1) * limit;
    const queryObject = {};
    if (appNumber) {
      queryObject.appNumber = appNumber;
    }
    if (dri_id) {
      queryObject.dri_id = dri_id;
    }
    if (status && status !== "All") {
      queryObject.status = status;
    }
    if (place && place !== "All") {
      queryObject.place = place;
    }
    if (year) {
      queryObject.date = { $regex: year + "-", $options: "i" };
    }
    if (customerName) {
      queryObject.customerName = { $regex: customerName, $options: "i" };
    }
    if (amc) {
      queryObject.amc = amc;
    }

    // Fetch the data from the database using skip and limit
    const result = await MainData.find(queryObject).skip(skip).limit(limit);

    // Get the total count of documents
    const totalCount = await MainData.find(queryObject).countDocuments();
    let pageInfo = {
      page,
      pageLimit: limit,
      totalCount,
    };
    if (editStatus && editStatus !== "All") {
      const editDataRequest = await UpdateData.find();
      result = data.filter((data) =>
        editDataRequest.some((editData) => {
          return (
            String(editData.dataId) === String(data._id) &&
            editData.status === editStatus
          );
        })
      );
    }

    res.status(200).json({
      success: true,
      count: result.length,
      pageInfo,
      result,
    });
  } catch (err) {
    res.status(500).json({
      status: " failed",
      message: "Internal Server Error",
    });
  }
});

const exportFile = catchAsyncError(async (req, res, next) => {
  try {
    const {
      status,
      place,
      year,
      customerName,
      editStatus,
      dri_id,
      appNumber,
      amc,
    } = req.query;
    const queryObject = {};
    if (appNumber) {
      queryObject.appNumber = appNumber;
    }
    if (dri_id) {
      queryObject.dri_id = dri_id;
    }
    if (status && status !== "All") {
      queryObject.status = status;
    }
    if (place && place !== "All") {
      queryObject.place = place;
    }
    if (year) {
      queryObject.date = { $regex: year + "-", $options: "i" };
    }
    if (customerName) {
      queryObject.customerName = { $regex: customerName, $options: "i" };
    }
    if (amc) {
      queryObject.amc = amc;
    }

    // Fetch the data from the database using skip and limit
    const result = await MainData.find(queryObject);
    const fileData = [[
      {fontWeight:"bold", value: "S No." },
      {fontWeight:"bold", value: "DRI-ID" },
      {fontWeight:"bold", value: "Place" },
      {fontWeight:"bold", value: "APP No." },
      {fontWeight:"bold", value: "Company" },
      {fontWeight:"bold", value: "Membership Type" },
      {fontWeight:"bold", value: "A" },
      {fontWeight:"bold", value: "PP D" },
      {fontWeight:"bold", value: "Year of purchase" },
      {fontWeight:"bold", value: "AMC" },
      {fontWeight:"bold", value: "CUSTOMER NAME" },
      {fontWeight:"bold", value: " GSV " },
      {fontWeight:"bold", value: " CSV " },
      {fontWeight:"bold", value: " Deposit " },
      {fontWeight:"bold", value: "Status" },
      {fontWeight:"bold", value: "Outstanding" },
      {fontWeight:"bold", value: "Year Till Now" },
      {fontWeight:"bold", value: "After Deducting License Fees" },
      {fontWeight:"bold", value: "Remarks" },
    ]];
    result.forEach((doc,i)=>{

      const {dri_id,
        place="",
        appNumber="",
        company="",
        membership_type="",
        amc="",
        customerName="",
        GSV="",
        CSV="",
        deposit="",
        status="",
        remarks="",
        date} = doc;
        if(!dri_id)return;
        const dateArr = date.split("-")
        const yearsTillNow =new Date().getFullYear()-dateArr[0]
        const afterDeductingFee = deposit-(deposit/99)*yearsTillNow
        fileData.push([
          { value: i+1},
          { value:dri_id },
          { value:place },
          { value:appNumber },
          { value:company },
          { value:membership_type },
          { value:dateArr[2] },
          { value:dateArr[1] },
          { value:dateArr[0] },
          { value:amc },
          { value:customerName },
          { value:GSV },
          { value:CSV },
          { value:deposit },
          { value:status },
          { value:CSV-deposit },
          { value: yearsTillNow },
          { value: afterDeductingFee},
          { value:remarks },
        ])
    })

    const fileName = "Export" +new Date().getTime() + ".xlsx"
await writeXlsxFile(fileData, {
  filePath: `uploads/${fileName}`,
  fileName: fileName
})
    res.status(200).json({
      success: true,
      fileName
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: " failed",
      message: "Internal Server Error",
    });
  }
});

const getData = catchAsyncError(async (req, res, next) => {
  const { status, place, year, customerName, editStatus, dri_id, appNumber } =
    req.query;
  console.log(req.query);
  const queryObject = {};
  if (appNumber) {
    queryObject.appNumber = appNumber;
  }
  if (dri_id) {
    queryObject.dri_id = dri_id;
  }
  if (status && status !== "All") {
    queryObject.status = status;
  }
  if (place && place !== "All") {
    queryObject.place = place;
  }
  if (year) {
    queryObject.date = { $regex: year + "-", $options: "i" };
  }
  if (customerName) {
    queryObject.customerName = { $regex: customerName, $options: "i" };
  }

  let result = await MainData.find(queryObject);
  // console.log(result);
  if (editStatus && editStatus !== "All") {
    const editDataRequest = await UpdateData.find();
    result = result.filter((data) =>
      editDataRequest.some((editData) => {
        // if(editStatus==='Not Seen'){
        //   console.log(String(data._id)!==String(editData.dataId));
        //   return String(data._id)!==String(editData.dataId)
        // }
        return (
          String(editData.dataId) === String(data._id) &&
          editData.status === editStatus
        );
      })
    );
  }

  res.status(200).json({
    success: true,
    result,
  });
});

// exports.readExcelFile = async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(500).json({
//       message: "Internal Server Error",
//       err: err,
//     });
//   }
// };

export { upload, getData, getDataList, uploadText,exportFile };
