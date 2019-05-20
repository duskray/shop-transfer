import React from 'react';
import styles from './index.module.scss'
import logo from 'assets/logo@3x.png'
import hotline from 'assets/hotline@3x.png'
import { Link, withRouter } from 'react-router-dom'
import classnames from 'classnames'

export default withRouter((props) => {
  const { history } = props
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={logo} alt="Logo" />
      </div>

      <Link className={classnames(styles.navLink, {[styles.active]: history.location.pathname === '/'})} to="/" >首页</Link>
      <Link className={classnames(styles.navLink, {[styles.active]: history.location.pathname === '/find'})}  to="/find" >委托找铺</Link>
      <Link className={classnames(styles.navLink, {[styles.active]: history.location.pathname === '/transfer'})} to="/transfer" >委托转铺</Link>
      <img className={styles.hotline} src={hotline} alt="hotline"></img>
      <div className={styles.tel}>400-631-2626</div>
    </header>
  )
})