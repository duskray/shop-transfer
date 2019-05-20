import React from 'react';
import styles from './index.module.scss'
import { withRouter } from 'react-router-dom'
import f1 from 'assets/f1.png'
import f2 from 'assets/f2.png'
import f3 from 'assets/f3.png'
import f4 from 'assets/f4.png'
import f5 from 'assets/f5.png'
import tel from 'assets/tel.png'
import msg from 'assets/msg.png'
import weibo from 'assets/weibo.png'
import wechat from 'assets/wechat.png'
import wechatQr from 'assets/qr1.png'
import weiboQr from 'assets/qr2.png'

export default withRouter((props) => {
  return (
    <footer>
      <div className={styles.bgLight}>
        <div className={styles.point}>
          <div>
            <img src={f1} alt="法律安全担保" width="35" />
            法律安全担保
        </div>
          <div>
            <img src={f2} alt="10万+铺源在线" width="45" />
            10万+铺源在线
        </div>
          <div>
            <img src={f3} alt="商铺360°描述" width="40" />
            商铺360°描述
        </div>
          <div>
            <img src={f4} alt="一手保真铺源" width="40" />
            一手保真铺源
        </div>
          <div>
            <img src={f5} alt="一站式服务" width="28" />
            一站式服务
        </div>
        </div>
      </div>
      <div className={styles.bg}>
        <div className={styles.contact}>
          <div>
            <div className={styles.title}>客户服务</div>
            <div className={styles.icons}>
              <div>
                <img src={tel} alt="在线客服" />
              </div>
              <div>
                <img src={msg} alt="问题反馈" />
              </div>
            </div>
            <div className={styles.text}>
              <div>在线客服</div>
              <div>问题反馈</div>
            </div>
          </div>

          <div>
            <div className={styles.title}>关注我们</div>
            <div className={styles.qr}>
              <div>
                <img src={wechatQr} alt="微信" width="80" height="80" />
              </div>
              <div>
                <img src={weiboQr} alt="微博" width="80" height="80" />
              </div>
            </div>
            <div className={styles.weiboIcons}>
              <img src={wechat} alt="微信" />
              <img src={weibo} alt="微博" />
            </div>
          </div>

          <div>
            <div className={styles.title}>商务热线</div>
            <div className={styles.contactNum}>
              400-0000-000
          </div>
            <div>周一至周日 8:00-18:00</div>
            <div>(仅收市话费)</div>
          </div>
        </div>

        <div className={styles.about}>
          <div>关于云易店</div>
          <div>发展历程</div>
          <div>战略伙伴</div>
          <div>网站地图</div>
          <div>帮助中心</div>
        </div>

        <div className={styles.copyright}>
          <div>Copyright &#169 2012-2022 keruyun Inc. All rights reserved.</div>
          <div>京ICP证140166号 | 京ICP备12039470号-1</div>
        </div>
      </div>
    </footer>
  )
})