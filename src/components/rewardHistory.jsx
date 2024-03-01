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
import { getRewardHistory, getRewardList, getWithdrawHistory } from "@/app/api";

const RewardHistory = ({ setPage }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken)
  const [rewardHistory, setRewardHistory] = useState([]);

  useEffect(() => {
    getRewardHistory(accessToken).then(res => {
      setRewardHistory(res.data);
    })
  }, [accessToken]);

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
            onClick={() => setPage('battle')}
          >
            BATTLE PASS
          </button>
        </div>
        <div className="w-full flex justify-center items-center flex-col">
          {rewardHistory.map((item, index) => (
            <div key={index} className="border-b-2 border-black my-[10px] w-[1300px] cursor-pointer flex justify-center">
              <span className="w-full">wallet: {item.walletAddress} | level: {item.level} | reward: {item.reward.toLowerCase()} | description: {item.description.toLowerCase()} | date: {item.createdAt}</span>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );

};
export default RewardHistory;
