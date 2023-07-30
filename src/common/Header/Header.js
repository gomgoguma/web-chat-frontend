import s from './HeaderSC'
import useAuth from '../../hooks/useAuth';

const Header = () => {
    useAuth();
    return (
        <>
            <s.Container>
                WebChat
            </s.Container>
        </>
    );
}
export default Header;