import React from 'react';
import { withRouter } from "react-router-dom"
import { AppBar, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth/login/actions";

const Layout = props => {
	const authUser = localStorage.getItem('authUser');
	const [ auth, setAuth ] = React.useState(true);
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const dispatch = useDispatch();
	
	
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		dispatch(logoutUser(props.history));
		window.location.reload();
	};
	
	
	return (
		<div>
			<AppBar position="sticky" style={{ display: !authUser && 'none'}}>
				<Toolbar>
					<Typography variant="h6" sx={ {flexGrow: 1} }>
						Merchant Management
					</Typography>
					{ auth && (
						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={ handleMenu }
								color="inherit"
							>
								<AccountCircle/>
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={ anchorEl }
								anchorOrigin={ {
									vertical: "top",
									horizontal: "right"
								} }
								keepMounted
								transformOrigin={ {
									vertical: "top",
									horizontal: "right"
								} }
								open={ Boolean(anchorEl) }
								onClose={ handleClose }
							>
								<MenuItem onClick={ handleClose }>Profile</MenuItem>
								<MenuItem onClick={ handleClose }>Log out</MenuItem>
							</Menu>
						</div>
					) }
				</Toolbar>
			</AppBar>
			<Container sx={ {marginTop: 8} }>
				<React.Fragment>{ props.children }</React.Fragment>
			</Container>
		</div>
	);
};

Layout.propTypes = {};

export default withRouter(Layout);


