import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../states/atom";
import { useAtom } from "jotai";
import UserApi from "../api/UserApi";

const useAuth = () => {
    const [, setUserInfo] = useAtom(userAtom);
    const navigate = useNavigate();
    const userApi = UserApi();

    const check = async() => {
        const res = await userApi.check();
        if(res.status === 200) {
            const {resCd, resMsg, data} = res.data;
            if(resCd === 200) {
                setUserInfo(data);
                console.log('userInfo', data);
            }
            else {
                if(resMsg === '토큰이 없습니다.') {
                    alert('로그인 후 이용해주세요.');
                }
                else {
                    alert('세션이 만료되었습니다');
                }
                navigate("/login");
            }
            
        }
        else {
            navigate("/login");
            alert('오류가 발생했습니다.');
        }
    } 

    return { check };
}

export default useAuth;