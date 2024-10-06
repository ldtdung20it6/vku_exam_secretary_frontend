import {
  SECRETARY_REGISTER_REQUEST,
  SECRETARY_REGISTER_SUCCESS,
  SECRETARY_REGISTER_FAILURE,
  INSERT_SECRETARY_INTO_EXAM_SCHEDULE_REQUEST,
} from "./SecretaryRegister.actionType";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const secretaryRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SECRETARY_REGISTER_REQUEST:
    case INSERT_SECRETARY_INTO_EXAM_SCHEDULE_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case SECRETARY_REGISTER_SUCCESS:
    case INSERT_SECRETARY_INTO_EXAM_SCHEDULE_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case SECRETARY_REGISTER_FAILURE:
    case INSERT_SECRETARY_INTO_EXAM_SCHEDULE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
