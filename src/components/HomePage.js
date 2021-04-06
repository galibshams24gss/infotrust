import React, { useState } from "react";
import * as XLSX from "xlsx";
import { excelColumns } from "../utils/constants";
import { trimJsonObjectKeys } from "../utils/helpers";

function HomePage() {
  const [clauses, setClauses] = useState([]);
  const [excelArrayData, setExcelArrayData] = useState([]);
  const [completeExcelData, setCompleteExcelData] = useState([]);
  const [clauseOption, setClauseOption] = useState("");
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const sheets = wb.SheetNames;
        const excelDataArray = [];
        const clausesDataArray = [];
        sheets.forEach((sheet, index) => {
          const sheetDataArray = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);

          if (typeof sheetDataArray === "object") {
            let clauseName = "";
            sheetDataArray.forEach((rowData, index1) => {
              //trim all the columns in row
              let newJsonObject = {};
              const obj = trimJsonObjectKeys(rowData);
              if (!obj[excelColumns[0]] || obj[excelColumns[0]] === "") {
                obj[excelColumns[0]] = clauseName;
              } else {
                clauseName = obj[excelColumns[0]];
              }

              excelColumns.forEach((colName, index2) => {
                //store clauses in another array
                if (index2 === 0 && obj[colName]) {
                  const exists = clausesDataArray.find(
                    (cl) => cl === obj[colName]
                  );
                  if (!exists) {
                    clausesDataArray.push(obj[colName]);
                  }
                }
                newJsonObject[colName] = obj[colName] ? obj[colName] : "";
              });
              if (JSON.stringify(newJsonObject) !== "{}") {
                excelDataArray.push(newJsonObject);
              }
            });
          }
        });
        setClauses(clausesDataArray);
        setExcelArrayData(excelDataArray);
        setCompleteExcelData(excelDataArray);
        resolve(excelDataArray);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise
      .then((finalArrayData) => {
        //nothing to do
      })
      .catch((e) => {
        //handle any error here
      });
  };

  const filterExcelDataByClause = (clause) => {
    const filteredData = completeExcelData.filter(
      (data, index) => data && data[excelColumns[0]] === clause
    );
    setExcelArrayData(filteredData);
  };

  //clauseChangeHandler
  const clauseChangeHandler = (e) => {
    const { value } = e.target;
    setClauseOption(value);
    if (value === "") {
      setExcelArrayData(completeExcelData);
    } else {
      filterExcelDataByClause(value);
    }
  };

  const renderColumns = () => {
    return excelColumns.map((c, index) => {
      return <th key={`column-${index}`}>{c}</th>;
    });
  };

  const renderTableRowData = (rd, parentIndex) => {
    return excelColumns.map((c, index) => (
      <td key={`rowData-${parentIndex}${index}`}>{rd[c] ? rd[c] : ""}</td>
    ));
  };

  return (
    <div>
      <select
        className="form-control"
        value={clauseOption}
        onChange={(e) => clauseChangeHandler(e)}
      >
        <option value="">select option</option>

        {clauses.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table className="table container">
        <thead>
          <tr>{renderColumns()}</tr>
        </thead>
        <tbody>
          {excelArrayData.map((d, index) => {
            return <tr key={index}>{renderTableRowData(d, index)}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
