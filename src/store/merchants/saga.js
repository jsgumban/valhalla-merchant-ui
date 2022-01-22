import { call, takeEvery, put, takeLatest } from "redux-saga/effects";
import {
  DELETE_MEMBER, DELETE_MEMBER_SUCCESS,
  GET_MERCHANTS,
  UPDATE_MEMBER,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MERCHANT,
  UPDATE_MERCHANT_SUCCESS
} from "./actionTypes";

import {
  deleteMemberFail,
  deleteMemberSuccess,
  getMerchantsFail,
  getMerchantsSuccess, updateMemberFail, updateMemberSuccess, updateMerchantSuccess,
} from "./actions";

import { del, get, post, update } from "../../helpers/ApiHelper";

function* onGetMerchants() {
  try {
    const request = data => get('/v1/merchants', data);
    
    const response = yield call(request);
    yield put(getMerchantsSuccess(response));
  } catch (error) {
    yield put(getMerchantsFail(error));
  }
}

function* onUpdateMerchant({ payload: { merchant, history } }) {
  try {
    let request = data => update(`/v1/merchants/${merchant.id}`, data);
    if (!merchant.id) {
      request = data => post(`/v1/merchants/`, data);
    }
    
    const response = yield call(request, {
      name: merchant.name,
      logo: merchant.logo
    });
    
    yield put(updateMerchantSuccess(response));
  } catch (error) {
    yield put(getMerchantsFail(error));
  }
}

function* onUpdateMember({ payload: { member, history } }) {
  try {
    let request = data => update(`/v1/members/${member.id}`, data);
    if (!member.id) {
      request = data => post(`/v1/members/`, data);
    }
    
    const response = yield call(request, member);
    
    yield put(updateMemberSuccess(response));
  } catch (error) {
    yield put(updateMemberFail(error.toJSON()));
  }
}
function* onDeleteMember({ payload: { member, history } }) {
  try {
    let request = data => del(`/v1/members/${member.id}`, data);
    const response = yield call(request, member);
    
    yield put(deleteMemberSuccess(response));
  } catch (error) {
    yield put(deleteMemberFail(error.toJSON()));
  }
}

function* merchantsSaga() {
  yield takeEvery(GET_MERCHANTS, onGetMerchants);
  yield takeEvery(UPDATE_MERCHANT, onUpdateMerchant);
  yield takeEvery(UPDATE_MEMBER, onUpdateMember);
  yield takeEvery(UPDATE_MERCHANT_SUCCESS, onGetMerchants);
  yield takeEvery(UPDATE_MEMBER_SUCCESS, onGetMerchants);
  yield takeEvery(DELETE_MEMBER, onDeleteMember);
  yield takeEvery(DELETE_MEMBER_SUCCESS, onGetMerchants);
}

export default merchantsSaga;
