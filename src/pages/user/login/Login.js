import s from "./LoginSC";
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const searchUser = async() => {
        const res = await axios.create ({
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8080'
            },
            withCredentials: true
        })
        .post('http://localhost:8080/api/user/login', {username: username, password: password})
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
        
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