import { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function ConfirmDialog({ open, title, content, onConfirm }) {
	const handleCancel = () => {
		onConfirm(false);
	};

	const handleOk = () => {
		onConfirm(true);
	};

	return (
		<Dialog sx={{ '& .MuiDialog-paper': { width: '80%' } }} maxWidth="xs" open={open}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent dividers>{content}</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleCancel}>
					No
				</Button>
				<Button onClick={handleOk}>Yes</Button>
			</DialogActions>
		</Dialog>
	);
}

ConfirmDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	onConfirm: PropTypes.func.isRequired
};

export default memo(ConfirmDialog);
