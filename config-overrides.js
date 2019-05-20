const { override, fixBabelImports } = require('customize-cra')
const MultipleBundle = require('webpack-plugin-create-multiple-bundle-from-string-replace')
const fs = require('fs-extra')
const path = require('path')

const env = {
  dev: [['HOST_API'],['//devcloud-shop-transfer.shishike.com/cst/api/']],
  citest: [['HOST_API'],['//citestcloud-shop-transfer.shishike.com/cst/api/']],
  gld: [['HOST_API'],['//gldcloud-shop-transfer.keruyun.com/cst/api/']],
  vpcprod: [['HOST_API'],['//gldcloud-shop-transfer.keruyun.com/cst/api/']],
  sgprod: [['HOST_API'],['//gldcloud-shop-transfer.keruyun.com/cst/api/']],
}

const ENV = (process.env.ENV || 'CITEST').toLocaleLowerCase().split(/[\s,]+/gi)
const buildTarget = {}
ENV.forEach(v => {
  buildTarget[v] = env[v]
})

try {
  fs.emptyDirSync(path.join(__dirname, 'dist'))
} catch (error) {
  console.error(error)
}

module.exports = override(
  config => {
    config.plugins.push(
      new MultipleBundle(buildTarget, {
        distPath: 'dist',
      })
    )
    return config
  },
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);
