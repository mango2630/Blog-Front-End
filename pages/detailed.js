import axios from 'axios'
import Head from 'next/head'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import 'markdown-navbar/dist/navbar.css';
import {Row, Col, Breadcrumb, Affix} from 'antd'
import {
    CalendarOutlined,
    FolderOpenOutlined,
    FireOutlined
} from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import  servicePath  from '../config/apiUrl'
import styles from '../styles/pages/Detailed.module.css'

const Detailed = (props) =>{
    
    console.log('detialed_props', props);

    const renderer = new marked.Renderer();
    const tocify = new Tocify()
    renderer.heading = function(text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

    marked.setOptions({
        renderer: renderer, 
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
                return hljs.highlightAuto(code).value;
        }
    }); 

    let html = marked(props.article_content) 
    // let html = 'da';
        
    return (
        <>
            <Head>
                <title>博客详细页</title>
            </Head>
            <Header />
            <Row className={styles.comm_main} type="flex" justify="center">
                <Col className={styles.comm_left} xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <div className={styles.bread_div}>
                            <Breadcrumb>
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <div>
                            <div className={styles.detailed_title}>
                                React实战视频教程-技术胖Blog开发(更新08集)
                            </div>
                            <div className={styles.list_icon}>
                                <span><CalendarOutlined />{props.addTime}</span>
                                <span><FolderOpenOutlined />{props.typeName}</span>
                                <span><FireOutlined />{props.view_count}</span>
                            </div>
                            <div className={styles.detailed_content}
                                dangerouslySetInnerHTML={{__html:html}}
                            >
                                
                            </div>
                        </div>
                    </div>
                </Col>

                <Col className={styles.comm_right} xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                
                    <Affix offsetTop={5}>
                        <div className={styles.detailed_nav, styles.comm_box}>
                            <div className={styles.nav_title}>文章目录</div>
                            <div className={styles.toc_list}>
                                {tocify && tocify.render()}
                            </div>
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer/>
        </>
    )
}

Detailed.getInitialProps = async(context)=>{

    console.log('context.query.id:', context.query.id);

    let id =context.query.id
    const promise = new Promise((resolve)=>{
        axios(servicePath.getArticleById+id)
        .then(
            (res)=>{
                console.log('getArticleById : ',res)
                resolve(res.data.data[0])
            }
        )
    })

    return await promise
}

export default Detailed