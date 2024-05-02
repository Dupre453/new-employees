import React from 'react';

import styles from './layout.module.scss'
import {Layout as AntLayout} from "antd";
import {Header} from "../header";

type Props = {
    children: React.ReactNode
}

export const Layout = ({children}: Props) => {
    return (
        <div className={styles.main}>
            <Header/>
            <AntLayout.Content style={{height: "100%", color: "whitesmoke"}}>
                {children}
            </AntLayout.Content>
        </div>
    );
};

