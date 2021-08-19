import React, { FC, useState } from "react";
import { cloneDeep } from "lodash";

interface HoverState {
    style?: any;
}

const Hover: FC<HoverState> = (props) => {
    const [status, setStatus] = useState<boolean>(false);
    const style = cloneDeep(props.style);

    return <>
        <div style={status ? Object.assign(style, { border: "1px solid #1890ff" }) : props.style} onMouseEnter={() => { setStatus(true); }} onMouseLeave={() => { setStatus(false); }}>
            { props.children }
        </div>
    </>
}

export default Hover;
