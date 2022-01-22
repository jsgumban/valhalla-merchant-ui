import React, { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import MerchantTableContent from "./MerchantTableContent";
import TableContainer from "@mui/material/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { getMerchants } from "../../store/merchants/actions";
import { Alert, Collapse, Snackbar } from "@mui/material";

const MerchantTable = props => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(getMerchants());
	}, [ getMerchants ]);
	
	const { merchants } = useSelector(state => ({
		"merchants": state.merchants.merchants,
	}));
	
	const {
		updateMerchantSuccess,
		updateMemberSuccess,
		deleteMemberSuccess,
		error,
		updateMemberFail
	} = useSelector(state => ({
		"updateMerchantSuccess": state.merchants.updateMerchantSuccess,
		"deleteMemberSuccess": state.merchants.deleteMemberSuccess,
		"updateMemberSuccess": state.merchants.updateMemberSuccess,
		"error": state.merchants.error,
		"updateMemberFail": state.merchants.updateMemberFail,
	}));
	
	return (
		<React.Fragment>
			<TableContainer>
				<Snackbar autoHideDuration="2000" open={ updateMerchantSuccess || updateMemberSuccess || deleteMemberSuccess }>
					<Alert sx={ { "mb": 2 } }>
						Successfully { updateMerchantSuccess ? 'updated/created' : 'deleted' } { updateMerchantSuccess ? ' merchant' : ' member' }
					</Alert>
				</Snackbar>
				<Snackbar autoHideDuration="2000" open={ error }>
					<Alert sx={ { "mb": 2 } } severity='error'>
						{ error } { updateMemberFail && '(Might be the email has been used by other users already)' }
					</Alert>
				</Snackbar>
				<Table aria-label="collapsible table">
					<TableHead style={ { "background": 'lightblue' } }>
						<TableRow>
							<TableCell/>
							<TableCell>ID</TableCell>
							<TableCell>Merchants</TableCell>
							<TableCell>Members</TableCell>
							<TableCell>Logo</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ merchants && merchants.data.map(( merchant ) => (
							<MerchantTableContent merchant={ merchant } key={ merchant.id } { ...props }/>
						)) }
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
};


export default MerchantTable;
