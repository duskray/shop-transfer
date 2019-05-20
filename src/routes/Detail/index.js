import React, { useState, useEffect } from 'react'
import { Header, Footer, Title } from 'components'
import { Button, Input } from 'antd'
import styles from './index.module.scss'
import eye from 'assets/eye.png'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import { detail } from 'services/api'

export default (props) => {

  const [data, setData] = useState({ storeFacilitiesArray: '' })
  useEffect(() => {
    const getData = async () => {
      const d = await detail(props.match.params.id)
      setData(d.content)
    }
    getData()
  }, [props.match.params.id])

  const imgMap = (imgStr) => {
    return imgStr.split(',').map(v => (
      {
        original: v,
        thumbnail: v,
      }
    ))
  }

  const images = [
    {
      original: 'https://via.placeholder.com/880x480',
      thumbnail: 'https://via.placeholder.com/250x150',
    },
    {
      original: 'https://via.placeholder.com/880x480',
      thumbnail: 'https://via.placeholder.com/250x150',
    },
    {
      original: 'https://via.placeholder.com/880x480',
      thumbnail: 'https://via.placeholder.com/250x150',
    },
    {
      original: 'https://via.placeholder.com/880x480',
      thumbnail: 'https://via.placeholder.com/250x150',
    }
  ]

  const attr = { '1': '空铺出租 ', '2': '转让' }
  const facilities = {
    '1': '上水',
    '2': '下水',
    '3': '煤气罐',
    '4': '烟管',
    '5': '排污管',
    '6': '停车位',
    '7': '天然气',
    '8': '外摆区',
    '9': '可明火',
    '10': '380V',
  }


  return (
    <section>
      <Header />
      <div className={styles.bg}>
        <div className={styles.location}>当前位置：商铺转让 > 商铺详情</div>
        <Input className={styles.searchText} placeholder="请输入意向位置，例如：春熙路" />
        <Button type="primary">开始找铺</Button>

        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.title}>{data.name}</div>
            <div>
              <span>铺源上架时间：</span>
              <span className={styles.time}> {data.serverUpdateTime} </span>
              <span>铺源编号：</span>
              <span className={styles.num}>{data.code}</span>


              <div className={styles.eye}>
                <img src={eye} alt="访问" />
                <span>{data.viewCount}</span>
              </div>

            </div>
            <div className={styles.imgs} >
              <ImageGallery items={data.picture ? imgMap(data.picture) : images} showNav={false} showPlayButton={false} showFullscreenButton={false}
              />
            </div>

            <Title>基础信息</Title>
            <div className={styles.baseInfo}>
              <div className={styles.label}>月租金</div>
              <div>{data.rentalPrice ? `${data.rentalPrice / Math.pow(10, 2)}元` : '面议'}</div>
              <div className={styles.label}>转让费</div>
              <div>{data.transferPrice ? `${data.transferPrice / Math.pow(10, 2)}元` : '面议'}</div>
              <div className={styles.label}>物业费</div>
              <div>{data.propertyManagementFee ? `${data.propertyManagementFee / Math.pow(10, 2)}元/月` : '面议'}</div>
              <div className={styles.label}>面积</div>
              <div>{data.houseArea ? `${data.houseArea / Math.pow(10, 6)}㎡` : null}</div>
              <div className={styles.label}>面宽</div>
              <div>{data.facadeWidth ? `${data.facadeWidth / Math.pow(10, 3)}m` : null}</div>
              <div className={styles.label}>进深</div>
              <div>{data.houseHeight ? `${data.houseHeight / Math.pow(10, 3)}m` : null}</div>
              <div className={styles.label}>进深</div>
              <div>{data.houseDepth ? `${data.houseDepth / Math.pow(10, 3)}m` : null}</div>
              <div className={styles.label}>楼层</div>
              <div>
                {
                  data.floor ? `第${data.floor}层` : null
                }
                {
                  data.floorTotal ? ` / 共${data.floorTotal}层` : null
                }
              </div>
              <div className={styles.label}>状态</div>
              <div>{attr[data.leaseAttrsArray]}</div>
              <div className={styles.label}>起租期</div>
              <div>{data.leasePeriod ? `${data.leasePeriod}个月` : null}</div>
              <div className={styles.label}>人群</div>
              <div>{}</div>
              <div className={styles.label}>押付</div>
              <div>
                {
                  data.depositMonth ? `押${data.depositMonth}` : null
                }
                {
                  data.paymentMonth ? `付${data.paymentMonth}` : null
                }
              </div>
              <div className={styles.label}>地址</div>
              <div>{data.address}</div>
              <div className={styles.label}>免租期</div>
              <div>{data.exemptionRentalMonth ? `${data.exemptionRentalMonth}个月` : null}</div>
              <div className={styles.label}>是否临街</div>
              <div>{data.storefrontFlag ? '是' : '否'}</div>
            </div>
            <Title>配套设施</Title>
            <div className={styles.facilities}>
              {
                data.storeFacilitiesArray ?
                  data.storeFacilitiesArray.split(',').map(v => (
                    <div key={v}>
                      <img src={require(`assets/icon${v}.png`)} alt="设施" />
                      <div>
                        {facilities[v]}
                      </div>
                    </div>
                  ))
                  : null
              }
            </div>
            <Title>铺源描述</Title>
            <div className={styles.des}>
              <div>
                <img src={data.storeBossHead} alt="" />
                {data.storeBossName}
              </div>
              <div className={styles.desText}>
                {data.storeBrief}
              </div>
            </div>

          </div>
          <div className={styles.aside}>
            <div className={styles.title}>服务顾问</div>
            {
              [1, 2].map(v => (
                <div className={styles.server} key={v}>
                  <img src="https://via.placeholder.com/74x74" alt="服务顾问" />
                  <div>
                    <div className={styles.serverName}>陈潇潇</div>
                    <div className={styles.serverInfo}>
                      <div>
                        <div>工号：</div>
                        <div>QQ：</div>
                        <div>电话：</div>
                      </div>
                      <div>
                        <div>2045</div>
                        <div>289212009</div>
                        <div>13790802030</div>
                      </div>
                    </div>
                    <Button onClick={e => props.history.push('/find')} className={styles.btnServer} size="small">开始咨询</Button>
                  </div>
                  <div className={styles.score}>
                    4.6分
                  </div>
                </div>
              ))
            }
            <Button type="primary" className={styles.btnFind} onClick={e => props.history.push('/find')}>立即预定</Button>
            <Button type="primary" className={styles.btnFind} onClick={e => props.history.push('/find')}>定制找铺</Button>
          </div>
        </div>
      </div>


      <Footer />
    </section>
  )
}

