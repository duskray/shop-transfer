export const filterTypes = [
  {
    label: '业态',
    value: 'type',
    options: [
      {
        label: '不限',
        value: undefined,
      }, {
        label: '火锅店',
        value: '1',
      }, {
        label: '快餐',
        value: '2',
      }, {
        label: '自助餐',
        value: '3',
      }, {
        label: '美食城',
        value: '4',
      }, {
        label: '奶茶小吃',
        value: '5',
      },],
  }, {
    label: '区域',
    value: 'districtId',
    options: [
      {
        label: '不限',
        value: undefined,
      }, {
        label: '锦江区',
        value: '510104',
      }, {
        label: '青羊区',
        value: '510105',
      }, {
        label: '金牛区',
        value: '510106',
      }, {
        label: '武侯区',
        value: '510107',
      }, {
        label: '成华区',
        value: '510108',
      }, {
        label: '高新区',
        value: '510109',
      }, {
        label: '龙泉驿区',
        value: '510112',
      }, {
        label: '青白江区',
        value: '510113',
      }, {
        label: '新都区',
        value: '510114',
      }, {
        label: '温江县',
        value: '510115',
      }, {
        label: '金堂县',
        value: '510121',
      }, {
        label: '双流县',
        value: '510122',
      }, {
        label: '郫　县',
        value: '510124',
      }, {
        label: '大邑县',
        value: '510129',
      }, {
        label: '蒲江县',
        value: '510131',
      }, {
        label: '新津县',
        value: '510132',
      }, {
        label: '都江堰市',
        value: '510181',
      }, {
        label: '彭州市',
        value: '510182',
      }, {
        label: '邛崃市',
        value: '510183',
      }, {
        label: '崇州市',
        value: '510184',
      },],
  }, {
    label: '月租',
    value: 'rentalPrice',
    options: [
      {
        label: '不限',
        value: [undefined, undefined],
      }, {
        label: '1000以下',
        value: [undefined, '100000'],
      }, {
        label: '1000-2999',
        value: ['100000', '299900'],
      }, {
        label: '3000-4999',
        value: ['300000', '499900'],
      }, {
        label: '5000-7999',
        value: ['500000', '799900'],
      }, {
        label: '8000-9999',
        value: ['800000', '999900'],
      }, {
        label: '10000以上',
        value: ['1000000', undefined],
      },],
  }, {
    label: '面积',
    value: 'houseArea',
    options: [
      {
        label: '不限',
        value: [undefined, undefined],
      }, {
        label: '20㎡以下',
        value: [undefined, '20000000'],
      }, {
        label: '21-50',
        value: ['21000000', '50000000'],
      }, {
        label: '51-100',
        value: ['51000000', '100000000'],
      }, {
        label: '101-200',
        value: ['101000000', '200000000'],
      }, {
        label: '201-500',
        value: ['201000000', '500000000'],
      }, {
        label: '501-1000',
        value: ['501000000', '1000000000'],
      }, {
        label: '1000以上',
        value: ['1000000000', undefined],
      },],
  }, {
    label: '转让费',
    value: 'transferPrice',
    options: [
      {
        label: '不限',
        value: [undefined, undefined],
      }, {
        label: '3万以下',
        value: [undefined, '3000000'],
      }, {
        label: '3-5万',
        value: ['3000000', '5000000'],
      }, {
        label: '5-10万',
        value: ['5000000', '10000000'],
      }, {
        label: '10-20万',
        value: ['10000000', '20000000'],
      }, {
        label: '20-50万',
        value: ['20000000', '50000000'],
      }, {
        label: '50万以上',
        value: ['50000000', undefined],
      },],
  },]
