import * as s from "./TextSC"

const Text = (props) => {
    return (
        <s.Text fontSize={props.fontSize} color={props.color} fontWeight={props.fontWeight} margin={props.margin}>
            {props.children}
        </s.Text>
    )
}

export default Text;