import axios from 'axios';
import {ServerAddr} from './Server';
import { useAtom } from 'jotai';
import { accessTokenAtom } from '../states/atom';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateApi  = ({resource, requireAuth, requireCredentials}) => {
    const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
    const navigate = useNavigate();

    let headers = {
        'Content-Type': 'application/json'
    }

    if(requireAuth) {
        headers['Authorization'] = accessToken;
    }

    let api = axios.create({
        baseURL: `${ServerAddr}/api/${resource}`,
        withCredentials: requireCredentials || false,
        headers: headers,
    });
    

    // TO-DO : 같은 화면에서 동시에 여러 api 호출할 때 한 번만 실행되도록 개선
    api.interceptors.response.use(
        async (res) => {
            const {resCd, resMsg} = res.data;
            if(resCd === 200) {
                return res;
            }
            
            // TO-DO : resCd 등으로 수정
            if(resMsg === '만료된 토큰입니다.' || resMsg === '토큰이 없습니다.') { 
                const refreshApi = axios.create({
                    baseURL: `${ServerAddr}/api/user`,
                    withCredentials: true,
                    headers: headers,
                });

                try {
                    const refreshRes = await refreshApi.post('/refresh');
                    if(refreshRes.status === 200) {
                        const {resCd, data} = refreshRes.data;
                        if(resCd === 200) {
                            setAccessToken(data);
            
                            let resConfig = res.config;
                            resConfig.headers.Authorization = data;

                            const retryRes = await axios(res.config);
                            if(retryRes.status === 200) {
                                return retryRes;
                            }
                        }
                        else {
                            throw new Error('세션 만료');
                        }
                    }
                } catch (err) {
                    navigate('/login');
                    alert('세션 만료');
                }
               
            }
            return res;
        }
    );

    return api;
}


export default CreateApi;