import { api } from "../../config/api";
import {
  GET_EXAMSCHEDULE_FAILURE,
  GET_EXAMSCHEDULE_REQUEST,
  GET_EXAMSCHEDULE_SUCCESS,
  createExamScheduleFailure,
  createExamScheduleRequest,
  createExamScheduleSuccess,
} from "./ExamScheduleManagement.actionType";

export const uploadExcelData = (fileData, sessionData) => async (dispatch) => {
    dispatch(createExamScheduleRequest());
  
    try {
      // Chuyển đổi dữ liệu từ fileData thành mảng ExamSchedule
      const examSchedules = fileData.map((schedule) => ({
        serialNumber: schedule["STT"] || null,
        courseName: schedule["Tên học phần"] || null,
        courseClassName: schedule["Tên lớp học phần"] || null,
        credit: schedule["Tín chỉ"] || null,
        hours: schedule["Số tiết (theo số TC)"] || null,
        weight: schedule["Trọng số (theo Đề cương CT)"] || null,
        examFormat: schedule["Hình thức thi"] || null,
        timeToEnterExamRoom: schedule["TG vào Phòng thi"] || null,
        examDuration: schedule["Thời gian thi"] || null,
        examDate: schedule["Ngày thi"] || null,
        examDurationPerStudent: schedule["Thời gian làm bài"] || null,
        examRoom: schedule["Phòng thi"] || null,
        instructor: schedule["Giảng viên GD"] || null,
        examList: schedule["DSD THI"] || null,
        teachingGroup: schedule["Nhóm CB giảng dạy"] || null,
        courseLeader: schedule["Trưởng nhóm Học phần"] || null,
        specialistGroup:
          schedule["Nhóm CB có chuyên môn coi & chấm thi Vấn đáp"] || null,
        totalClasses: schedule["Tổng số lớp mỗi HP"] || null,
        studentsPerClass: schedule["SL SV/Lớp"] || null,
        studentsExcess: schedule["SV Dư"] || null,
        studentsPerRoom: schedule["SV/Phòng"] || null,
        notes: schedule["Ghi chú"] || null,
        totalStudents: schedule["Tổng SV/HP"] || null,
        proctor1: schedule["Cán Bộ Coi thi 1"] || null,
        proctor2: schedule["Cán Bộ Coi thi 2"] || null,
        allocation: schedule["Phân bổ cho các đơn vị"] || null,
        examSituation: schedule["Tình hình thi"] || null,
        courseCode: schedule["Khóa"] || null,
        additionalNotes: schedule["Lưu ý"] || null,
        examSecretary: schedule["Thư ký thi"] || null,
        roomSupervisor: schedule["CB Giám sát"] || null,
        softwareSupervisor: schedule["CB Trực hệ thống Phần mềm"] || null,
        remarks: schedule["Nhận xét"] || null,
      }));
  
      const examSessionData = {
        ...sessionData, // Thêm dữ liệu nhập từ modal
        examSchedules, // Chèn mảng examSchedules vào đây
      };
  
      console.log(examSessionData);
  
      const response = await api.post("/api/exam-session", examSessionData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      dispatch(createExamScheduleSuccess(response.data));
    } catch (error) {
      console.error(
        "Error uploading Excel data:",
        error.response ? error.response.data : error.message
      );
      dispatch(
        createExamScheduleFailure(
          error.response ? error.response.data : error.message
        )
      );
    }
  };
  

export const getExamSchedule = () => async (dispatch) => {
  dispatch({ type: GET_EXAMSCHEDULE_REQUEST });
  try {
    const { data } = await api.get(`/api/exam-session`);
    console.log("exam-schedule----", data);
    dispatch({ type: GET_EXAMSCHEDULE_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error during fetching exam schedule:", error);
    dispatch({ type: GET_EXAMSCHEDULE_FAILURE, payload: error });
  }
};
