import styles from './HeaderPage.module.css'

const HeaderPage = ({ title }) => 
  <h1 className={styles.header}>{title}</h1>

export default HeaderPage