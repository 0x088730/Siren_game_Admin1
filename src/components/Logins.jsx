import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAccessToken } from "@/app/auth/authSlice";
import { getLoginsHistory } from "@/app/api";

const Logins = ({ setPage }) => {
    const accessToken = useSelector(selectAccessToken)
    const [loginsData, setLoginsData] = useState([]);

    useEffect(() => {
        getLoginsHistory(accessToken).then(res => {
            setLoginsData(res.data);
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
                        <div className={`cursor-pointer pe-[7px]`}>LOGINED USERS</div>
                    </div>
                    <button className='absolute right-0 h-10 rounded-full bg-gray-500 my-5 px-3 text-2xl text-white hover:bg-gray-400 duration-500'
                        onClick={() => setPage('main')}
                    >
                        Home
                    </button>
                </div>
                <div className="w-full flex justify-center items-center flex-col">
                    {loginsData.map((item, index) => (
                        <div key={index} className="border-b-2 border-black my-[10px] w-[1024px] cursor-pointer flex justify-center">
                            <span className="w-[85%]">wallet address: {item.walletAddress} | date: {item.createdAt} | <span className="font-bold">CODE: {item.userRef}</span></span>
                        </div>
                    ))}
                </div>
            </Box>
        </div>
    );

};
export default Logins;
