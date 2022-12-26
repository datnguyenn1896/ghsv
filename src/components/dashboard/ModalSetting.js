import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import './ModalSetting.scss'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useSelector } from "react-redux";
import Autocomplete from '@mui/material/Autocomplete';


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, width: '440px' }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
};


const ModalSetting = (props) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [banks, setBanks] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.setShowModalSetting(false)
        setOpen(false);
    };

    const token = useSelector(state => state.user.account.token)
    const handleUpdateBank = async () => {
        let url = 'https://khachhang.ghsv.vn/v2/api/models/app/bank.php'
        if (token) url += '?remote_dev=8'
        const res = await fetch(url, {
            method: 'GET'
        })
        const resj = await res.json()
        // console.log(resj)
        if (res.ok) {
            setBanks(resj.banks)
            console.log(banks)
        } else {
            // handle logout
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className='modal-setting'>
                <div className='header' >
                    <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {'Thông tin tài khoản'}
                        <IconButton color="inherit" onClick={handleClose}><CloseIcon /></IconButton>
                    </DialogTitle>

                </div>
                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.paper',
                        display: 'flex',
                        height: 400,
                    }}
                >
                    <Tabs
                        orientation="vertical"
                        // variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', display: 'flex', width: '160px' }}
                    >
                        <Tab label="Tài Khoản" {...a11yProps(0)} />
                        <Tab label="Tích Hợp" {...a11yProps(1)} />
                        <Tab label="Ngân Hàng" onClick={handleUpdateBank} {...a11yProps(2)} />
                        <Tab label="Cài Đặt" {...a11yProps(3)} disabled={true} />
                        <Tab label="Mật Khẩu" {...a11yProps(4)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <TextField id="username" label="Tên đăng nhập" variant="standard" defaultValue={props.username} disabled={true} sx={{ width: '100%', marginBottom: '20px' }} />
                        <TextField id="phone" label="Số điện thoại" variant="standard" defaultValue={props.customer_phone} disabled={true} sx={{ width: '100%', marginBottom: '20px' }} />
                        <TextField id="nameshop" label="Tên Shop" variant="standard" defaultValue={props.customer_shop_name} sx={{ width: '100%', marginBottom: '20px' }} />
                        <TextField id="email" label="Email" variant="standard" defaultValue={props.customer_email} sx={{ width: '100%', marginBottom: '20px' }} />
                        <List sx={{ position: 'absolute', bottom: '24px', right: '24px' }}>
                            <Button variant="text" color="inherit" sx={{ marginRight: '5px' }} onClick={handleClose}>Đóng</Button>
                            <Button variant="contained">Cập Nhập</Button>
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={1} sx={{ height: '100%' }}>
                        <Alert severity="info">Token dùng để kết nối <b>phần mềm bán hàng</b> hoặc tích hợp vào <b>website của bạn</b>.</Alert>
                        <TextField id="outlined-basic" label="Token của bạn" variant="outlined" disabled={true} sx={{ width: '100%', marginTop: '20px', marginBottom: '20px' }} />
                        <List sx={{ position: 'absolute', bottom: '24px', right: '24px' }}>
                            <Button variant="text" color="inherit" sx={{ marginRight: '5px' }} onClick={handleClose}>Đóng</Button>
                            <Button variant="contained">Tạo Mã Mới</Button>
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Autocomplete
                            options={banks.map((e) => {
                                e.label = e.code + ' - ' + e.name.replace(/Ngân hàng\s*/ig, '')
                                return {
                                    name: e.name,
                                    label: e.label
                                }
                            })}
                            getOptionLabel={option => (option.label ? option.label : "")}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            value={props.customer_name_bank}
                            id="disable-close-on-select"
                            renderInput={(params) => (
                                <TextField {...params} label="Tên ngân hàng *" variant="standard" />
                            )}
                        />


                        <TextField id="customer_number_bank" label="Số tài khoản *" variant="standard" defaultValue={props.customer_number_bank} sx={{ width: '100%', marginBottom: '20px' }} />
                        <TextField id="customer_id_bank" label="Chủ tài khoản *" variant="standard" defaultValue={props.customer_id_bank} sx={{ width: '100%', marginBottom: '20px' }} />
                        <TextField id="otp" label="Mã xác nhận gửi về tài khoản *" variant="standard" defaultValue='' sx={{ width: '100%', marginBottom: '20px' }} />
                        <List sx={{ position: 'absolute', bottom: '24px', right: '24px' }}>
                            <Button variant="text" color="inherit" sx={{ marginRight: '5px' }} onClick={handleClose}>Đóng</Button>
                            <Button variant="contained">Cập Nhập</Button>
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item Four
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Alert severity="info" sx={{ width: '100%', marginBottom: '20px' }}>Sau khi đổi mật khẩu, bạn sẽ đăng xuất.</Alert>
                        <TextField id="old-pass" label="Mật khẩu cũ *" variant="standard" defaultValue='' sx={{ width: '100%', marginBottom: '20px' }} />
                        <TextField id="new-pass" label="Mật khẩu mới *" variant="standard" defaultValue='' sx={{ width: '100%', marginBottom: '20px' }} />
                        <TextField id="renew-pass" label="Nhập lại mật khẩu mới *" variant="standard" defaultValue='' sx={{ width: '100%', marginBottom: '20px' }} />
                        <List sx={{ position: 'absolute', bottom: '24px', right: '24px' }}>
                            <Button variant="text" color="inherit" sx={{ marginRight: '5px' }} onClick={handleClose}>Đóng</Button>
                            <Button variant="contained">Cập Nhập</Button>
                        </List>
                    </TabPanel>
                </Box>
            </div>
        </Dialog>
    );
};

export default ModalSetting;