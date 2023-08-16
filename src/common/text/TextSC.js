import { styled } from "styled-components";

export const Text = styled.span`
    font-size: ${props => props.fontSize || '16px'};
    color: ${props =>  props.color || 'black'};
    font-family: 'SUITE-Regular', sans-serif;
    font-weight: ${props => props.fontWeight || '100'};
    margin: ${props => props.margin || '0 0 0 0'};
    
    @font-face {
        font-family: 'SUITE-Regular';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
    }
`;