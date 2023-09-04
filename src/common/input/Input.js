import * as s from "./InputSC"

const Input = (props) => {
    return (
        <s.Input width={props.width} height={props.height} type={props.type} placeholder={props.placeholder} onChange={props.onChange}/>
    )
}

export default Input;