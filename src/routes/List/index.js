import React, { useState, useEffect, useRef } from 'react'
import { Header, Footer, Filter } from 'components'
import { Button, Pagination, Input, Spin } from 'antd'
import styles from './index.module.scss'
import classnames from 'classnames'
import eye from 'assets/eye.png'
import { search } from 'services/api'
import qs from 'qs'
import up from 'assets/up.png'
import down from 'assets/down.png'

export default (props) => {
  const { history, location } = props
  const urlParams = qs.parse(location.search.slice(1))

  const [text, setText] = useState('')
  const [keyword, setKeyword] = useState('')
  const [params, setParams] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [orderType, setOrderType] = useState(0)

  const [data, setData] = useState({ content: [], total: 0 })
  const [asideData, setAsideData] = useState([])
  const isUpdate = useRef(false);
  const el = useRef(null);
  const PAGE_SIZE = 10

  useEffect(() => {
    const order = new Map([
      [0, {}],
      [2, { sortHouseArea: 2 }],
      [-2, { sortHouseArea: 1 }],
      [3, { sortRentalPrice: 1 }],
      [-3, { sortRentalPrice: 2 }],
    ])

    const fetchData = async () => {
      setIsLoading(true)
      const result = await search({
        page,
        pageSize: PAGE_SIZE,
        keyword,
        ...params,
        ...order.get(orderType),
      })
      setData(result)
      setIsLoading(false)
    }
    if (isUpdate.current) {
      fetchData()
    }
    isUpdate.current = true
  }, [params, keyword, page, orderType])

  useEffect(() => {
    const fetchData = async () => {
      const result = await search({
        page,
        pageSize: 3,
      })
      setAsideData(result.content)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setText(urlParams.keyword)
    setKeyword(urlParams.keyword)
  }, [])


  const onFilterChange = (params, state) => {
    history.replace({
      search: qs.stringify({ ...state, keyword })
    })
    setPage(1)
    setParams(params)
  }

  const onFilterLoad = (params) => {
    setParams(params)
  }

  const onSearch = () => {
    urlParams.keyword = text
    history.replace({
      search: qs.stringify(urlParams)
    })
    setPage(1)
    setKeyword(text)
  }

  const onOrderTypeChange = (v) => {
    if ((orderType === 2 || orderType === 3) && orderType === v) {
      setOrderType(-v)
    } else {
      setOrderType(v)
    }
  }

  const onPageChange = (v) => {
    window.scrollTo(0, el.current.offsetTop)
    setPage(v)
  }

  const onTextChange = (e) => {
    setText(e.target.value)
  }

  return (
    <section>
      <Header />
      <div className={styles.bg}>
        <div className={styles.location}>当前位置：商铺转让</div>
        <Input className={styles.searchText} placeholder="请输入意向位置，例如：春熙路"
          value={text} onChange={onTextChange}
        />
        <Button type="primary" onClick={onSearch}>开始找铺</Button>
        <Filter onChange={onFilterChange} onLoad={onFilterLoad} value={urlParams} />
        <div className={styles.hr}>
          <hr />
          <div>筛选条件</div>
          <hr />
        </div>
        <div ref={el} className={styles.total}>共 <span>{data.total}</span> 个相关商铺</div>
        <div className={styles.orderBy}>
          <div onClick={e => onOrderTypeChange(0)} className={classnames({ [styles.active]: orderType === 0 })}>综合排序</div>
          {/* <div onClick={e => onOrderTypeChange(1)} className={classnames({ [styles.active]: orderType === 1 })}>离我最近</div> */}
          <div onClick={e => onOrderTypeChange(2)} className={classnames({ [styles.active]: Math.abs(orderType) === 2 })}>
            面积{orderType === -2 ? <img src={down} alt="" className={styles.arrow}/> : <img src={up} alt="" className={styles.arrow}/>}
          </div>
          <div onClick={e => onOrderTypeChange(3)} className={classnames({ [styles.active]: Math.abs(orderType) === 3 })}>
            租金{orderType === -3 ? <img src={up} alt="" className={styles.arrow}/> : <img src={down} alt="" className={styles.arrow}/>}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.list}>
            {
              isLoading ?
              <div className={styles.loading}><Spin /> </div>
                :
                data.content.map(v => (
                  <article className={styles.store} key={v.id}>
                    <img className={styles.img} src={v.picture.split(',')[0]} alt="" />
                    <div className={styles.info}>
                      <div className={styles.title}>{v.name}</div>
                      <div>{v.address}</div>
                      <div>
                        {v.leaseAttrsArray === '1' ? '空铺出租 | ' : '转让 | '}
                        {v.houseArea ? `${v.houseArea / Math.pow(10, 6)}㎡ | ` : null}
                        {v.transferPrice ? `${v.transferPrice / Math.pow(10, 2)}元 | ` : '面议'}
                        {v.rentalPrice ? `${v.rentalPrice / Math.pow(10, 2)}元/月` : '面议'}
                      </div>
                      <div className={styles.tags}>
                        {
                          v.labelList.map(label => (
                            <span key={label}>{label}</span>
                          ))
                        }
                      </div>
                    </div>
                    <div >
                      <div className={styles.eye}>
                        <img src={eye} alt="访问" />
                        <span>{v.viewCount}</span>
                      </div>
                      <Button className={styles.btnDetail} onClick={e => props.history.push(`/detail/${v.id}`)}>我想咨询</Button>
                    </div>
                  </article>
                ))
            }

            <Pagination onChange={onPageChange} current={page} pageSize={PAGE_SIZE} total={data.total} className={styles.pagination} />
          </div>
          <div className={styles.aside}>
            <Button type="primary" onClick={e => props.history.push('/transfer')} className={styles.btnAside}>我要转店/出租</Button>
            <Button type="primary" onClick={e => props.history.push('/find')} className={styles.btnAside}>容我要定制找店</Button>
            <div className={styles.asideTitle}>推荐店铺 TOP</div>
            <div className={styles.recommendList}>
              {
                asideData.map(v => (
                  <div key={v.id} className={styles.recommend} >
                    <img src={v.picture.split(',')[0]} alt="" onClick={e => props.history.push(`/detail/${v.id}`)} />
                    <div>
                      <div className={styles.title}>{v.name}</div>
                      <div>
                        {
                          v.rentalPrice ?
                            <div><span>{v.rentalPrice / Math.pow(10, 2)}</span> 元/月</div> :
                            '面议'
                        }
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className={styles.asideTitle}>热门标签</div>
            <div className={styles.asideTags}>
              <span>证件齐全</span>
              <span>无转让费</span>
              <span>租金便宜</span>
              <span>快速开店</span>
              <span>档口</span>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </section >
  )
}

