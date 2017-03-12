import rulesBuilder from './builder'
import generateCss from './generate-css'

export default function(content) {
  let configCode = this.exec(content, this.resourcePath)
  const orderedRules = rulesBuilder(configCode.__esModule ? configCode.default : configCode)
  return generateCss(orderedRules)
}