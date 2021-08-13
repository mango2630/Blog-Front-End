
import {Avatar,Divider} from 'antd'
import styles from '../styles/components/Author.module.css'
import {
    GithubOutlined,
    QqOutlined,
    WechatOutlined
} from '@ant-design/icons';

const Author =()=>{
    return (
        <div className={styles.author_div}>
            <div> 
                <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  />
            </div>
            <div className={styles.author_introduction}>
                “我的简介”。。。。。。。。！
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className={styles.account} />
                <Avatar size={28} icon={<QqOutlined />}   className={styles.account} />
                <Avatar size={28} icon={<WechatOutlined />}  className={styles.account}  />
            </div>
        </div>
    )

}

export default Author