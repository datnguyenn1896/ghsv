import { useEffect, useState } from "react";
import { Drawer, Container } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Noti = (props) => {
    const token = useSelector(state => state.user.account.token)
    console.log(token)
    const [state, setState] = useState({ right: true });

    const navigate = useNavigate();

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        props.setShowNoti(false)
        setState({ ...state, [anchor]: open });
    };

    const handleClose = () => {
        props.setShowNoti(false)
        setState(false);
    };

    const Notifications = async () => {
        let url = 'https://khachhang.ghsv.vn/v2/api/models/app/query/notifications.php?act=list&page=1'
        // if (token) url += '?remote_dev=8'
        // const res = await fetch(url, {
        //     method: 'GET'
        // })
        // const resj = await res.json()
        // if (res.ok) {
        //     console.log(token)
        // } else {
        //     navigate("/login")
        // }
    }

    useEffect(() => {
        Notifications()
    })

    return (
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
            <Container>
                {/* <NotificationsIcon></NotificationsIcon> */}
                <Box display="flex" padding="0px" justifyContent="space-between" alignItems="center" height={64} position="sticky" top={0} bgcolor="#fff" zIndex={1}>
                    <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}><NotificationsIcon fill="inherit" style={{ marginRight: 5 }} /> Thông Báo</Typography>
                    <IconButton type="button" onClick={toggleDrawer('right', false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box>

                </Box>
            </Container>
        </Drawer>
    )
}

export default Noti;