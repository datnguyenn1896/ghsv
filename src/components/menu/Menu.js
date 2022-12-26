import './Menu.scss'
import Avatar from '@mui/material/Avatar';
import logo from '../../assets/img/logo2.png'
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PublicIcon from '@mui/icons-material/Public';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import StarIcon from '@mui/icons-material/Star';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreateOrderWorld from '../createOrder/CreateOrderWorld';

const Menu = () => {
    const [selectedIndex, setSelectedIndex] = useState(2);
    const createOrderWorldRef = React.useRef(null)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    }

    const [isShowCreateOrderWorld, setShowCreateOrderWorld] = useState(false);

    return (
        <>
            <div className="menu-container">
                <div className='left-bar'>
                    <Avatar alt="Remy Sharp" src={logo} sx={{ width: 135, height: 135, marginBottom: '70px' }} />
                    <List
                        sx={{ maxWidth: 300, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Menu
                            </ListSubheader>
                        }
                    >
                        <ListItemButton selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}>
                            <ListItemIcon>
                                <NextWeekIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ fontWeight: 'bold' }} primary="Đối Soát" />
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}>
                            <ListItemIcon>
                                <LocalMallIcon />
                            </ListItemIcon>
                            <ListItemText primary="Đơn Hàng" />
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="Đơn Chờ Duyệt" />
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}>
                            <ListItemIcon>
                                <AssessmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Báo Cáo" />
                        </ListItemButton>
                    </List>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Phụ Lục
                            </ListSubheader>
                        }
                    >
                        <ListItemButton selected={selectedIndex === 4}
                            onClick={(event) => handleListItemClick(event, 4)}>
                            <ListItemIcon>
                                <CompareArrowsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tích Hợp API" />
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === 5}
                            onClick={(event) => handleListItemClick(event, 5)}>
                            <ListItemIcon>
                                <PhoneInTalkIcon />
                            </ListItemIcon>
                            <ListItemText primary="Hõ Trợ" />
                        </ListItemButton>
                    </List>
                </div>
                <div className='top-bar'>
                    <div className='create-order'>
                        <div className='top'>
                            <div>Hành Động Nhanh</div>
                            <KeyboardArrowDownIcon />
                        </div>
                        <div className='mid'>
                            <Button size="small" variant="text"><AddBoxIcon />Tạo đơn</Button>
                            <Button size="small" variant="text"><UploadFileIcon />Tạo đơn Excel</Button>
                        </div>
                        <div className='bottom'>
                            <Button size="small" variant="text" onClick={() => setShowCreateOrderWorld(true)}><PublicIcon />Tạo đơn hàng quốc tế</Button>
                            <CreateOrderWorld />
                        </div>
                    </div>
                    <div className='fasst-analyze'>
                        <div className='total'>
                            <div className='icon'>
                                <DocumentScannerIcon />
                            </div>
                            <div className='text'>
                                <div>Đang xử lý</div>
                                <div>1</div>
                            </div>
                        </div>
                        <div className='process'>
                            <div className='icon'>
                                <StarIcon />
                            </div>
                            <div className='text'>
                                <div>Đơn đang giao</div>
                                <div>1</div>
                            </div>
                        </div>
                        <div className='doi-doi-soat'>
                            <div className='icon'>
                                <AccountBalanceWalletIcon />
                            </div>
                            <div className='text'>
                                <div>Đợi đối soát</div>
                                <div>đ 1</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu;