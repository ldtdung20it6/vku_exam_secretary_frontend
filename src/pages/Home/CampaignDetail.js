
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function CampaignDetail({ examSchedules = [] }) {
    // Khai báo tiêu đề cột
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

    // Chuyển đổi dữ liệu từ examSchedules thành định dạng phù hợp
    const transformedData = examSchedules.map((exam, index) => ({
        "STT": exam.serialNumber || "",
        "Tên học phần": exam.courseName || "",
        "Tên lớp học phần": exam.courseClassName || "",
        "Tín chỉ": exam.credit || "",
        "Số tiết (theo số TC)": exam.hours || "",
        "Trọng số (theo Đề cương CT)": exam.weight || "",
        "Hình thức thi": exam.examFormat || "",
        "TG vào Phòng thi": exam.timeToEnterExamRoom || "",
        "Thời gian thi": exam.examDuration || "",
        "Ngày thi": exam.examDate || "",
        "Thời gian làm bài": exam.examDurationPerStudent || "",
        "Phòng thi": exam.examRoom || "",
        "Giảng viên GD": exam.instructor || "",
        "DSD THI": exam.examList || "",
        "Nhóm CB giảng dạy": exam.teachingGroup || "",
        "Trưởng nhóm Học phần": exam.courseLeader || "",
        "Nhóm CB có chuyên môn coi & chấm thi Vấn đáp": exam.specialistGroup || "",
        "Tổng số lớp mỗi HP": exam.totalClasses || "",
        "SL SV/Lớp": exam.studentsPerClass || "",
        "SV Dư": exam.studentsExcess || "",
        "SV/Phòng": exam.studentsPerRoom || "",
        "Ghi chú": exam.notes || "",
        "Tồng SV/HP": exam.totalStudents || "",
        "Cán Bộ Coi thi 1": exam.proctor1 || "",
        "Cán Bộ Coi thi 2": exam.proctor2 || "",
        "Phân bổ cho các đơn vị": exam.allocation || "",
        "Tình hình thi": exam.examSituation || "",
        "Khóa": exam.courseCode || "",
        "Lưu ý": exam.additionalNotes || "",
        "Thư ký thi": exam.examSecretary || "",
        "CB Giám sát": exam.roomSupervisor || "",
        "CB trực phòng máy": exam.softwareSupervisor || "",
        "CB Trực hệ thống Phần mềm": exam.remarks || "",
        "Ghi chú": exam.remarks || "", // Đây có vẻ là "remarks", nếu bạn có trường nào khác cho "Ghi chú" thì thay đổi tại đây
    }));

    const handleExport = () => {
        // Chuyển đổi dữ liệu thành bảng tính
        const ws = XLSX.utils.json_to_sheet(transformedData, { header: columnNames });
        
        // Tạo workbook và thêm worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Tạo file Excel và lưu nó
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'exam_schedules.xlsx');
    };

    if (examSchedules.length === 0) return <p>No data available</p>;

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Thông tin chi tiết</h1>
                <button 
                    onClick={handleExport} 
                    className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                >
                    <i className="fas fa-download fa-sm text-white-50"></i> Tạo báo cáo
                </button>
            </div>
            <div className="text-center">
                <h4>LỊCH THI & DANH SÁCH CÁN BỘ COI THI KẾT THÚC HỌC PHẦN HỌC KÌ II - NĂM HỌC: 2023 - 2024 (CHÍNH THỨC)</h4>
                <h4>KHÓA 23 TRÌNH ĐỘ ĐẠI HỌC (GỘP CẢ LỊCH THI ĐÃ PHÂN CÔNG CB COI THI KHÓA 20,21,22 TỪ NGÀY 10/06/2024)</h4>
                <h5>Thời gian thi từ 10/06/2024 đến 30/06/2024</h5>
            </div>
            <div>
                <table className="table table-bordered table-hover">
                    <thead className="thead-light">
                        <tr>
                            {columnNames.map((col, index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {examSchedules.length > 0 ? (
                            transformedData.map((exam, index) => (
                                <tr key={index}>
                                    <td>{exam["STT"]}</td>
                                    <td>{exam["Tên học phần"]}</td>
                                    <td>{exam["Tên lớp học phần"]}</td>
                                    <td>{exam["Tín chỉ"]}</td>
                                    <td>{exam["Số tiết (theo số TC)"]}</td>
                                    <td>{exam["Trọng số (theo Đề cương CT)"]}</td>
                                    <td>{exam["Hình thức thi"]}</td>
                                    <td>{exam["TG vào Phòng thi"]}</td>
                                    <td>{exam["Thời gian thi"]}</td>
                                    <td>{exam["Ngày thi"]}</td>
                                    <td>{exam["Thời gian làm bài"]}</td>
                                    <td>{exam["Phòng thi"]}</td>
                                    <td>{exam["Giảng viên GD"]}</td>
                                    <td>{exam["DSD THI"]}</td>
                                    <td>{exam["Nhóm CB giảng dạy"]}</td>
                                    <td>{exam["Trưởng nhóm Học phần"]}</td>
                                    <td>{exam["Nhóm CB có chuyên môn coi & chấm thi Vấn đáp"]}</td>
                                    <td>{exam["Tổng số lớp mỗi HP"]}</td>
                                    <td>{exam["SL SV/Lớp"]}</td>
                                    <td>{exam["SV Dư"]}</td>
                                    <td>{exam["SV/Phòng"]}</td>
                                    <td>{exam["Ghi chú"]}</td>
                                    <td>{exam["Tồng SV/HP"]}</td>
                                    <td>{exam["Cán Bộ Coi thi 1"]}</td>
                                    <td>{exam["Cán Bộ Coi thi 2"]}</td>
                                    <td>{exam["Phân bổ cho các đơn vị"]}</td>
                                    <td>{exam["Tình hình thi"]}</td>
                                    <td>{exam["Khóa"]}</td>
                                    <td>{exam["Lưu ý"]}</td>
                                    <td>{exam["Thư ký thi"]}</td>
                                    <td>{exam["CB Giám sát"]}</td>
                                    <td>{exam["CB trực phòng máy"]}</td>
                                    <td>{exam["CB Trực hệ thống Phần mềm"]}</td>
                                    <td>{exam["Ghi chú"]}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columnNames.length}>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CampaignDetail;
