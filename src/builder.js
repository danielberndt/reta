import ruleBuilder from './rules'
import componentBuilder from './components'

export default function build(opts) {
  if (__DEV__ ) {
    if (!opts) throw new Error('you need to pass options to the "build()" function!')
    const missing = 'mediaQueries'
      .split(' ').filter(o => !opts[o])
    if (missing.length) throw new Error(`you need to pass "${missing.join(', ')}" within build options!`)
  }
  const {
    mediaQueries, // {ns: 'screen and (min-width: 30em)'}
    // defaultRules // {'html, body...' : {boxSizing: 'border-box'}}
  } = opts

  const rules = ruleBuilder(opts)

  const combinedRules = {}
  Object.keys(rules).forEach(ruleName => {
    const ruleDefinitions = rules[ruleName]
    Object.forEach(ruleDefinitions).forEach(label => {
      combinedRules[label] = ruleDefinitions[label]
    })
  });
  ['hover', 'focus', 'active'].forEach(state => {
    Object.keys(combinedRules).forEach(label => {
      combinedRules[`${state}-${label}`] = {
        $state: state,
        rule: combinedRules[label]
      }
    })
  })

  Object.keys(mediaQueries).forEach(mediaLabel => {
    Object.keys(combinedRules).forEach(label => {
      combinedRules[`${label}-${mediaLabel}`] = {
        $media: mediaQueries[mediaLabel],
        rule: combinedRules[label]
      }
    })
  })

  const B = componentBuilder(combinedRules)

  // expose colors and options for the greater good
  B.col = opts.colors
  B.opts = opts
  
  return B
}
