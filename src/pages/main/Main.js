import s from './MainSC';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import SideMenu from '../../common/SideMenu/SideMenu';
import Header from '../../common/Header/Header';

const Main = () => {
    const userInfo = useAuth();

    return (
        <>
            <Header />
            <s.Container>
                <SideMenu />
                <s.Content>
                    
                </s.Content>
            </s.Container>
            
        </>
    );
}

export default Main;