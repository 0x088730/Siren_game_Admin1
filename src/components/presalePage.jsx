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

// export interface DataType  {
//   createdAt: string | null;
//   amount: any | null;
//   walletAddress: string | null;
//   refLink: string | null;
// }
// interface Props {
//   setPage: any
// }
const PresalePage = ({ setPage }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken)
  const showData = useSelector(
    (state) => state.referData.data
  );
  useEffect(() => {
    dispatch(referData(accessToken));
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
            <div className="hover:text-[#35ee5a] text-[#35ee5a] cursor-pointer pe-[7px]">transaction</div> |
            <div className="hover:text-[#35ee5a] cursor-pointer px-[7px]">csc token</div> |
            <div className="hover:text-[#35ee5a] cursor-pointer pl-[7px]">usdt token</div>
          </div>
          <button className='absolute right-0 h-10 rounded-full bg-gray-500 my-5 px-3 text-2xl text-white hover:bg-gray-400 duration-500'
            onClick={() => setPage('main')}
          >
            Home
          </button>
        </div>
        <div className="w-full flex justify-center items-center flex-col">
          {showData.map(({ createdAt, amount, walletAddress, refLink }, index) => (
            <div key={index} className="border-b-2 border-black my-[10px] w-[1024px]">date: {createdAt} | amount: {amount && amount.usdt} usdt got {amount && amount.csc} csc | wallet: {walletAddress} | reflink: {refLink}</div>
          ))}
        </div>
      </Box>
    </div>
  );

};
export default PresalePage;
