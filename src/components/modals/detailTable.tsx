import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getDataByWallet } from "@/app/history/historySlice";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect, useState } from 'react'
import { FaHistory } from '@react-icons/all-files/fa/FaHistory'
import { selectAccessToken } from "@/app/auth/authSlice";
import { getItems } from "@/app/api";
export interface DataType {
    id: number | null;
    name: string | null;
    category: string | null;
    age: number | null;
}

interface PropsType {
    walletAddress: string
}
const DetailTable = ({ walletAddress }: PropsType) => {
    const dispatch = useDispatch()
    const accessToken = useSelector(selectAccessToken)
    const [fightCount, setFightCount] = useState(0);
    const [items, setItems] = useState([{ type: "", level: 0, count: 0 }]);
    const [chests, setChests] = useState({
        unopened: 0,
        opened: 0
    });
    const [showData, setShowData] = useState([]);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'Date',
            headerName: 'Date',
            flex: 2,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'Time',
            headerName: 'Time',
            flex: 2,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'ipAddress',
            headerName: 'Ip Address',
            flex: 3,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'action_type',
            headerName: 'Action Type',
            flex: 3,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'detail',
            headerName: 'Detail Info',
            flex: 5,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },

    ];
    useEffect(() => {
        getItems(walletAddress, accessToken)
            .then(res => {
                setShowData(res.log)
                setFightCount(res.totalCount);
                let currentArray = [];
                let opened = 0;
                for (let i = 0; i < res.items.length; i++) {
                    if (res.items[i].type === "loot") {
                        setChests(prevChests => ({
                            ...prevChests,
                            unopened: res.items[i].count
                        }));
                    }
                    if (res.items[i].type === "infernal_1") {
                        currentArray.push({ type: "INFERNAL", level: 1, count: res.items[i].count })
                        opened = opened + res.items[i].count;
                    }
                    if (res.items[i].type === "infernal_2") {
                        currentArray.push({ type: "INFERNAL", level: 2, count: res.items[i].count })
                        opened = opened + res.items[i].count;
                    }
                    if (res.items[i].type === "infernal_3") {
                        currentArray.push({ type: "INFERNAL", level: 3, count: res.items[i].count })
                        opened = opened + res.items[i].count;
                    }
                    if (res.items[i].type === "chimera_1") {
                        currentArray.push({ type: "RED GEM", level: 1, count: res.items[i].count })
                        opened = opened + res.items[i].count;
                    }
                    if (res.items[i].type === "chimera_2") {
                        currentArray.push({ type: "RED GEM", level: 2, count: res.items[i].count })
                        opened = opened + res.items[i].count;
                    }
                    if (res.items[i].type === "chimera_3") {
                        currentArray.push({ type: "RED GEM", level: 3, count: res.items[i].count })
                        opened = opened + res.items[i].count;
                    }
                    if (res.items[i].type === "gem_1") {
                        currentArray.push({ type: "BLUE GEM", level: 1, count: res.items[i].count })
                        opened = opened + res.items[i].count;
                    }
                    if (res.items[i].type === "gem_2") {
                        currentArray.push({ type: "BLUE GEM", level: 2, count: res.items[i].count })
                        opened = opened + res.items[i].count;
                    }
                    if (res.items[i].type === "gem_3") {
                        currentArray.push({ type: "BLUE GEM", level: 3, count: res.items[i].count })
                        opened = opened + res.items[i].count;
                    }
                }
                setItems(currentArray)
                setChests(prevChests => ({
                    ...prevChests,
                    opened
                }));
            })
    }, [walletAddress])
    return (
        <Box >
            <DataGrid
                rows={showData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
            <div>
                <div>PVE PLAYS: {fightCount} TIMES</div>
                <div>CHESTS: {chests.unopened}</div>
                <div>CHESTS OPENED: {chests.opened}</div>
                <div>INVENTORY:
                    {items.map((item, index) => (
                        <span key={index}>
                            {" " + item.type + " " + item.count + " CRYSTAL " + item.level}
                            {index !== items.length - 1 && " | "}
                        </span>
                    ))}
                </div>
            </div>
        </Box>
    )
}
export default DetailTable