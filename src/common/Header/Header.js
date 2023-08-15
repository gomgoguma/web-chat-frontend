import s from './HeaderSC'
import useAuth from '../../hooks/useAuth';
import Text from '../text/Text';

const Header = () => {
    useAuth();
    return (
        <>
            <s.Container>
                <Text fontSize={'18px'} color={'white'} fontWeight={'900'}>WebChat</Text>
            </s.Container>
        </>
    );
}
export default Header;