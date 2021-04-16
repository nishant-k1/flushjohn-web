import styles from '../styles/Layout.module.css'

const Layout = ({children}) => {
  return (
    <div className={styles.main}>
      {children}
    </div>
  )
}

export default Layout
