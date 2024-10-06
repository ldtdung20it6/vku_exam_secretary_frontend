import {
  INSERT_SECRETARY_INTO_EXAM_SCHEDULE_FAILURE,
  INSERT_SECRETARY_INTO_EXAM_SCHEDULE_REQUEST,
  INSERT_SECRETARY_INTO_EXAM_SCHEDULE_SUCCESS,
  SECRETARY_REGISTER_FAILURE,
  SECRETARY_REGISTER_REQUEST,
  SECRETARY_REGISTER_SUCCESS,
} from "./SecretaryRegister.actionType";
import { api } from "../../config/api";

// Action to register a secretary
export const registerSecretary =
  (examSessionId, secretaryRequest) => async (dispatch) => {
    try {
      dispatch({ type: SECRETARY_REGISTER_REQUEST });

      const { data } = await api.post(
        `/api/exam-session/${examSessionId}/register-secretary`,
        secretaryRequest
      );

      dispatch({
        type: SECRETARY_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SECRETARY_REGISTER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const insertSecretaryIntoExamSchedule =
  (secretaryId, examScheduleId) => async (dispatch) => {
    try {
      dispatch({ type: INSERT_SECRETARY_INTO_EXAM_SCHEDULE_REQUEST });

      const { data } = await api.post(
        `/api/exam-session/assign-secretary/${secretaryId}/${examScheduleId}`
      );

      dispatch({
        type: INSERT_SECRETARY_INTO_EXAM_SCHEDULE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: INSERT_SECRETARY_INTO_EXAM_SCHEDULE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
