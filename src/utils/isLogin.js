const isLogin = () => {
    if(localStorage.getItem("session_id")){
        return true;
    }
    else return false;
}

export default isLogin;