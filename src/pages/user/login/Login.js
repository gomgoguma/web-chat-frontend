import s from "./LoginSC";
import React, { useState } from 'react';
import userApi from '../UserApi';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const searchUser = async() => {
        const res = await userApi.login({username: username, password: password});
        if(res?.status === 200) {
            alert(res.data);
            navigate('/');
        }
        else {
            alert(res.response.data);
        }
    }

    return (
        <s.Container>
            <s.LoginBox> 
                <s.InputRow>
                    아이디 <s.InputElement type="username" onChange={changeUsername}/>
                </s.InputRow>
                <s.InputRow>
                    패스워드 <s.InputElement type="password" onChange={changePassword}/>
                </s.InputRow>
                <s.LoginButton onClick={searchUser}>
                    로그인
                </s.LoginButton>
            </s.LoginBox>
        </s.Container>
    );
}

export default Login;