import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportStudentsToExcel = (students) => {

  if (!students || students.length === 0) {
    alert("No data to export");
    return;
  }

  // Convert students data to sheet
  const worksheet = XLSX.utils.json_to_sheet(students);

  // Create workbook
  const workbook = {
    Sheets: { Students: worksheet },
    SheetNames: ["Students"]
  };

  // Generate excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const fileData = new Blob([excelBuffer], {
    type: "application/octet-stream"
  });

  saveAs(fileData, "students.xlsx");
};