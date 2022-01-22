import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Container} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMerchants } from "../../store/merchants/actions";

function createData(name, calories, fat, carbs, protein, price) {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
		price,
		history: [
			{
				date: '2020-01-05',
				customerId: '11091700',
				amount: 3,
			},
			{
				date: '2020-01-02',
				customerId: 'Anonymous',
				amount: 1,
			},
		],
	};
}

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	console.log('row', row);
	
	return (
		<React.Fragment>
			<TableRow style={{ background: 'lightgray'}}>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.id}
				</TableCell>
				<TableCell align="right">{row.name}</TableCell>
				<TableCell align="right">{row.email}</TableCell>
				<TableCell align="right">{row.carbs}</TableCell>
				<TableCell align="right">{row.protein}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Members
							</Typography>
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
									{ !row.members.data.length &&
										<TableRow>
											<TableCell component="th" scope="row">No members available</TableCell>
											<TableCell component="th" scope="row"></TableCell>
											<TableCell component="th" scope="row"></TableCell>
											<TableCell component="th" scope="row"></TableCell>
										</TableRow>
									}
									{row.members.data && row.members.data.map((member) => (
										<TableRow key={member.id}>
											<TableCell component="th" scope="row">
												{member.id}
											</TableCell>
											<TableCell>{member.name}</TableCell>
											<TableCell>{member.email}</TableCell>
											<TableCell align="right">
												{Math.round(member.amount * row.price * 100) / 100}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		
		</React.Fragment>
	
	);
}

export default function Dashboard() {
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(getMerchants());
	}, [getMerchants]);
	
	const { merchants } = useSelector(state => ({
		merchants: state.merchants.merchants,
	}));
	
	console.log('merchants', merchants);
	
	return (
		<Container>
			<TableContainer>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>ID</TableCell>
							<TableCell>Merchants</TableCell>
							<TableCell>Logo</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{merchants && merchants.data.map((merchant) => (
							<Row row={merchant} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
		
	);
}