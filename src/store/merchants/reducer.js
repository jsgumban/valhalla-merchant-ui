import {
  GET_MERCHANTS,
  GET_MERCHANTS_SUCCESS,
  GET_MERCHANTS_FAIL,
  UPDATE_MERCHANT,
  UPDATE_MERCHANT_SUCCESS,
  UPDATE_MERCHANT_FAIL,
  UPDATE_MEMBER,
  UPDATE_MEMBER_SUCCESS, UPDATE_MEMBER_FAIL, DELETE_MEMBER, DELETE_MEMBER_SUCCESS, DELETE_MEMBER_FAIL,
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  updateMerchantSuccess: false,
  updateMemberSuccess: false,
  updateMemberFail: false,
  deleteMemberSuccess: false,
}

const merchants = (state = initialState, action) => {
  switch (action.type) {
    case GET_MERCHANTS:
      state = {
        ...state,
      }
      break;
    case GET_MERCHANTS_SUCCESS:
      state = {
        ...state,
        merchants: action.payload,
      }
      break;
    case GET_MERCHANTS_FAIL:
      state = {
        ...state,
        error: action.payload,
      }
      break;
      
      
    case UPDATE_MERCHANT:
      state = {
        ...state,
      }
      break;
    case UPDATE_MERCHANT_SUCCESS:
      state = {
        ...state,
        merchant: action.payload,
        updateMerchantSuccess: true,
      }
      break;
    case UPDATE_MERCHANT_FAIL:
      state = {
        ...state,
        error: action.payload,
      }
      break;
      
      
    case UPDATE_MEMBER:
      state = {
        ...state,
      }
      break;
    case UPDATE_MEMBER_SUCCESS:
      state = {
        ...state,
        error: '',
        member: action.payload,
        updateMemberSuccess: true,
      }
      break;
    case UPDATE_MEMBER_FAIL:
      state = {
        ...state,
        updateMemberSuccess: false,
        updateMemberFail: true,
        error: action.payload,
      }
      break
    case DELETE_MEMBER:
      state = {
        ...state,
      }
      break;
    case DELETE_MEMBER_SUCCESS:
      state = {
        ...state,
        error: '',
        member: action.payload,
        deleteMemberSuccess: true,
        updateMerchantSuccess: false,
      }
      break;
    case DELETE_MEMBER_FAIL:
      state = {
        ...state,
        deleteMemberSuccess: false,
        updateMerchantSuccess: false,
        error: action.payload,
      }
      break;
    default:
      state = { ...state }
      break
  }
  
  return state
}

export default merchants
