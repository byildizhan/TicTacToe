import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@material-ui/core';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function WinModal({ props }) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    if (props !== "Draw") {
        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography>{props} Win</Typography>
                    </Box>
                </Modal>
            </div>
        );
    }
    else {
        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography>{props}</Typography>
                    </Box>
                </Modal>
            </div>
        );
    }

}
