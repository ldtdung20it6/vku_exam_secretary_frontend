import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../components/topbar/Nav";
import CampaignDetail from "./CampaignDetail";
import Sidebar from "../../components/sidebar/Sidebar";
import { getExamSchedule } from "../../redux/examScheduleManagement/ExamScheduleManagement.action";

function Index() {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );
  const [showCampaignDetail, setShowCampaignDetail] = useState(false);
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const examScheduleData = useSelector((state) => state.examScheduleData || {});
  const { loading, error, examSchedules } = examScheduleData;

  useEffect(() => {
    dispatch(getExamSchedule());
  }, [dispatch]);

  const handleCampaignClick = (schedule) => {
    setShowCampaignDetail(true);
    setSelectedSchedule(schedule);
  };

  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const changeStyle = () => {
    setStyle(
      style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
        : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    );
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
                <h1 className="h3 mb-0 text-gray-800">Trang chủ</h1>
              </div>
            </div>

            <div className="mt-5">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                examSchedules?.map((session, index) => (
                  <div
                    key={index}
                    className={`card custom-card ${
                      showCampaignDetail ? "d-none" : ""
                    }`}
                    onClick={() => handleCampaignClick(session)}
                  >
                    <div className="card-body">
                      <p>
                        <strong>{session.sessionTitle}</strong>
                      </p>
                      <p>
                        <strong>Thời gian thi: {session.sessionTime}</strong>
                      </p>
                      <p>
                        <strong>
                          Hạn chót đăng ký: {session.applicationDeadline}
                        </strong>
                      </p>
                    </div>
                  </div>
                ))
              )}
              {showCampaignDetail && selectedSchedule && (
                <div className="card custom-card">
                  <div className="card-body">
                    <CampaignDetail
                      examSchedules={selectedSchedule.examSchedules}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </Fragment>
  );
}

export default Index;
