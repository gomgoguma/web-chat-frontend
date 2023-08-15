import { styled } from "styled-components";

export const Text = styled.span`
    font-size: ${props => props.fontSize || '16px'};
    color: ${props =>  props.color || 'black'};
    font-family: 'HakgyoansimWoojuR', sans-serif;
    font-weight: ${props => props.fontWeight || '100'};
    margin: ${props => props.margin || '0 0 0 0'};
    
    @font-face {
        font-family: 'HakgyoansimWoojuR';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimWoojuR.woff2') format('woff2');
        font-style: normal;
    }
`;