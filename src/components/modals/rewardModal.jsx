import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const RewardModal = ({ rewardModal, setRewardModal, modalData, position }) => {
    const [presentData, setPresentData] = React.useState([]);

    React.useEffect(() => {
        let array = Object.values(modalData);
        let currentArray = [];
        for (let i = 0; i < array.length; i++) {
            if (typeof array[i] === "object") {
                currentArray.push(array[i]);
            }
        };
        setPresentData(currentArray);
    }, [rewardModal])
    return (
        <Modal
            open={rewardModal}
            onClose={() => setRewardModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div
                className="absolute p-[1rem] w-[330px] h-[400px] overflow-y-auto border-[2px] border-[#222222] rounded-[15px] bg-[#494949] flex flex-col items-center justify-center"
                style={{ top: position.y, left: position.x }}
            >
                {presentData && presentData.map((item, index) => (
                    <div key={index} className='ml-[5px] text-[#d1d1d1]'>{item.level} : {item.getStatus === true ? "CLAIMED" : "CLAIM"}</div>
                ))}
            </div>
        </Modal>
    )
}

export default RewardModal