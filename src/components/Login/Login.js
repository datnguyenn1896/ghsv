import { useState } from "react"
import { Navigate } from "react-router-dom";
import logo from '../../assets/img/logo.png'
import './Login.scss'
import { postLogin } from "../services/apiServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Typography, OutlinedInput, Input, InputAdornment, Button, ButtonBase, ImageList, Avatar, TextField, Box, Paper } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const theme = createTheme({
    typography: {
        h3: {
            fontSize: '32px',
            color: '#19488D'
        },
        h4: {
            fontSize: '16px',
            color: '#8297B6'
        },
        button: {
            fontSize: '15px',
            textTransform: 'none'
        },
        grid: {
            width: '500px'
        }
    },
});

// theme.typography.h3 = {
//     fontSize: '32px',
//     '@media (min-width:600px)': {
//         fontSize: '1.5rem',
//     },
//     [theme.breakpoints.up('md')]: {
//         fontSize: '2.4rem',
//     },
// };


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Gọi API để xác thực tài khoản người dùng và lưu trữ thông tin đăng nhập
        try {
            let res = await postLogin(username, password)
            dispatch({
                type: 'FETCH_USER_LOGIN_SUCCESS',
                payload: res
            })
            toast.success("Đăng Nhập Thành Công")
            setTimeout(() => setLoggedIn(true), 4000)
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            Navigate("/dashboard")
        } catch (e) {
            toast.error(e.response.data.msg)
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                {isLoggedIn && (
                    <Navigate to="/dashboard" replace={true} />
                )}
                <Grid container justifyContent="center" alignItems="center" direction="column" sx={{ height: '100vh', background: '#f2f6ff' }}>
                    <img src={logo} alt='logo' style={{ width: '200px' }}></img>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 3,
                                width: 450,
                                height: 400,
                            },
                            background: '#f2f6ff',
                        }}
                    >
                        <Paper elevation={3} sx={{ borderRadius: '10px', padding: '32px' }}>
                            <Typography align="center" variant="h3">Mừng Trở Lại</Typography>
                            <Typography align="center" variant="h4" sx={{ marginTop: '12px', marginBottom: '32px' }}>Đối tác giao hàng số 1 Việt Nam</Typography>
                            <form onSubmit={handleSubmit}>
                                <OutlinedInput
                                    placeholder="Tên đăng nhập"
                                    required
                                    id="username"
                                    name="username"
                                    sx={{ width: '100%' }}
                                    onChange={(event) => setUsername(event.target.value)} startAdornment={
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    } />
                                <OutlinedInput
                                    placeholder="Mật khẩu"
                                    required id="password"
                                    name="password"
                                    fullWidth={true}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    } />
                                <Button color="success" >Quên mật khẩu</Button>
                                <Button type="submit" variant="contained" fullWidth={true}>Đăng nhập</Button>
                                <Button variant="outlined" fullWidth={true}>Tạo tài khoản</Button>
                            </form>
                        </Paper>
                    </Box>
                </Grid>
                {/*                 
                <Grid container justify="center" alignItems="center" direction="column" sx={{ height: '100vh', background: '#f2f6ff' }}>
                    <Avatar variant='square' src={logo} alt="logo" sx={{ width: 250, height: 250 }}></Avatar>
                    <Grid justify="center" alignItems="center" direction="column">
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h3">Mừng Trở Lại</Typography>
                            <Typography variant="h4">Đối tác giao hàng số 1 Việt Nam</Typography>
                            <OutlinedInput placeholder="Tên đăng nhập" required id="username" name="username" onChange={(event) => setUsername(event.target.value)} startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            } />
                            <OutlinedInput placeholder="Mật khẩu" required id="password" name="password" startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            } />
                            <Button color="success">Quên mật khẩu</Button>
                            <Button type="submit" variant="contained">Đăng nhập</Button>
                            <Button variant="outlined">Tạo tài khoản</Button>
                        </form>
                    </Grid>
                </Grid> */}


                {/* <div className="login-container">
                <div className="login-header">
                    <img src={logo} alt='logo'></img>
                </div>
                <form className='content-form col-4 mx-auto'>
                    <div className="title">Mừng Trở Lại</div>
                    <span>Đối tác giao hàng số 1 Việt Nam</span>
                    <div className="form-group">
                        <input
                            type={"username"}
                            className="form-control"
                            placeholder="Tài Khoản"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => something(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type={"password"}
                            className="form-control"
                            placeholder="Mật Khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => something(e)}
                            required
                        />
                    </div>
                    <div className="forgot-password">
                        Quên mật khẩu
                    </div>
                    <input className="btn-login" type='submit' value='Đăng Nhập' onClick={() => handleLogin()}>
                    </input>
                    <div className="btn-signup">
                        <button>Tạo Tài Khoản</button>
                    </div>

                </form>
                <div className="login-footer">
                    <span>&#9745; Một sản phẩm của SVTech.</span>
                    <div>
                        <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png?hl=vi" alt="android"></img>
                        <img src="https://www.constructionplusasia.com/wp-content/uploads/2020/01/Logo-app-store-e1578969798171-300x95.png" alt="ios"></img>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div> */}
            </div>
        </ThemeProvider >

    )
}

export default Login;