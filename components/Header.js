import styles from '../styles/components/Header.module.css'
import React, {useState, useEffect} from 'react';
import Router from 'next/router'
import Link from 'next/link'
import {Row, Col, Menu} from 'antd'
import {
    HomeOutlined,
    SmileOutlined,
    YoutubeOutlined
} from '@ant-design/icons';


const Header = () => {

    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }
    }


    return(
        <div className={styles.header}>
        <Row type="flex" justify="center">
            <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className={styles.header_logo}>
                    <Link href={{pathname:'/'}}>
                        <a>Magician</a>
                    </Link>
                </span>
                <span className={styles.header_txt}>正在学习前端的菜旺一名。</span>
            </Col>
    
            <Col className={styles.memu_div} xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu  
                    mode="horizontal"
                    onClick={handleClick}
                    >
                    <Menu.Item key="2">
                        < HomeOutlined />逼逼叨
                    </Menu.Item>
                    <Menu.Item key="1">
                        <YoutubeOutlined />上好佳✦视频
                    </Menu.Item>
                    <Menu.Item key="3">
                        <SmileOutlined/>碎碎念
                    </Menu.Item>    
                </Menu>
            </Col>
        </Row>
    </div>
    )
}

export default Header
