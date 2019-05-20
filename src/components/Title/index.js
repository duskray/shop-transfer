import React from 'react';
import styles from './index.module.scss'
import PropTypes from 'prop-types'

const Title = (props) => {
  return (
    <div className={styles.blueTitle}>
      <div className={styles.blueBlock}></div>
      <div className={styles.main}>
        {
          props.children
        }
      </div>
      <div className={styles.sub}>
        {
          props.sub
        }
      </div>
    </div>
  )
}

Title.propTypes = {
  children: PropTypes.node,
  sub: PropTypes.element,
}

export default Title