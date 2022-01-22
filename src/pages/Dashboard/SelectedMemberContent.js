import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { deleteMember, updateMember, updateMerchant } from "../../store/merchants/actions";

const SelectedMemberContent = props => {
	const { id, name, email } = props.currentMember;
	
	const dispatch = useDispatch();
	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: name || '',
			email: email || '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please enter merchant name"),
			email: Yup.string().required("Please enter email"),
		}),
		onSubmit: ( values ) => {
			dispatch(updateMember({ ...values, id, merchant_id: props.currentMerchant.id }, props.history))
			props.handleCloseMemberModal();
		}
	});
	
	const onDeleteMember = () => {
		dispatch(deleteMember({ id }, props.history))
		props.handleCloseMemberModal();
	};
	
	return (
		<React.Fragment>
			<Typography id="transition-modal-title" variant="h6" component="h2">
				{ id ? 'Member Information' : 'Add New Member' }
			</Typography>
			<form onSubmit={ ( e ) => {
				e.preventDefault();
				validation.handleSubmit();
				return false;
			} }>
				<TextField
					margin="normal"
					fullWidth
					value={ props.currentMerchant.name }
					className="form-control"
					label="Merchant"
					disabled
					focused
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="name"
					label="Name"
					autoComplete="name"
					autoFocus
					name="name"
					className="form-control"
					placeholder="Enter name"
					type="text"
					onChange={ validation.handleChange }
					onBlur={ validation.handleBlur }
					value={ validation.values.name || "" }
					error={
						validation.touched.name && validation.errors.name ? true : false
					}
				/>
				{ validation.touched.name && validation.errors.name ? (
					<span type="invalid">{ validation.errors.name }</span>
				) : null }
				
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					autoComplete="email"
					name="email"
					className="form-control"
					placeholder="Enter email"
					type="email"
					onChange={ validation.handleChange }
					onBlur={ validation.handleBlur }
					value={ validation.values.email || "" }
					error={
						validation.touched.email && validation.errors.email ? true : false
					}
				/>
				{ validation.touched.email && validation.errors.email ? (
					<span type="invalid">{ validation.errors.email }</span>
				) : null }
				<Button type="submit" fullWidth variant="contained" sx={ { mt: 3, mb: 1 } }>
					{ id ? 'update member' : 'add member' }
				</Button>
				{ id &&
					<Button onClick={ () => onDeleteMember() } fullWidth variant="contained" color="error" sx={ { mb: 1 } }>
						delete member
					</Button>
				}
				<Button onClick={ props.handleCloseMemberModal } fullWidth variant="contained" color="warning">
					cancel
				</Button>
			</form>
		</React.Fragment>
	);
};

export default SelectedMemberContent;
