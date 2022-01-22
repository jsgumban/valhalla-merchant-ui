import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess } from "./actions";
import { post } from "../../../helpers/ApiHelper";

function* loginUser({ payload: { user, history } }) {
  try {
    const request = data => post('/v1/auth/login', data, {
      auth: {
        username: 'client_id',
        password: 'client_secret'
      }
    });
    
    const response = yield call(request, {
      email: user.email,
      password: user.password,
    });
  
    localStorage.setItem("authUser", JSON.stringify(response));
    localStorage.setItem("accessToken", response.data.token);
    yield put(loginSuccess(response));
    history.push("/dashboard");
    window.location.reload();
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    localStorage.removeItem("accessToken");

    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
