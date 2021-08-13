import '../styles/components/Advert.module.css'
import Image from 'next/image'
import portrait from '../styles/portrait.jpg'
import styles from '../styles/components/Advert.module.css'

const Advert = ()=>{
    return (
        <div className={styles.ad_div, styles.comm_box}>
            <div className={styles.ad}></div>
        </div>

    )
}

export default Advert