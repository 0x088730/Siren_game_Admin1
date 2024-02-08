import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const RefModal = ({ refModal, setRefModal, modalData, position }) => {
    return (
        <Modal
            open={refModal}
            onClose={() => setRefModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div
                className="absolute p-[1rem] w-[430px] min-h-[330px] border-[2px] border-[#222222] rounded-[30px] bg-white"
                style={{ top: position.y, left: position.x }}
            >
                Wallets:
                {modalData && modalData.map((item, index) => (
                    <div key={index} className='ml-[5px]'>{index + 1} : {item}</div>
                ))}
            </div>
        </Modal>
    )
}

export default RefModal