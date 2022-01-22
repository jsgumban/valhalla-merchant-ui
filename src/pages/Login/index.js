import React from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {loginUser} from "../../store/auth/login/actions";
import {
	Box,
	Button,
	TextField
} from "@mui/material";

const LoginPage = props => {
	const dispatch = useDispatch();
	
	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: "admin@admin.com" || '',
			password: "password" || '',
		},
		validationSchema: Yup.object({
			email: Yup.string().required("Please Enter Your Email"),
			password: Yup.string().required("Please Enter Your Password"),
		}),
		onSubmit: (values) => {
			dispatch(loginUser(values, props.history));
		}
	});
	
	const submitFrom = (e) => {
		e.preventDefault();
		validation.handleSubmit();
		return false;
	}
	
	const { error } = useSelector(state => ({
		error: state.login.error,
	}));
	
	return (
		<Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
			<Box noValidate sx={{ mt: 1, maxWidth: 400 }}>
				<form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false;}}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						autoComplete="email"
						autoFocus
						name="email"
						className="form-control"
						placeholder="Enter email"
						type="email"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.email || ""}
						error={
							validation.touched.email && validation.errors.email ? true : false
						}
					/>
					{validation.touched.email && validation.errors.email ? (
						<span type="invalid">{validation.errors.email}</span>
					) : null}
					
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={validation.values.password || ""}
						placeholder="Enter Password"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						error={
							validation.touched.password && validation.errors.password ? true : false
						}
					/>
					{validation.touched.password && validation.errors.password ? (
						<div type="invalid">{validation.errors.password}</div>
					) : null}
					
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
					
					<div>{error ? <span color="danger text-center">{error}</span> : null}</div>
				</form>
				
			</Box>
		</Box>
	);
};

export default withRouter(LoginPage);
