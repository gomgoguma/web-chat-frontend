import s from "./LoginSC";
import React, { useState } from 'react';
import userApi from '../../../api/UserApi';
import { useNavigate } from "react-router-dom";
import Text from "../../../common/text/Text";


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
        if(res.status === 200) {
            if(res.data.resCd === 200) {
                navigate('/');
            }
            else {
                alert(res.data.resMsg);
            }
        }
        else {
            alert('오류가 발생했습니다.');
        }
    }

    return (
        <s.Container>
            <s.LoginBox> 
                <s.InputRow>
                    <Text fontSize={'16px'}>아이디</Text>
                    <s.InputElement type="username" onChange={changeUsername}/>
                </s.InputRow>
                <s.InputRow>
                    <Text fontSize={'16px'}>패스워드 </Text>
                    <s.InputElement type="password" onChange={changePassword}/>
                </s.InputRow>
                <s.LoginButton onClick={searchUser}>
                    <Text fontSize={'16px'}> 로그인 </Text>
                </s.LoginButton>
                <s.LoginButton>
                    <Text fontSize={'16px'}> 회원가입 </Text>
                </s.LoginButton>
            </s.LoginBox>
        </s.Container>
    );
}

export default Login;