
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Nav from "../../../components/topbar/Nav";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getExamSchedule,
  uploadExcelData,
} from "../../../redux/examScheduleManagement/ExamScheduleManagement.action";

function ExamScheduleManagement() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [campaignQuantity, setCampaignQuantity] = useState("");
  const [campaignDate, setCampaignDate] = useState("");
  const dispatch = useDispatch();

  const [sessionName, setSessionName] = useState("");
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [requiredSecretaries, setRequiredSecretaries] = useState(0);
  const [applicationDeadline, setApplicationDeadline] = useState("");

  const examScheduleData = useSelector((state) => state.examScheduleData || {});
  const { loading, examSchedules } = examScheduleData;

  useEffect(() => {
    dispatch(getExamSchedule());
  }, [dispatch]);
  useEffect(() => {
    console.log(examSchedules);
  }, [examSchedules]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const dataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const columnNames = [
          "STT",
          "Tên học phần",
          "Tên lớp học phần",
          "Tín chỉ",
          "Số tiết (theo số TC)",
          "Trọng số (theo Đề cương CT)",
          "Hình thức thi",
          "TG vào Phòng thi",
          "Thời gian thi",
          "Ngày thi",
          "Thời gian làm bài",
          "Phòng thi",
          "Giảng viên GD",
          "DSD THI",
          "Nhóm CB giảng dạy",
          "Trưởng nhóm Học phần",
          "Nhóm CB có chuyên môn coi & chấm thi Vấn đáp",
          "Tổng số lớp mỗi HP",
          "SL SV/Lớp",
          "SV Dư",
          "SV/Phòng",
          "Ghi chú",
          "Tồng SV/HP",
          "Cán Bộ Coi thi 1",
          "Cán Bộ Coi thi 2",
          "Phân bổ cho các đơn vị",
          "Tình hình thi",
          "Khóa",
          "Lưu ý",
          "Thư ký thi",
          "CB Giám sát",
          "CB trực phòng máy",
          "CB Trực hệ thống Phần mềm",
          "Ghi chú",
        ];

        const headers = dataArray[0];
        dataArray.shift();

        let startCollecting = false;
        const mappedData = [];

        dataArray.forEach((row) => {
          const rowSTT = row[0];
          if (!startCollecting && rowSTT === 1) {
            startCollecting = true;
          }

          if (startCollecting) {
            const isEmptyRow = row.every(
              (cell) => cell === null || cell === undefined || cell === ""
            );
            if (!isEmptyRow) {
              const rowObject = {};
              columnNames.forEach((colName, index) => {
                let cellValue =
                  row[index] !== null && row[index] !== undefined
                    ? row[index]
                    : "";
                if (colName === "Ngày thi" && typeof cellValue === "number") {
                  cellValue = XLSX.SSF.format("dd/mm/yyyy", cellValue);
                }
                rowObject[colName] = cellValue;
              });
              mappedData.push(rowObject);
            }
          }
        });

        setData(mappedData);
        setError("");
      };
      reader.onerror = () => {
        setError("Error reading file");
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Vui lòng chọn một file Excel.");
    }
  };

  const handleStartCampaign = () => {
    setShowCampaignModal(true);
  };

  const handleCampaignChange = (event) => {
    const { name, value } = event.target;
    if (name === "quantity") {
      setCampaignQuantity(value);
    } else if (name === "date") {
      setCampaignDate(value);
    }
  };

  const handleSaveCampaign = () => {
    console.log("Số lượng:", campaignQuantity);
    console.log("Ngày giờ:", campaignDate);
    setShowCampaignModal(false);
  };


  const handleSaveSchedule = () => {
    const sessionData = {
      sessionName,
      sessionTitle,
      sessionTime,
      requiredSecretaries,
      applicationDeadline,
    };
  
    dispatch(uploadExcelData(data, sessionData))
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error saving schedule:", error);
      });
    setShowCreateModal(false);
  };
  

  const renderTable = () => {
    if (data.length === 0) return null;

    const columnNames = Object.keys(data[0]);
    return (
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {columnNames.map((colName, index) => (
              <th
                key={index}
                style={{ border: "1px solid black", padding: "8px" }}
              >
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnNames.map((colName, colIndex) => (
                <td
                  key={colIndex}
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {row[colName]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div id="wrapper">
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Nav />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Quản lý lịch thi</h1>
              <a
                href="#"
                className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                data-toggle="modal"
                data-target="#inputModal"
              >
                <i className="fas fa-download fa-sm text-white-50"></i> Tạo mới
                lịch thi
              </a>
            </div>

            <div className="mt-5">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : Array.isArray(examSchedules) ? (
                examSchedules.map((session, index) => (
                  <div key={index} className="card custom-card mb-3">
                    <div className="card-body d-flex flex-column">
                      <p>
                        <strong>Kỳ thi:{session.sessionName}</strong>
                      </p>
                      <p>
                        <strong>Khóa: {session.sessionTitle}</strong>
                      </p>
                      <p>
                        <strong>
                        Thời gian thi: {session.sessionTime}
                        </strong>
                      </p>
                      <div className="d-flex justify-content-between mt-auto">
                        {/* <a
                          href="#"
                          className="btn btn-success flex-grow-1 mr-2"
                          data-toggle="modal"
                          data-target="#campaignModal"
                        >
                          Bắt đầu tuyển thư ký thi
                        </a>

                        <a href="#" className="btn btn-danger flex-grow-1 ml-2">
                          Kết thúc tuyển thư ký thi
                        </a> */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No data available</div>
              )}
            </div>
          </div>

          <div
            className="modal fade"
            id="inputModal"
            tabIndex="-1"
            aria-labelledby="inputModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" style={{ maxWidth: "90%" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="inputModalLabel">
                    Bảng Nhập Liệu
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Đóng"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="saveButton"
                    onClick={handleSaveSchedule}
                  >
                    Lưu
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="sessionName"
                      placeholder="Nhập tên kỳ thi"
                      value={sessionName}
                      onChange={(e) => setSessionName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="sessionTitle"
                      placeholder="Nhập tiêu đề kỳ thi"
                      value={sessionTitle}
                      onChange={(e) => setSessionTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sessionTime">Ngày thi</label>
                    <input
                      type="date"
                      className="form-control"
                      id="sessionTime"
                      value={sessionTime}
                      onChange={(e) => setSessionTime(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="requiredSecretaries">
                      Số lượng thư ký cần thiết
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="requiredSecretaries"
                      placeholder="Nhập số lượng thư ký"
                      value={requiredSecretaries}
                      onChange={(e) => setRequiredSecretaries(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="applicationDeadline">
                      Hạn chót đăng ký
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="applicationDeadline"
                      value={applicationDeadline}
                      onChange={(e) => setApplicationDeadline(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fileUpload">Tải lên file Excel</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="fileUpload"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <div>{renderTable()}</div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="campaignModal"
            tabIndex="-1"
            aria-labelledby="campaignModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="campaignModalLabel">
                    Tuyển Thư Ký Thi
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Đóng"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="quantity">Số lượng thư ký cần tuyển</label>
                    <input
                      type="text"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={campaignQuantity}
                      onChange={handleCampaignChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Ngày hết hạn đăng ký</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={campaignDate}
                      onChange={handleCampaignChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveCampaign}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamScheduleManagement;
