export const CREATE_EXAMSCHEDULE_REQUEST = "CREATE_EXAMSCHEDULE_REQUEST";
export const CREATE_EXAMSCHEDULE_SUCCESS = "CREATE_EXAMSCHEDULE_SUCCESS";
export const CREATE_EXAMSCHEDULE_FAILURE = "CREATE_EXAMSCHEDULE_FAILURE";

export const GET_EXAMSCHEDULE_REQUEST = "GET_EXAMSCHEDULE_REQUEST";
export const GET_EXAMSCHEDULE_SUCCESS = "GET_EXAMSCHEDULE_SUCCESS";
export const GET_EXAMSCHEDULE_FAILURE = "GET_EXAMSCHEDULE_FAILURE";


export const createExamScheduleRequest = () => ({
    type: CREATE_EXAMSCHEDULE_REQUEST
});

export const createExamScheduleSuccess = (data) => ({
    type: CREATE_EXAMSCHEDULE_SUCCESS,
    payload: data
});

export const createExamScheduleFailure = (error) => ({
    type: CREATE_EXAMSCHEDULE_FAILURE,
    payload: error
});
