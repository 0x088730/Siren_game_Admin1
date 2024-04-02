import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAccessToken } from "@/app/auth/authSlice";
import { getDepositHistory } from "@/app/api";

const DepositList = ({ setPage }) => {
    const accessToken = useSelector(selectAccessToken)
    const [depositData, setDepositData] = useState([]);

    useEffect(() => {
        getDepositHistory(accessToken).then(res => {
            console.log(res)
            setDepositData(res.data);
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
                        <div className={`cursor-pointer pe-[7px]`}>Deposit list</div>
                    </div>
                    <button className='absolute right-0 h-10 rounded-full bg-gray-500 my-5 px-3 text-2xl text-white hover:bg-gray-400 duration-500'
                        onClick={() => setPage('main')}
                    >
                        Home
                    </button>
                </div>
                <div className="w-full flex justify-center items-center flex-col">
                    {depositData.map((item, index) => (
                        <div key={index} className="border-b-2 border-black my-[10px] w-[1024px] cursor-pointer flex justify-center">
                            <span className="w-[90%]">{index + 1}. wallet address: {item.walletAddress} | amount: {item.amount} | date: {item.createdAt}</span>
                        </div>
                    ))}
                </div>
            </Box>
        </div>
    );

};
export default DepositList;
