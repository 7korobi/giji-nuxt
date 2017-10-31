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

    var idx, ref, ref1;

    ref = config.plugins;
    for (idx = ref.length; idx >= 0; --idx) {
      let plugin = ref[idx];
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
    ref = config.module.rules;
    for (idx = ref.length - 1; idx >= 0; --idx) {
      let rule = ref[idx];
      switch (rule.loader) {
        case 'coffee-loader':
        case 'json-loader!yaml-loader':
        case 'markdown-loader':
        case 'pug-html-loader':
          ref.splice(idx, 1);
          break;
        case 'vue-loader':
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
          break;
      }
    }
    config.module.rules.push({
      test: /\.coffee$/,
      loader: 'coffee-loader'
    })
    config.module.rules.push({
      test: /\.yml$/,
      loader: 'json-loader!yaml-loader'
    })
    config.module.rules.push({
      test: /\.pug$/,
      loader: 'pug-html-loader',
      query: {
        pretty: true
      }
    })
    config.module.rules.push({
      test: /\.md$/,
      loader: 'markdown-loader',
      options: {
        tag: 'div',
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: true
      }
    })
  })
}
