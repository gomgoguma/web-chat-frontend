import userApi from '../../api/UserApi';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';


const getUsers = async() => {
    const res = await userApi.getUsers();
    console.log(res);
}

const Main = () => {
    const userInfo = useAuth();

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            1234
        </div>
    );
}

export default Main;