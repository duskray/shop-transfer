import React, { useState, useEffect } from 'react';
import styles from './index.module.scss'
import { Input } from 'antd'
import { filterTypes } from './config'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Filter = (props) => {
  const { label = true, onChange = function () { }, onLoad = function () { }, value = {} } = props
  const by = props.by ? props.by.split(',') : ''

  // 初始筛选条件与自定义值
  const defaultKeys = {}
  filterTypes.forEach(v => {
    defaultKeys[v.value] = value[v.value] ? Number(value[v.value]) : 0
  })

  const [keys, setKeys] = useState(defaultKeys)
  const [min, setMin] = useState(value.min || '')
  const [max, setMax] = useState(value.max || '')

  useEffect(() => {
    onLoad(getFilter(keys, min, max))
  }, [])

  // 筛选
  const onFilter = (type, key) => {
    if (keys[type] === key && key !== -1) {
      return
    }
    const newKeys = Object.assign({}, keys, {
      [type]: key
    })
    setKeys(newKeys)

    onChange(getFilter(newKeys, min, max), {
      ...newKeys,
      min,
      max
    })
  }

  const getFilter = (keys, min, max) => {
    const filter = {}
    for (let i in keys) {
      const value = keys[i] === -1 ?
        [min * Math.pow(10, 6), max * Math.pow(10, 6)] :
        filterTypes.find(v => v.value === i).options[keys[i]].value

      if (Array.isArray(value)) {
        if (value[0]) {
          filter[i + 'Min'] = value[0]
        }
        if (value[1]) {

          filter[i + 'Max'] = value[1]
        }
      } else if (value) {
        filter[i] = value
      }
    }
    return filter
  }

  // 自定义筛选
  const onCustomSubmit = (type) => {
    onFilter(type, -1)
  }

  return (
    <div className={styles.filter}>
      {
        filterTypes.map((type, i) => {
          if (by && !by.includes(type.value)) {
            return null
          } else {
            return (
              <div className={styles.type} key={i}>
                {
                  label ? <div className={styles.title}>{type.label}</div> : null
                }
                <div className={styles.options}>
                  {
                    type.options.map((option, j) => (
                      <div
                        key={j}
                        className={classnames(styles.option, { [styles.active]: keys[type.value] === j })}
                        onClick={e => onFilter(type.value, j)}
                      >
                        {option.label}
                      </div>
                    ))
                  }
                  {
                    type.value === 'houseArea' ?
                      <div>
                        <Input type="number" min="0" className={styles.areaMin}
                          value={min}
                          onChange={e => setMin(e.target.value)} size="small" />
                        <span> - </span>
                        <Input type="number" min="0" className={styles.areaMax}
                          value={max}
                          onChange={e => setMax(e.target.value)} size="small" />
                        <span className={styles.customSubmit} onClick={e => onCustomSubmit(type.value)}>确定</span>
                      </div>
                      : null
                  }
                </div>
              </div>
            )
          }
        }
        )
      }
    </div>

  )
}

Filter.propTypes = {
  by: PropTypes.string,
  label: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func,
  onLoad: PropTypes.func,
}

export default Filter