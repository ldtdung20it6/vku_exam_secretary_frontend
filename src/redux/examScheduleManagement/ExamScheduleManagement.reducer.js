import { CREATE_EXAMSCHEDULE_FAILURE, CREATE_EXAMSCHEDULE_REQUEST, CREATE_EXAMSCHEDULE_SUCCESS, GET_EXAMSCHEDULE_FAILURE, GET_EXAMSCHEDULE_REQUEST, GET_EXAMSCHEDULE_SUCCESS } from "./ExamScheduleManagement.actionType"

const initialState = {
    examSchedules: [],
    error: null,
    loading: false,
};

export const ExamScheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EXAMSCHEDULE_REQUEST:
        case GET_EXAMSCHEDULE_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_EXAMSCHEDULE_SUCCESS:
            // Cập nhật trạng thái với dữ liệu từ file Excel
            return { ...state, examSchedules: action.payload, loading: false, error: null };

        case GET_EXAMSCHEDULE_SUCCESS:
            // Cập nhật trạng thái với dữ liệu từ API hoặc nguồn khác
            return { ...state, examSchedules: action.payload, loading: false, error: null };

        case CREATE_EXAMSCHEDULE_FAILURE:
        case GET_EXAMSCHEDULE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

