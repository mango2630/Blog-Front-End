import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {
    CalendarOutlined,
    FolderOpenOutlined,
    FireOutlined
} from '@ant-design/icons';
import {Row, Col, List, Breadcrumb} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import styles from '../styles/pages/List.module.css'

const Lists = (list) => {
    
    const [ mylist , setMylist ] = useState(list.data);
    useEffect(()=>{
        setMylist(list.data)
    })

    console.log('list: ', list.data[0].typeName);
    
    return(
        <>
            <Head>
                <title>List</title>
            </Head>
            <Header />
            <Row className={styles.comm_main} type="flex" justify="center">
                <Col className={styles.comm_left} xs={24} sm={24} md={16} lg={18} xl={14}  >
                <div>
                    <div className={styles.bread_div}>
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>{list.data[0].typeName}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <List 
                        itemLayout="vertical"
                        dataSource={mylist}
                        renderItem={item => (
                            <List.Item>
                                <div className={styles.list_title}>
                                    <Link href={{pathname:'/detailed', query:{id:item.id}}}> 
                                        <a>{item.title}</a>
                                    </Link>
                                </div>
                                <div className={styles.list_icon}>
                                    <span><CalendarOutlined />{item.addTime}</span>
                                    <span><FolderOpenOutlined />{item.typeName}</span>
                                    <span><FireOutlined />{item.view_count}</span>
                                </div>
                                <div className={styles.list_context}>{item.introduce}</div>  
                            </List.Item>
                        )}
                    />
                </div>
                </Col>

                <Col className={styles.comm_right} xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                </Col>
            </Row>
            <Footer/>
        </>
    )
}

Lists.getInitialProps = async (context)=>{
    let id =context.query.id
    const promise = new Promise((resolve)=>{
        axios(servicePath.getListById+id)
        .then(
            (res)=>resolve(res.data)
        )
    })
    return await promise
}

export default Lists