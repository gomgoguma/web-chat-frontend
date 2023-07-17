import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/UserApi";

const useAuth = () => {
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();

    const check = async() => {
        const res = await userApi.check();
        if(res?.status !== 200) {
            if(res?.response?.data?.err === '토큰이 없습니다.') {
                alert('로그인 후 이용해주세요.');
            }
            else {
                alert('세션이 만료되었습니다');
            }

            navigate("/login");
        }
        setUserInfo(res.data);
        console.log('userInfo', res.data);
    } 

    useEffect(()=>{ 
        check();
    },[])

    return { userInfo };
}

export default useAuth;