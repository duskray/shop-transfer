import React, { useState, useEffect } from 'react'
import { Header, Footer, Filter } from 'components'
import { Button, Carousel, Input, Empty } from 'antd'
import styles from './index.module.scss'
import classnames from 'classnames'
import qs from 'qs'
import { search, homeInfo } from 'services/api'

export default (props) => {
  const [searchType, setSearchType] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [tel, setTel] = useState('')
  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState({})
  const [list, setList] = useState([])
  const [info, setInfo] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result = await homeInfo()
      setInfo(result.content)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result = await search({
        page: 1,
        pageSize: 8,
        sortCreateTime: 1,
        ...filter,
      })
      setList(result.content)
      setIsLoading(false)
    }
    fetchData()
  }, [filter])



  const onTelChange = (e) => {
    const { value } = e.target;
    const reg = /^[0-9]*$/
    if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
      setTel(value)
    }
  }

  const onSubmit = (value) => {
    if (searchType === 0) {
      props.history.push('/find', {
        tel: value,
      })
    } else {
      props.history.push('/transfer', {
        tel: value,
      })
    }

  }

  const onFilterChange = (params, state) => {
    const string = qs.stringify(state)
    props.history.push(`/list?${string}`)
  }

  const onLastFilterChange = (params, state) => {
    setFilter(params)
  }

  return (
    <section>
      <Header></Header>
      <div className={styles.carousel}>
        <Carousel>
          <div className={styles.banner}></div>
        </Carousel>
        <div className={styles.bannerTitle}>
          让天下没有难转的店!
          <div className={styles.bannerTitleSub}>
            极速找铺 自助找铺 平均37天开店
          </div>
        </div>
      </div>

      <div className={styles.search}>
        <div className={styles.searchTabs}>
          <div
            className={classnames(styles.searchTab, { [styles.active]: searchType === 0 })}
            onClick={e => setSearchType(0)}
          >找铺</div>
          <div
            className={classnames(styles.searchTab, { [styles.active]: searchType === 1 })}
            onClick={e => setSearchType(1)}
          >转铺</div>
        </div>
        <Input.Search
          placeholder="输入手机号码，马上预约专家服务"
          enterButton="马上帮我找铺"
          size="large"
          className={styles.searchInput}
          onChange={onTelChange}
          value={tel}
          maxLength={11}
          onSearch={onSubmit}
        />
        <div className={styles.text}>
          <span>30</span>
          天已成功帮助开店
          <span>{info.lesseeContactCountByMonth}</span>
          个商铺
        </div>
      </div>

      <div className={styles.gray}>
        <div className={styles.bg}>
          <div className={styles.blueTitle}>
            <div className={styles.blueBlock}></div>
            <div className={styles.main}>自助找铺</div>
            <div className={styles.sub}>收录 <span>68351</span> 个商铺</div>
          </div>
          <Filter onChange={onFilterChange} />
          <Input value={keyword} onChange={e => setKeyword(e.target.value)} className={styles.searchText} placeholder="请输入意向位置，例如：春熙路" />
          <Button type="primary" onClick={e => props.history.push(`/list?keyword=${keyword}`)}>开始找铺</Button>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.top}>
            <div className={styles.title}>
              成都商铺指数
            </div>
            <div onClick={e => props.history.push(`/list`)} className={styles.more}>
              查看更多>
            </div>
          </div>
          <div className={styles.today}>今日行情</div>
          <div className={styles.todayData}><span>{info.lessorStoreCountByDay}</span>套</div>
          <div className={styles.text}>成都在转商铺</div>
          <div className={styles.detail}>
            <div className={styles.col}>
              <div><span>{info.newStoreCountByDay}</span></div>
              <div>今日新上(套)</div>
            </div>
            <div className={styles.col}>
              <div><span>{info.reductionPriceStoreCountByDay}</span></div>
              <div>今日降价(套)</div>
            </div>
            <div className={styles.col}>
              <div><span>{info.dealStoreCountByDay}</span></div>
              <div>今日成交(套)</div>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.top}>
            <div className={styles.title}>
              成都商铺日报
            </div>
            <div onClick={e => props.history.push(`/list`)} className={styles.more}>
              查看更多>
            </div>
          </div>
          <div className={styles.today}>今日找店客户</div>
          <div className={styles.todayData}></div>
          <div className={styles.text}></div>
          <div className={styles.detail}>
            <div className={styles.col}>
              <div>找店客户</div>
              <div><span>{info.findStoreCountByDay}</span>人</div>
            </div>
            <div className={styles.col}>
              <div>客户收藏</div>
              <div><span>{info.collectStoreCountByDay}</span>人</div>
            </div>
            <div className={styles.col}>
              <div>电话咨询</div>
              <div><span>{info.callUsCountByDay}</span>人</div>
            </div>
            <div className={styles.col}>
              <div>上门查看</div>
              <div><span>{info.showCountByDay}</span>人</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bg}>
        <div className={styles.blueTitle}>
          <div className={styles.blueBlock}></div>
          <div className={styles.main}>最新转让信息</div>
        </div>
        <div className={styles.listTop}>
          <Filter by='type' label={false} onChange={onLastFilterChange} />
          <div onClick={e => props.history.push(`/list`)} className={styles.listMore}>查看更多></div>
        </div>
        {
          list.length > 0 ?
            <div className={styles.storeList}>
              {
                list.map(v => (
                  <div className={styles.store} key={v.id} onClick={e => props.history.push(`/detail/${v.id}`)}>
                    <img src={v.picture.split(',')[0]} alt="" />
                    <div className={styles.title}>
                      {v.leaseAttrsArray === '1' ? '出租 | ' : '转让 | '}
                      {v.name}
                    </div>
                    {
                      v.rentalPrice ?
                        <div>月租金：<span>{v.rentalPrice / Math.pow(10, 2)}</span>元</div> :
                        <div>面议</div>
                    }
                    <div>面积：<span>{v.houseArea ? v.houseArea / Math.pow(10, 6) : '-'}</span>㎡</div>
                  </div>
                ))
              }
            </div> :
            <Empty />
        }
      </div>


      <Footer />
    </section>
  )
}

