const path = require('path')
const withImages = require('next-images')
const withPWA = require('next-pwa')

module.exports = withImages({
  // withPWA({
  // pwa: {
  //   dest: 'public',
  // },

  webpack(config) {
    config.resolve.modules.push(path.resolve('./'))

    return config
  },
  // }),
})
