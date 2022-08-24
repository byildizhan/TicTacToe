import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@material-ui/core';
import img from "../img/Loader.htm"
import { Gif } from '@mui/icons-material';
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
export default function WaitModal() {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img width={170} height={100} src={"https://cdn.dribbble.com/users/108183/screenshots/5288723/tic_tac_toe_loader_.gif"} />
                    <br />
                    Waiting For Opponent...
                </Box>
            </Modal>
        </div>
    );
}
