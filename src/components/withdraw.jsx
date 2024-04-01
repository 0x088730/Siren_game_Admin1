import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAccessToken } from "@/app/auth/authSlice";
import { getWithdrawHistory, setWithdrawConfirm } from "@/app/api";

const WithdrawList = ({ setPage }) => {
    const accessToken = useSelector(selectAccessToken)
    const [withdrawData, setWithdrawData] = useState([]);

    useEffect(() => {
        getWithdrawHistory(accessToken).then(res => {
            setWithdrawData(res.data);
        })
    }, [accessToken]);

    const withdrawConfirm = (item) => {
        console.log(item, accessToken)
        setWithdrawConfirm(accessToken, item).then(res => {
            if (res.data === false) {
                alert(res.message);
                return;
            }
            setWithdrawData(res.data);
        })
    }

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
                        <div className={`cursor-pointer pe-[7px]`}>Withdraw list</div>
                    </div>
                    <button className='absolute right-0 h-10 rounded-full bg-gray-500 my-5 px-3 text-2xl text-white hover:bg-gray-400 duration-500'
                        onClick={() => setPage('main')}
                    >
                        Home
                    </button>
                </div>
                <div className="w-full flex justify-center items-center flex-col">
                    {withdrawData.map((item, index) => (
                        <div key={index} className={`${item.withdrawStatus ? "bg-green-400" : ""} border-b-2 border-black my-[10px] w-[1100px] flex justify-center`}>
                            <span className="w-full">{index + 1}. date: {item.createdAt} | amount: {item.amount} CSC {`(full amount on account: ${item.totalAmount})`} | wallet address: {item.walletAddress}</span>
                            <div className={`${item.withdrawStatus ? "hidden" : "block"} cursor-pointer text-black font-bold hover:text-red-600`} onClick={() => withdrawConfirm(item)}>confirm</div>
                        </div>
                    ))}
                </div>
            </Box>
        </div>
    );

};
export default WithdrawList;
