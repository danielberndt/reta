import rulesBuilder from './rules-builder'
import generateCss from './generate-css'

module.exports = function(content) {
  this.cacheable()
  let configCode = this.exec(content, this.resourcePath)
  const orderedRules = rulesBuilder(configCode.__esModule ? configCode.default : configCode)
  return generateCss(orderedRules)
}