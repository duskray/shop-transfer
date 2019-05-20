import React, { useState, useEffect } from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Button, Input } from 'antd'
import styles from './index.module.scss'
import { contactAdd } from 'services/api'
import to from 'utils/to'

export default (props) => {
  const [tel, setTel] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {
    if (props.location.state) {
      setTel(props.location.state.tel)
    }
  }, [])

  const onTelChange = (e) => {
    const { value } = e.target;
    const reg = /^[0-9]*$/
    if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
      setTel(value)
    }
  }

  const onSubmit = async () => {
    const reg = /^1(3|4|5|7|8)\d{9}$/
    const test = reg.test(tel)
    if (!test) {
      setHasError(!test)
      return
    }
    setLoading(true)
    const [err] = await to(contactAdd({
      tel,
      type: 1,
    }))
    setLoading(false)
    if (!err) {
      props.history.push('/success')
    }
  }

  return (
    <section>
      <Header />
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div>最近30天 <span>524</span> 位开店人</div>
            <div>在云易店找到满意店铺</div>
            <div>云易店用户平均 <span>21</span> 天成功选址</div>
          </div>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>委托快速找铺</div>
            <div className={styles.modalSub}>已有15000人成功找铺</div>
            <Input
              placeholder="请输入手机号，专属顾问5分钟与您联系"
              onChange={onTelChange}
              value={tel}
              maxLength={11}
            />
            <div className={styles.error}>
              {
                hasError ? '*请输入正确的手机号码' : ''
              }

            </div>
            <Button type="primary" loading={loading} onClick={onSubmit} className={styles.btnSubmit}>提交</Button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}

