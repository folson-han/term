import React, { FC } from "react";
import { Calendar } from "antd";
import css from "./headway.module.less";

const Headway: FC = () => {
    function dateCellRender(value: any) {
        console.log(value.month() + "月" + value.date() + "日");
        return (
            <ul className="events">
                {
                    null
                }
            </ul>
        );
    }

    function headerRender(HeaderRender: any){
        return null;
    }

    return <div className={css.headway}>
        <Calendar dateCellRender={dateCellRender} headerRender={headerRender} />
    </div>
}

export default Headway;
