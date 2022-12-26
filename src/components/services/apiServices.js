import axios from "axios"

const postLogin = (email, password) => {
    const data = new FormData();
    data.append('username', email);
    data.append('password', password);
    return axios.post(`https://khachhang.ghsv.vn/v2/api/login.php`, data);
}

export { postLogin }