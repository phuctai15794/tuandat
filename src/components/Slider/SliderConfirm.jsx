import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function SliderConfirm({ open, data = null, onClose, onDelete }) {
	const handleCancel = () => {
		onClose();
	};

	const handleOk = () => {
		data && onDelete(data._id);
		onClose();
	};

	return (
		<Dialog sx={{ '& .MuiDialog-paper': { width: '80%' } }} maxWidth="xs" open={open}>
			<DialogTitle>Delete confirmation</DialogTitle>
			<DialogContent dividers>Do you want to delete this item ?</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleCancel}>
					No
				</Button>
				<Button onClick={handleOk}>Yes</Button>
			</DialogActions>
		</Dialog>
	);
}

SliderConfirm.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object,
	onClose: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default SliderConfirm;
