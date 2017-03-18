import defaultOpts from './defaults'
import rulesBuilder from './rules-builder'
import componentBuilder from './component-builder'
import StyleProvider from './style-provider'

export default componentBuilder(rulesBuilder(defaultOpts))
export {StyleProvider}
