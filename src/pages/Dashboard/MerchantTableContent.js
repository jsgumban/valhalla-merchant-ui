import React, { useEffect } from 'react';
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import EditIcon from '@mui/icons-material/Edit';
import SystemUpdateAltRoundedIcon from '@mui/icons-material/SystemUpdateAltRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import { getMerchants } from "../../store/merchants/actions";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const MerchantTableContent = ( props ) => {
	const { merchant } = props;
	const [ open, setOpen ] = React.useState(false);
	
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMerchants());
	}, [ getMerchants ]);
	
	
	return (
		<React.Fragment>
			<TableRow style={ { background: 'lightgray' } }>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={ () => setOpen(!open) }>
						{ open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{ merchant.id }
				</TableCell>
				<TableCell>{ merchant.name }</TableCell>
				<TableCell>{ merchant.members.data.length }</TableCell>
				<TableCell>
					<img style={ { height: "100px" } } src={ merchant.logo }></img>
				</TableCell>
				<TableCell align="right">
					<IconButton size="medium" color="inherit" onClick={ () => props.handleOpenMerchantModal(merchant) }>
						<SystemUpdateAltRoundedIcon color="primary"/>
					</IconButton>
					<IconButton size="medium" color="inherit" onClick={ () => props.handleOpenMerchantLogoModal(merchant) }>
						<AddPhotoAlternateIcon color="primary"/>
					</IconButton>
					<IconButton size="medium" color="inherit"
					            onClick={ () => props.handleOpenMemberModal(merchant, { id: null }) }>
						<GroupAddRoundedIcon color="primary"/>
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={ { paddingBottom: 0, paddingTop: 0 } } colSpan={ 6 }>
					<Collapse in={ open } timeout="auto" unmountOnExit>
						<Box sx={ { margin: 1 } }>
							{ <Typography variant="h6" gutterBottom component="div">
								Members
							</Typography> }
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Email</TableCell>
										<TableCell align="right">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{ !merchant.members.data.length &&
										<TableRow>
											<TableCell component="th" scope="row">No members available</TableCell>
											<TableCell component="th" scope="row"></TableCell>
											<TableCell component="th" scope="row"></TableCell>
											<TableCell component="th" scope="row"></TableCell>
										</TableRow>
									}
									{ merchant.members.data && merchant.members.data.map(( member ) => (
										<TableRow key={ member.id }>
											<TableCell component="th" scope="row">
												{ member.id }
											</TableCell>
											<TableCell>{ member.name }</TableCell>
											<TableCell>{ member.email }</TableCell>
											<TableCell align="right">
												<IconButton size="small" color="inherit"
												            onClick={ ( e ) => props.handleOpenMemberModal(merchant, member) }>
													<EditIcon color="primary"/>
												</IconButton>
											</TableCell>
										</TableRow>
									)) }
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

export default MerchantTableContent;
