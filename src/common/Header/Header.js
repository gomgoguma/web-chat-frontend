import s from './HeaderSC'
import useAuth from '../../hooks/useAuth';
import Text from '../text/Text';
import { useEffect } from 'react';

const Header = () => {
    const auth = useAuth();
    useEffect(() => {
        auth.check();
    }, []);

    return (
        <>
            <s.Container>
                <Text fontSize={'18px'} color={'white'} fontWeight={'900'}>WebChat</Text>
            </s.Container>
        </>
    );
}
export default Header;