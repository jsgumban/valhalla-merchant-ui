import * as React from 'react';
import { Button, Container } from "@mui/material";
import ActionDialog from "../../components/ActionDialog";
import SelectedMerchantContent from "./SelectedMerchantContent";
import MerchantTable from "./MerchantTable";
import SelectedMemberContent from "./SelectedMemberContent";
import { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { updateMerchant } from "../../store/merchants/actions";
import { useDispatch } from "react-redux";

const Dashboard = props => {
	const dispatch = useDispatch();
	
	const [ openMerchantModal, setOpenMerchantModal ] = useState(false);
	const [ currentMerchant, setCurrentMerchant ] = useState(null);
	const [ openMerchantLogoModal, setOpenMerchantLogoModal ] = useState(false);
	
	
	const handleCloseMerchantModal = () => setOpenMerchantModal(false);
	const handleOpenMerchantModal = ( merchant ) => {
		setOpenMerchantModal(true)
		setCurrentMerchant(merchant);
	};
	
	
	const [ openMemberModal, setOpenMemberModal ] = useState(false);
	const [ currentMember, setCurrentMember ] = useState(null);
	const handleCloseMemberModal = () => setOpenMemberModal(false);
	const handleOpenMemberModal = ( merchant, member ) => {
		setOpenMemberModal(true)
		setCurrentMerchant(merchant);
		setCurrentMember(member);
	};
	
	const handleOpenMerchantLogoModal = ( merchant ) => {
		setCurrentMerchant(merchant);
		setOpenMerchantLogoModal(true)
	};
	const handleCloseMerchantLogoModal = () => setOpenMerchantLogoModal(false);
	const handleUploadLogo = async ( file ) => {
		const base64 = await getBase64(file);
		dispatch(updateMerchant({ logo: base64, id: currentMerchant.id }, props.history));
		handleCloseMerchantLogoModal(false);
		
	}
	const getBase64 = ( file ) => {
		return new Promise(( resolve, reject ) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
			reader.readAsDataURL(file);
		});
	}
	return (
		<Container>
			<DropzoneDialog
				dialogTitle={ currentMerchant && `Upload ${ currentMerchant.name } logo` }
				acceptedFiles={ [ 'image/png' ] }
				cancelButtonText={ "cancel" }
				submitButtonText={ "submit" }
				maxFileSize={ 50000 }
				filesLimit={ 1 }
				useChipsForPreview={ true }
				open={ openMerchantLogoModal }
				onClose={ () => setOpenMerchantLogoModal(false) }
				onSave={ ( files ) => {
					handleUploadLogo(files[0]);
				} }
				showPreviews={ true }
				showFileNamesInPreview={ true }
			/>
			
			<ActionDialog
				open={ openMerchantModal }
				handleOpen={ handleOpenMerchantModal }
				handleClose={ handleCloseMerchantModal }>
				<SelectedMerchantContent { ...props } currentMerchant={ currentMerchant }
				                         handleCloseMerchantModal={ handleCloseMerchantModal }/>
			</ActionDialog>
			
			<ActionDialog
				open={ openMemberModal }
				handleOpen={ handleOpenMemberModal }
				handleClose={ handleCloseMemberModal }>
				<SelectedMemberContent { ...props } currentMerchant={ currentMerchant } currentMember={ currentMember }
				                       handleCloseMemberModal={ handleCloseMemberModal }/>
			</ActionDialog>
			
			<div style={ { display: "flex", flexDirection: "row-reverse" } }>
				<Button variant="contained" sx={ { mt: 3, mb: 2 } } onClick={ () => handleOpenMerchantModal({ id: null }) }>
					Add merchant
				</Button>
			</div>
			<MerchantTable handleOpenMerchantModal={ handleOpenMerchantModal } handleOpenMemberModal={ handleOpenMemberModal }
			               handleOpenMerchantLogoModal={ handleOpenMerchantLogoModal }/>
		</Container>
	);
};

export default Dashboard;