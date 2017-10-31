const UglifyEsPlugin = require('uglifyjs-webpack-plugin')

function loader (name) {
  return {
    loader: name,
    options: {
      appendTsSuffixTo: ['\\.vue$']
    }
  }
}

module.exports = function (options) {
  // Extend build
  this.extendBuild((config) => {

    var i, idx, len, plugin, ref, ref1;
    
    ref = config.plugins;
    for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
      plugin = ref[idx];
      if (!(plugin != null ? (ref1 = plugin.options) != null ? ref1.compress : void 0 : void 0)) {
        continue;
      }
      ref.splice(idx, 1, new UglifyEsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ie8: false,
          ecma: 8,
          warnings: true
        }
      }))
    }
    console.log(config.module.rules)
    for (rule of config.module.rules) {
      if (rule.loader === 'vue-loader') {
        rule.options.loaders.coffee = loader('coffee-loader')
        rule.options.loaders.yml = loader('json-loader!yaml-loader')
        rule.options.loaders.pug = loader('pug-html-loader')
        rule.options.loaders.md = {
          loader: 'markdown-loader',
          options: {
            appendTsSuffixTo: ['\\.vue$'],
            tag: 'div',
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: true
          }
        }
      }
    }
  })
}
