import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import { useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import Alert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const AddUser = (props) => {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        props.setShowAddUser(false)
        setOpen(false)
    };
    const token = useSelector(state => state.user.account.token)

    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')


    const something = (event) => {
        if (event.keyCode === 13) {
            handleAddUser()
        }
    }

    const handleAddUser = async () => {
        console.log(phone, email, name, user, pass)
        let formData = new FormData();
        formData.append('customer_phone', phone);
        formData.append('customer_email', email);
        formData.append('user_color', '#cd00ff');
        formData.append('username', user);
        formData.append('password', pass);
        formData.append('shop', name);

        let url = 'https://khachhang.ghsv.vn/v2/api/models/account/nested_account.php'
        if (token) url += '?remote_dev=8'
        const res = await fetch(url, {
            body: formData,
            method: 'POST'
        })
        const resj = await res.json()
        if (res.ok) {
            toast.success("Thêm Thành Công")
        } else {
            toast.error(resj.msg)
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <Typography id="modal-modal-title" variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonAddIcon color='success' sx={{ marginRight: '5px' }} />
                    Thêm tài khoản
                </Typography>
                <TextField id="phone" label="Số điện thoại *" variant="standard" helperText="Không bao gồm +84 ở đầu" onChange={(e) => setPhone(e.target.value)} onKeyDown={(e) => something(e)} sx={{ width: '100%', marginBottom: '5px' }} required />
                <TextField id="email" type='email' label="Email *" variant="standard" onChange={(e) => setEmail(e.target.value)} sx={{ width: '100%', marginBottom: '20px' }} />
                <TextField id="nameshop" label="Tên Hiển Thị *" variant="standard" onChange={(e) => setName(e.target.value)} sx={{ width: '100%', marginBottom: '20px' }} />
                <TextField id="username" label="Tên đăng nhập *" variant="standard" onChange={(e) => setUser(e.target.value)} sx={{ width: '100%', marginBottom: '20px' }} />
                <TextField id="password" type='password' label="Mật Khẩu *" variant="standard" onChange={(e) => setPass(e.target.value)} sx={{ width: '100%', marginBottom: '20px' }} />
                <List sx={{ position: 'absolute', bottom: '24px', right: '24px' }}>
                    <Button variant="text" color="inherit" sx={{ marginRight: '5px' }} onClick={handleClose}>Đóng</Button>
                    <Button variant="contained" onClick={() => handleAddUser()}>Thêm</Button>
                </List>
            </Box>
        </Modal>

    )
}

export default AddUser;