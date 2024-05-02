import React from 'react';
import styles from './header.module.scss'
import { Layout, Space, Typography} from "antd";
import {TeamOutlined, UserOutlined} from "@ant-design/icons";
import {MainButton} from "../main-button";
import {Link} from "react-router-dom";
import {Paths} from "../../paths";

export const Header = () => {
    return (
       <Layout.Header className={styles.header}>
           <Space>
               <TeamOutlined className={styles.teamIcon}/>
               <Link to={Paths.home}>
               <MainButton type='ghost'>
                   <Typography.Title level={1}>Сотрудники</Typography.Title>
               </MainButton>
               </Link>
           </Space>
           <Space>
               <Link to={Paths.register}>
                   <MainButton type='ghost' icon={<UserOutlined/>}>Зарегистрировать</MainButton>
               </Link>
               <Link to={Paths.login}>
                   <MainButton type='ghost' icon={<UserOutlined/>}>Войти</MainButton>
               </Link>
           </Space>
       </Layout.Header>
    );
};

