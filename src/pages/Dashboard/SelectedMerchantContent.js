import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateMerchant } from "../../store/merchants/actions";

const SelectedMerchantContent = props => {
	const { id, name, logo } = props.currentMerchant;
	const dispatch = useDispatch();
	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: name || '',
			logo: logo || '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please enter merchant name"),
		}),
		onSubmit: ( values ) => {
			dispatch(updateMerchant({ ...values, id }, props.history));
			props.handleCloseMerchantModal();
		}
	});
	
	return (
		<React.Fragment>
			<Typography id="transition-modal-title" variant="h6" component="h2">
				{ id ? 'Merchant Information' : 'Add New Merchant' }
			</Typography>
			
			<form onSubmit={ ( e ) => {
				e.preventDefault();
				validation.handleSubmit();
				return false;
			} }>
				<TextField
					margin="normal"
					required
					fullWidth
					name="name"
					className="form-control"
					placeholder="Enter name"
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
				<Button type="submit" fullWidth variant="contained" sx={ { mt: 3, mb: 1 } }>
					{ id ? 'update merchant' : 'add merchant' }
				</Button>
				<Button onClick={ props.handleCloseMerchantModal } fullWidth variant="contained" color="warning">
					cancel
				</Button>
			</form>
		</React.Fragment>
	);
};

SelectedMerchantContent.propTypes = {};

export default SelectedMerchantContent;
