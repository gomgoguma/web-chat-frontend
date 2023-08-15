import * as s from "./ButtonSC"

const Button = (props) => {
    console.log(console.log(props.disable));
    return (
        <s.Button onClick={props.onClick} disabled={props.disable || false} width={props.width} height={props.height} margin={props.margin} backgroundColor={props.backgroundColor}>
            {props.children}
        </s.Button>
    )
}

export default Button;