import { styled } from "styled-components";

export const Button = styled.button`
    width: ${props => props.width};
    height: ${props => props.height};
    margin: ${props => props.margin || '0 0 0 0'};
    background-color: ${props => props.backgroundColor || 'transparent'};
    border: 1px solid #bbb;
    
    &:hover {
        border: 1px solid #333;
    }
    &:disabled {
        border: 1px solid #eee;
        span {
            color: #ddd;
        }
    }
    border-radius: 5px;
`;