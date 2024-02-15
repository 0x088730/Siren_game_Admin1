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

const PresalePage = ({ setPage }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken)
  const [nav, setNav] = useState("transaction");
  const [refModal, setRefModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  const showReferData = useSelector((state) => state.referData.data);
  const showUserList = useSelector((state) => state.userList.data);
  useEffect(() => {
    dispatch(referData(accessToken));
    dispatch(userList(accessToken));
  }, [accessToken]);
  const modalOpen = (guest, event) => {
    setPosition({ x: event.clientX + 10, y: window.innerHeight >= event.clientY + 350 ? event.clientY : event.clientY - 330 });
    setModalData(guest);
    setRefModal(true);
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
            <div className={`hover:text-[#35ee5a] ${nav === "transaction" ? "text-[#35ee5a]" : ""} cursor-pointer pe-[7px]`} onClick={() => setNav("transaction")}>transaction</div> |
            <div className="hover:text-[#35ee5a] cursor-pointer px-[7px]">csc token</div> |
            <div className="hover:text-[#35ee5a] cursor-pointer px-[7px]">usdt token</div> |
            <div className={`hover:text-[#35ee5a] ${nav === "referrals" ? "text-[#35ee5a]" : ""} cursor-pointer pl-[7px]`} onClick={() => setNav("referrals")}>referrals</div>
          </div>
          <button className='absolute right-0 h-10 rounded-full bg-gray-500 my-5 px-3 text-2xl text-white hover:bg-gray-400 duration-500'
            onClick={() => setPage('main')}
          >
            Home
          </button>
        </div>
        {nav === "transaction" ?
          <div className="w-full flex justify-center items-center flex-col">
            {showReferData.map(({ createdAt, amount, walletAddress, refLink }, index) => (
              <div key={index} className="border-b-2 border-black my-[10px] w-[1024px]">date: {createdAt} | amount: {amount && amount.usdt} usdt got {amount && amount.csc} csc | wallet: {walletAddress} | reflink: {refLink}</div>
            ))}
          </div>
          :
          <div className="w-full flex justify-center items-center flex-col">
            {showUserList.map(({ walletAddress, Ref, usdt, guest }, index) => (
              <div key={index} className="border-b-2 border-black my-[10px] w-[768px]">user #{index + 1} | wallet: {walletAddress} | Ref: <span className="text-[#35ee5a] font-bold text-[20px] cursor-pointer" onClick={(e) => modalOpen(guest, e)}>{Ref}</span>  Earned usdt: {Number.isInteger(usdt) ? usdt : Number(usdt).toFixed(2)}</div>
            ))}
          </div>
        }
        <RefModal refModal={refModal} setRefModal={setRefModal} modalData={modalData} position={position} />
      </Box>
    </div>
  );

};
export default PresalePage;
