import * as s from './HeaderSC'
import useAuth from '../../hooks/useAuth';
import Text from '../text/Text';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../states/atom';
import UserApi from '../../api/UserApi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const auth = useAuth();
    const [userInfo,setUserInfo] = useAtom(userAtom);
    useEffect(() => {
        auth.check();
    }, []);
    const userApi = UserApi();
    const navigate = useNavigate();

    const logout = async() => {
        console.log('클릭');
        const res = await userApi.logout();
        if(res.status === 200 ) {
            const {resCd} = res.data;
            if(resCd === 200) {
                setUserInfo({});
                navigate('/login');
            }
        }
    }

    return (
        <>
            <s.Container>
                <s.TitleBox>
                    <Text fontSize={'18px'} color={'white'} fontWeight={'900'}>WebChat</Text>
                </s.TitleBox>
                <s.UserBtnBox>
                    {userInfo && 
                        <Text fontSize={'16px'} color={'white'} fontWeight={'300'} onClick={() => logout()}>
                            로그아웃
                        </Text>   
                    }
                </s.UserBtnBox>
                
            </s.Container>
        </>
    );
}
export default Header;