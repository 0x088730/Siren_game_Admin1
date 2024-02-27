import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getAllData } from "@/app/history/historySlice";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { FaHistory } from "@react-icons/all-files/fa/FaHistory";
import Modal from "@mui/material/Modal";
import DetailTable from "./modals/detailTable";
import { selectAccessToken, selectLoginState } from "@/app/auth/authSlice";
import { referData } from "@/app/history/referData";
import { userList } from "@/app/history/userList";
import RefModal from "./modals/refModal"
import RewardModal from "./modals/rewardModal"
import { getReferHistory, getRewardList, getWithdrawHistory } from "@/app/api";

const BattlePass = ({ setPage }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken)
  const [rewardModal, setRewardModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })
  const [rewardData, setRewardData] = useState([]);

  useEffect(() => {
    getRewardList(accessToken).then(res => {
      setRewardData(res.data);
    })
  }, [accessToken]);
  const modalOpen = (data, event) => {
    setModalData(data);
    setPosition({ x: window.innerWidth >= event.clientX + 350 ? event.clientX + 10 : event.clientX - 340, y: window.innerHeight >= event.clientY + 410 ? event.clientY : event.clientY - 400 });
    setRewardModal(true);
  };

  return (
    <div className="pt-24">
      <Box
        sx={{
          height: "70%",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          overflowX: "hidden",
        }}
      >
        <div className="flex justify-center relative">
          <div className="flex justify-center items-center h-10 my-5 font-bold ">
            <div className={`cursor-pointer pe-[7px]`}>BATTLE PASS BUYERS</div>
          </div>
          <button className='absolute right-0 h-10 rounded-full bg-gray-500 my-5 px-3 text-2xl text-white hover:bg-gray-400 duration-500'
            onClick={() => setPage('main')}
          >
            Home
          </button>
        </div>
        <div className="w-full flex justify-center items-center flex-col">
          {rewardData.map((item, index) => (
            item.available === true ?
              <div key={index} className="border-b-2 border-black my-[10px] w-[1024px] cursor-pointer flex justify-center" onClick={(e) => modalOpen(item._doc, e)}><span className="w-[75%]">{index + 1}.  wallet address: {item.walletAddress} | date: {item.buyDate}</span></div>
              : null
          ))}
        </div>
        <RewardModal rewardModal={rewardModal} setRewardModal={setRewardModal} modalData={modalData} position={position} />
      </Box>
    </div>
  );

};
export default BattlePass;
