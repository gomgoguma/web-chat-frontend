import userApi from '../user/UserApi';
import { useEffect } from 'react';

const getUsers = async() => {
    const res = await userApi.getUsers();
    console.log(res);
}

const Main = () => {
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