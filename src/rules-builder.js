import ruleBuilder from './rules'

// this function takes the rule configuration object and applies hover, 
// focus and active states and media queries to them

export default function build(opts) {
  if (__DEV__ ) {
    if (!opts) throw new Error('you need to pass options to the "build()" function!')
    const missing = 'mediaQueries applyStates'
      .split(' ').filter(o => !opts[o])
    if (missing.length) throw new Error(`you need to pass "${missing.join(', ')}" within build options!`)
  }
  const {
    mediaQueries, // {ns: 'screen and (min-width: 30em)'},
    applyStates // ['fontWeight', ...]
  } = opts

  const rules = ruleBuilder(opts)

  const combinedRules = []

  Object.keys(rules).forEach(ruleName => {
    const ruleDefinitions = rules[ruleName]
    const ruleDefinitionKeys = Object.keys(ruleDefinitions)
    ruleDefinitionKeys.forEach(label => {
      combinedRules.push([label, {
        state: null,
        media: null,
        rule: ruleDefinitions[label]
      }])
    })
    
    if (applyStates.indexOf(ruleName) > -1) {
      ['hover', 'focus', 'active'].forEach(state => {
        ruleDefinitionKeys.forEach(label => {
          const rule = ruleDefinitions[label]
          if (rule.$global) return
          combinedRules.push([`${state}-${label}`, {
            state,
            media: null,
            rule
          }])
        })
      })
    }

    Object.keys(mediaQueries).forEach(mediaLabel => {
      ruleDefinitionKeys.forEach(label => {
        const rule = ruleDefinitions[label]
        if (rule.$global) return
        combinedRules.push([`${label}-${mediaLabel}`, {
          state: null, 
          media: mediaQueries[mediaLabel],
          rule
        }])
      })
    })
  })

  combinedRules.mediaQueries = mediaQueries

  return combinedRules
}
