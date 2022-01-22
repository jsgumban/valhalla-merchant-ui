import { all, fork } from "redux-saga/effects"
import AuthSaga from "./auth/login/saga"
import MerchantsSaga from "./merchants/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(MerchantsSaga),
  ])
}
