import defaultOpts from './defaults'
import rulesBuilder from './rules-builder'
import componentBuilder from './component-builder'

export default componentBuilder(rulesBuilder(defaultOpts))

