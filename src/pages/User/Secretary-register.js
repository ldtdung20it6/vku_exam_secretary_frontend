import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Table } from "react-bootstrap";
import { getExamSchedule } from "../../redux/examScheduleManagement/ExamScheduleManagement.action";
import {
  insertSecretaryIntoExamSchedule,
  registerSecretary,
} from "../../redux/secretaryRegister/SecretaryRegister.action";
import { getProfileAction } from "../../redux/auth/Auth.action";
import "bootstrap/dist/css/bootstrap.min.css";

const SecretaryRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [showYesNoModal, setShowYesNoModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();

  const examScheduleData = useSelector((state) => state.examScheduleData || {});
  const { loading, error, examSchedules } = examScheduleData;

  useEffect(() => {
    dispatch(getExamSchedule());
  }, [dispatch]);

  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction(jwt));
    }
  }, [jwt, dispatch]);

  const name = auth.user?.firstName + auth.user?.lastName;
  const email = auth.user?.email;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowYesNoModal = (session) => {
    setSelectedSession(session);
    setShowYesNoModal(true);
  };

  const handleCloseYesNoModal = () => setShowYesNoModal(false);

  const insertSecretary = (secretaryId, examScheduleId) => {
    dispatch(insertSecretaryIntoExamSchedule(secretaryId, examScheduleId));
  };

  const handleYesClick = () => {
    if (selectedSession) {
      const secretaryRequest = {
        secretaryName: name,
        secretaryEmail: email,
        examSession: { id: selectedSession.id },
        registrationDate: new Date().toISOString(),
        assigned: false,
      };

      dispatch(registerSecretary(selectedSession.id, secretaryRequest));
      setShowYesNoModal(false);
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 5000);
    }
  };
  const handleAssignSecretary = async (secretaryId, examScheduleId) => {
    try {
      await insertSecretary(secretaryId, examScheduleId);
      window.location.reload();
      alert("Thư ký đã được phân công thành công!");
    } catch (error) {
      console.error("Error assigning secretary:", error); // Log lỗi ra console để dễ dàng debug
      alert("Có lỗi xảy ra khi phân công thư ký.");
    }
  };

  return (
    <Fragment>
      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="alert alert-success" role="alert">
          Đăng ký thư ký thi thành công!
        </div>
      )}

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
                  <Button
                    variant="success"
                    className="flex-grow-1 mr-2"
                    onClick={() => {
                      setSelectedSession(session);
                      handleShowModal();
                    }}
                  >
                    Đăng ký tùy chọn
                  </Button>
                  <Button
                    variant="danger"
                    className="flex-grow-1 ml-2"
                    onClick={() => handleShowYesNoModal(session)}
                  >
                    Đăng ký nhanh
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </div>

      {/* Modal Đăng ký tùy chọn */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký tùy chọn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
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
              {selectedSession &&
                selectedSession.examSchedules &&
                selectedSession.examSchedules.map((schedule, index) => (
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
                      {schedule.examSecretary ? (
                        <Button variant="warning" disabled>
                          Đã có thư ký
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => {
                            dispatch(handleAssignSecretary(1, schedule.id));
                          }}
                        >
                          Đăng ký thư ký
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary">Sắp xếp nhanh thư ký vào lịch thi</Button>
          <Button variant="primary">Xác nhận</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Yes/No */}
      <Modal show={showYesNoModal} onHide={handleCloseYesNoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn chắc chắn muốn đăng ký nhanh cho kỳ thi này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseYesNoModal}>
            Không
          </Button>
          <Button variant="primary" onClick={handleYesClick}>
            Có
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default SecretaryRegister;
