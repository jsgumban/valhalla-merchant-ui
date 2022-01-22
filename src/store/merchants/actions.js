import {
	GET_MERCHANTS,
	GET_MERCHANTS_SUCCESS,
	GET_MERCHANTS_FAIL,
	UPDATE_MERCHANT,
	UPDATE_MERCHANT_SUCCESS,
	UPDATE_MERCHANT_FAIL,
	UPDATE_MEMBER,
	UPDATE_MEMBER_SUCCESS,
	UPDATE_MEMBER_FAIL,
	DELETE_MEMBER,
	DELETE_MEMBER_SUCCESS,
	DELETE_MEMBER_FAIL
} from "./actionTypes"

export const getMerchants = () => ({
	type: GET_MERCHANTS,
})

export const getMerchantsSuccess = merchants => ({
	type: GET_MERCHANTS_SUCCESS,
	payload: merchants,
})

export const getMerchantsFail = error => ({
	type: GET_MERCHANTS_FAIL,
	payload: error,
})


export const updateMerchant = (merchant, history) => ({
	type: UPDATE_MERCHANT,
	payload: { merchant, history },
})

export const updateMerchantSuccess = merchant => ({
	type: UPDATE_MERCHANT_SUCCESS,
	payload: merchant,
})

export const updateMerchantFail = error => ({
	type: UPDATE_MERCHANT_FAIL,
	payload: error,
})


export const updateMember = (member, history) => ({
	type: UPDATE_MEMBER,
	payload: { member, history },
})

export const updateMemberSuccess = member => ({
	type: UPDATE_MEMBER_SUCCESS,
	payload: member,
})

export const updateMemberFail = error => ({
	type: UPDATE_MEMBER_FAIL,
	payload: error.message,
})

export const deleteMember = (member, history) => ({
	type: DELETE_MEMBER,
	payload: { member, history },
})

export const deleteMemberSuccess = () => ({
	type: DELETE_MEMBER_SUCCESS,
})

export const deleteMemberFail = error => ({
	type: DELETE_MEMBER_FAIL,
	payload: error.message,
})