import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 450,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const ActionDialog = props => {
	
	
	return (
		<React.Fragment>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={ props.open }
				onClose={ props.handleClose }
				closeAfterTransition
				BackdropComponent={ Backdrop }
				BackdropProps={ {
					timeout: 500,
				} }
			>
				<Fade in={ props.open }>
					<Box sx={ style }>
						{ props.children }
					</Box>
				</Fade>
			</Modal>
		</React.Fragment>
	);
};

ActionDialog.propTypes = {};

export default ActionDialog;
