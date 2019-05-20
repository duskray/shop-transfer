import React, { useState, useEffect } from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Button} from 'antd'
import success from 'assets/success.png'

export default (props) => {
  const { history } = props
  const [timer, setTimer] = useState(3)

  useEffect(() => {
    const int = setInterval(() => {
      if (timer === 1) {
        history.push('/')
        return
      }
      setTimer(timer - 1)
    }, 1000)
    return () => {
      clearInterval(int)
    }
  })

  return (
    <section>
      <Header />
      <div style={{ textAlign: 'center', padding: '64px 0 120px' }}>
        <img src={success} alt="提交成功" style={{ width: 78, marginBottom: 32 }} />
        <div style={{ marginBottom: 4, fontSize: '16px', fontWeight: 500 }}>提交成功</div>
        <div style={{ marginBottom: 16 }}>内容您的专属顾问会很快与您联系，请耐心等待~</div>
        <div style={{ marginBottom: 24 }}><span>{timer}</span>秒后返回首页</div>
        <Button type="primary" onClick={e => history.push('/')}>返回首页</Button>
      </div>

      <Footer />
    </section>
  )
}

