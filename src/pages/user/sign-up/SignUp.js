import s from "./SignUpSC";
import React, { useState } from 'react';
import userApi from '../../../api/UserApi';
import { useNavigate } from "react-router-dom";
import Text from "../../../common/text/Text";
import Input from "../../../common/input/Input";


const SignUp = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }
    const changePassword = (event) => {
        setPassword(event.target.value);
    }
    const changeName = (event) => {
        setName(event.target.value);
    }
    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const signUp = async() => {
        const res = await userApi.signUp(
            {
                username: username, 
                password: password,
                name: name,
                email: email,
            }
        );
        if(res.status === 200) {
            const {resCd, resMsg} = res.data;
            if(resCd === 200) {
                navigate('/login');
            }
            else {
                alert(resMsg);
            }
        }
    }

    return (
        <s.Container>
            <s.SignUpBox> 
                <s.InputRow>
                    <Input width={'100%'} height={'40px'} type="text" onChange={changeUsername} placeholder={"아이디"}/>
                </s.InputRow>
                <s.InputRow>
                    <Input width={'100%'} height={'40px'} type="password" onChange={changePassword} placeholder={"패스워드"}/>
                </s.InputRow>
                <s.InputRow>
                    <Input width={'100%'} height={'40px'} type="text" onChange={changeName} placeholder={"이름"}/>
                </s.InputRow>
                <s.InputRow>
                    <Input width={'100%'} height={'40px'} type="email" onChange={changeEmail} placeholder={"이메일"}/>
                </s.InputRow>
                <s.SignUpButton onClick={signUp}>
                    <Text fontSize={'16px'}> 회원가입 </Text>
                </s.SignUpButton>
                <s.SignUpButton onClick={() => navigate('/login')}>
                    <Text fontSize={'16px'}> 로그인 화면 </Text>
                </s.SignUpButton>
            </s.SignUpBox>
        </s.Container>
    );
}

export default SignUp;