import React, { FC } from "react";
import css from "./Demand.module.less";
import { blue, red, orange, yellow } from "@ant-design/colors";

const Demand: FC = () => {
    return <>
        <div className={css.demand}>
            <div className={css.item}>
                <div className={css.title}>
                    <span style={{ background: red.primary }}>待修复</span>
                    <span>10</span>
                </div>
                <div className={css.repair}>

                </div>
            </div>
            <div className={css.item}>
                <div className={css.title}>
                    <span style={{ background: yellow.primary }}>待检验</span>
                    <span>10</span>
                </div>
                <div className={css.test}>

                </div>
            </div>
            <div className={css.item}>
                <div className={css.title}>
                    <span style={{ background: orange.primary }}>待复现</span>
                    <span>10</span>
                </div>
                <div className={css.recurrent}>

                </div>
            </div>
            <div className={css.item}>
                <div className={css.title}>
                    <span style={{ background: blue.primary }}>已完成</span>
                    <span>10</span>
                </div>
                <div className={css.fulfil}>

                </div>
            </div>
        </div>
    </>
}

export default Demand;
