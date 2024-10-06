import React, { Fragment, useEffect, useState } from "react";
import Nav from "../../../components/topbar/Nav";
import Sidebar from "../../../components/sidebar/Sidebar";
import { getExamSchedule } from "../../../redux/examScheduleManagement/ExamScheduleManagement.action";
import { useDispatch, useSelector } from "react-redux";
import { insertSecretaryIntoExamSchedule } from "../../../redux/secretaryRegister/SecretaryRegister.action";

function ExamSecretaryManagement() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [availableSecretaries, setAvailableSecretaries] = useState([]);
  const [selectedSecretary, setSelectedSecretary] = useState(null);

  const dispatch = useDispatch();

  const examScheduleData = useSelector((state) => state.examScheduleData || {});
  const { loading, error, examSchedules } = examScheduleData;

  const insertSecretary = (secretaryId, examScheduleId) => {
    dispatch(insertSecretaryIntoExamSchedule(secretaryId, examScheduleId));
  };

  useEffect(() => {
    dispatch(getExamSchedule());
  }, [dispatch]);

  const handleShowEditModal = (session) => {
    setSelectedSession(session);
    setShowEditModal(true);
  };

  const handleShowListModal = (session) => {
    setSelectedSession(session);
    setShowListModal(true);
  };

  // const handleShowAssignModal = (session) => {
  //   setSelectedSession(session);
  //   setShowAssignModal(true);
  //   fetchAvailableSecretaries();
  // };

  // const fetchAvailableSecretaries = async () => {
  //   const response = await fetch("/api/available-secretaries");
  //   const data = await response.json();
  //   setAvailableSecretaries(data);
  // };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseListModal = () => setShowListModal(false);
  const handleCloseAssignModal = () => setShowAssignModal(false);

  const handleAssignSecretary = async (secretaryId, examScheduleId) => {
    try {
      await insertSecretary(secretaryId, examScheduleId);
      alert("Thư ký đã được phân công thành công!");
      window.location.reload();
      // setShowAssignModal(false);
      // setShowEditModal(false);
    } catch (error) {
      alert("Có lỗi xảy ra khi phân công thư ký.");
    }
  };

  return (
    <Fragment>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Nav />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Quản lý thư ký thi</h1>
              </div>
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
                        <strong>Kỳ thi: {session.sessionName}</strong>
                      </p>
                      <p>
                        <strong>Khóa: {session.sessionTitle}</strong>
                      </p>
                      <p>
                        <strong>Thời gian thi: {session.sessionTime}</strong>
                      </p>

                      <div className="d-flex justify-content-between mt-auto">
                        <a
                          href="#"
                          className="btn btn-danger flex-grow-1 ml-2"
                          onClick={() => handleShowEditModal(session)}
                        >
                          Chỉnh sửa thư ký thi
                        </a>

                        <a
                          href="#"
                          className="btn btn-info flex-grow-1 ml-2"
                          onClick={() => handleShowListModal(session)}
                        >
                          Xem danh sách thư ký thi
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No data available</div>
              )}
            </div>

            {/* Modal Chỉnh sửa thư ký thi */}
            <div
              className={`modal fade ${showEditModal ? "show" : ""}`}
              id="editModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="editModalLabel"
              aria-hidden="true"
              style={{
                display: showEditModal ? "block" : "none",
                width: "90%",
                height: "90%",
                overflow: "auto",
                margin: "auto",
              }}
            >
              <div
                className="modal-dialog modal-lg"
                role="document"
                style={{ maxWidth: "90%", height: "90%" }}
              >
                <div className="modal-content" style={{ height: "100%" }}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">
                      Chỉnh sửa thư ký thi - {selectedSession?.sessionName}
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={handleCloseEditModal}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h6>Thời gian thi: {selectedSession?.sessionTime}</h6>
                    <h6>Khóa: {selectedSession?.sessionTitle}</h6>
                    <h6>Danh sách lịch thi:</h6>

                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên học phần</th>
                          <th>Tên lớp học phần</th>
                          <th>Hình thức thi</th>
                          <th>TG vào Phòng thi</th>
                          <th>Thời gian thi</th>
                          <th>Ngày thi</th>
                          <th>Phòng thi</th>
                          <th>Thư ký thi</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedSession?.examSchedules.map(
                          (schedule, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{schedule.courseName}</td>
                              <td>{schedule.courseClassName}</td>
                              <td>{schedule.examFormat}</td>
                              <td>{schedule.timeToEnterExamRoom}</td>
                              <td>{schedule.examDuration}</td>
                              <td>{schedule.examDate}</td>
                              <td>{schedule.examRoom}</td>
                              <td>{schedule.examSecretary || "Chưa có"}</td>
                              <td>
                                {!schedule.examSecretary && (
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                      handleAssignSecretary(1, schedule.id)
                                    }
                                  >
                                    Thêm thư ký
                                  </button>
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                  {/* Nút sắp xếp nhanh thư ký */}
                  <button
                      className="btn btn-success"
                      // onClick={() =>
                      //   handleQuickAssignSecretaries(
                      //     selectedSession?.secretaryRequests
                      //   )
                      // }
                    >
                      Sắp xếp nhanh thư ký
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseEditModal}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Xem danh sách thư ký thi */}
            <div
              className={`modal fade ${showListModal ? "show" : ""}`}
              id="listModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="listModalLabel"
              aria-hidden="true"
              style={{
                display: showListModal ? "block" : "none",
                width: "90%",
                height: "90%",
                overflow: "auto",
                margin: "auto",
              }}
            >
              <div
                className="modal-dialog modal-lg"
                role="document"
                style={{ maxWidth: "90%", height: "90%" }}
              >
                <div className="modal-content" style={{ height: "100%" }}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="listModalLabel">
                      Danh sách thư ký thi - {selectedSession?.sessionName}
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={handleCloseListModal}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h6>Thời gian thi: {selectedSession?.sessionTime}</h6>
                    <h6>Khóa: {selectedSession?.sessionTitle}</h6>
                    <h6>Danh sách thư ký:</h6>

                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên thư ký</th>
                          <th>Email</th>
                          <th>Ngày đăng ký</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedSession?.secretaryRequests.map(
                          (secretary, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{secretary.secretaryName}</td>
                              <td>{secretary.secretaryEmail}</td>
                              <td>{secretary.registrationDate}</td>
                              <td>
                                {secretary.assigned
                                  ? "Đã phân công"
                                  : "Chưa phân công"}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseListModal}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ExamSecretaryManagement;
