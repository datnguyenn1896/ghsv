import * as React from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import './Header.scss'
import logo from '../../assets/img/logo2.png'
import { useSelector, useDispatch } from "react-redux";
import { FaUserFriends, FaFacebookMessenger } from 'react-icons/fa';
import { IoNotificationsSharp } from 'react-icons/io5';
import { BiChevronDown } from "react-icons/bi";
import { AiFillChrome } from "react-icons/ai";
import { FaPhoneVolume, FaUserAlt } from "react-icons/fa";
import { AiFillMail, AiOutlineSetting } from "react-icons/ai";
import { MdLogout, MdImage } from "react-icons/md";
import { useState, useEffect } from "react";
import { Popover, Alert, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ModalSetting from './ModalSetting.js'
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddUser from '../ModalUser/AddUser';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Noti from './Noti.js';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="left" ref={ref} {...props} />;
// });

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

const Header = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const {isShowModalSetting} = props
    const [isShowModalSetting, setShowModalSetting] = useState(false)
    const [customer_shop_name, setCustomer_shop_name] = useState()
    const [customer_phone, setCustomer_phone] = useState()
    const [customer_email, setCustomer_email] = useState()
    const [customer_id_bank, setCustomer_id_bank] = useState()
    const [customer_number_bank, setCustomer_number_bank] = useState()
    const [customer_name_bank, setCustomer_name_bank] = useState()
    const [username, setUsername] = useState()

    const token = useSelector(state => state.user.account.token)

    const [isShowAddUser, setShowAddUser] = useState(false)
    const [isShowNoti, setShowNoti] = useState(false)

    const [dataAccount, setDataAccount] = useState([])
    const validateUser = async () => {
        let url = 'https://khachhang.ghsv.vn/v2/api/login.php'
        if (token) url += '?remote_dev=8'
        const res = await fetch(url, {
            method: 'POST'
        })
        const resj = await res.json()
        if (res.ok) {
            setCustomer_shop_name(resj.customer_shop_name)
            setCustomer_phone(resj.customer_phone)
            setCustomer_email(resj.customer_email)
            setCustomer_id_bank(resj.customer_id_bank)
            setCustomer_number_bank(resj.customer_number_bank)
            setCustomer_name_bank(resj.customer_name_bank)
            setUsername(resj.username)
        } else {
            // handle logout
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        dispatch({
            type: 'USER_LOGOUT_SUCCESS',
            payload: ''
        })
        navigate("/login")
    }

    const nestedAccount = async () => {
        let url = 'https://khachhang.ghsv.vn/v2/api/models/account/nested_account.php'
        if (token) url += '?remote_dev=8'
        const res = await fetch(url, {
            method: 'GET'
        })
        const resj = await res.json()
        if (res.ok) {
            setDataAccount(resj.data)
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {
        validateUser()
        nestedAccount()
    }, [])

    // open info khách hàng
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // open info khách hàng

    // open all user
    const [state, setState] = React.useState({ right: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    // open all users

    const HandleClickOpenSetting = () => {
        handleClose()
        setShowModalSetting(true)
    }

    return (
        <div className="header-container">
            <div className="logo-title">
                <div className="logo"><AiFillChrome /></div>
                siêu việt express
            </div>
            <div className="input-search">
                <form>
                    <input id="research_order"
                        placeholder="Tra cứu nhanh mã đơn hàng / SĐT">
                    </input>
                    <label className="input-icon-search" htmlFor="research_order"><AiOutlineSearch></AiOutlineSearch></label>
                </form>
            </div>
            <div className="logo-shop">
                <div className='logo'>
                    <img src={logo} alt=""></img>
                </div>

                <div className="info-shop">
                    <span className="customer_full_name" aria-describedby={id} variant="contained" onClick={handleClick}>{customer_shop_name}</span>
                    <div className="down" aria-describedby={id} variant="contained" onClick={handleClick}><BiChevronDown /></div>
                </div>
                <button className="user" onClick={toggleDrawer('right', true)}> <FaUserFriends /></button>
                <button className="mess"><FaFacebookMessenger /></button>
                <button className="noti" onClick={() => setShowNoti(true)}><IoNotificationsSharp /></button>
                {
                    isShowNoti && <Noti setShowNoti={setShowNoti} />
                }
            </div>

            {/* open info khách hàng */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                variant='outlined'
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                PaperProps={{
                    style: {
                        marginTop: 15,
                        paddingTop: 16,
                        paddingRight: 16,
                        paddingLeft: 16,
                        width: 350,
                    }
                }}
            >
                <div className="modal-container">
                    <div className='modal-info'><FaPhoneVolume />{customer_phone}</div>
                    <div className='modal-info'><AiFillMail />{customer_email}</div>
                    <div className='modal-info' ><FaUserAlt /><span style={{ padding: "5px", borderRadius: "5px", backgroundColor: "black", color: "#fff" }}>Tài khoản chính</span></div>
                    <div className='modal-bank-info'>
                        <div className='modal-bank-name'>
                            <div>Bank:</div>
                            <div style={{ textAlign: "right" }}>{customer_name_bank}</div>
                        </div>
                        <div className='modal-bank-id'>
                            <div>Chủ TK:</div>
                            <div>{customer_id_bank}</div>
                        </div>
                        <div className='modal-bank-number'>
                            <div>STK:</div>
                            <div>{customer_number_bank}</div>
                        </div>
                    </div>
                    <div className='modal-root'>
                        <div className='changer-avatar'>
                            <BootstrapTooltip title="Đổi avatar">
                                <div className='icon'><MdImage /></div>
                            </BootstrapTooltip>

                        </div>
                        <div className='setting'>
                            <BootstrapTooltip title="Cài Đặt">
                                <div
                                    className='icon'
                                    onClick={() => HandleClickOpenSetting()}
                                >
                                    <AiOutlineSetting />
                                </div>
                            </BootstrapTooltip>
                        </div>
                        <div className='logout'>
                            <BootstrapTooltip title="Thoát">
                                <div className='icon' onClick={handleLogout}><MdLogout /></div>
                            </BootstrapTooltip>
                        </div>
                    </div>
                </div>
            </Popover>

            {/* hiện user */}
            <Drawer
                anchor="right"
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                // variant='outlined'
                PaperProps={{
                    style: {
                        width: 350,
                    }
                }}
            >
                <div className='user-container'>
                    <div className='user-header'>
                        <div className="user"><AccountCircleIcon />Tài Khoản</div>
                        <BootstrapTooltip title="Thêm">
                            <IconButton aria-label="add" color="inherit" onClick={() => setShowAddUser(true)}>
                                <PersonAddIcon />
                            </IconButton>
                        </BootstrapTooltip>

                        {isShowAddUser &&
                            <AddUser setShowAddUser={setShowAddUser} />
                        }

                        <BootstrapTooltip title="Thoát">
                            <IconButton aria-label="close" color="inherit" onClick={toggleDrawer('right', false)}>
                                <CloseIcon />
                            </IconButton>
                        </BootstrapTooltip>
                    </div>
                    <div className="user-content">
                        <div className="note">
                            <ErrorOutlineIcon sx={{ margin: '5px' }} />Gạt công tắc để ngưng hoạt động.
                        </div>
                        {
                            dataAccount.map((account) => (
                                <div className='main' key={account.id}>

                                    <div className='left'>
                                        <PersonIcon />
                                    </div>
                                    <div className='center'>
                                        <div className='shop-name'>{account.username}</div>
                                        <div className='shop-info'>@{account.username}, {customer_phone}</div>
                                        <Box>
                                            <BootstrapTooltip title="Sửa">
                                                <IconButton aria-label="delete" size="small" >
                                                    <EditIcon fontSize="inherit" color='secondary' sx={{ background: '#BA94D1', borderRadius: '5px' }} />
                                                </IconButton>
                                            </BootstrapTooltip>
                                            <BootstrapTooltip title="Xóa">
                                                <IconButton aria-label="delete" size="small">
                                                    <CloseIcon fontSize="inherit" color='warning' sx={{ background: '#FFA07A', borderRadius: '5px' }} />
                                                </IconButton>
                                            </BootstrapTooltip>
                                            <BootstrapTooltip title="Đăng nhập">
                                                <IconButton aria-label="delete" size="small">
                                                    <LoginIcon fontSize="inherit" color='info' />
                                                </IconButton>
                                            </BootstrapTooltip>

                                        </Box>
                                    </div>
                                    <div className='right'>
                                        <Chip label='0/0' />
                                        <Switch defaultChecked />
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                </div>

            </Drawer>
            {/* hiện user */}
            {
                isShowModalSetting && <ModalSetting
                    setShowModalSetting={setShowModalSetting}
                    username={username}
                    customer_phone={customer_phone}
                    customer_shop_name={customer_shop_name}
                    customer_email={customer_email}
                    customer_id_bank={customer_id_bank}
                    customer_number_bank={customer_number_bank}
                    customer_name_bank={customer_name_bank}
                />
            }
        </div >
    )
}

export default Header;