const createDeclaration = (label, rule, spaces, state, minify) => {
  const declarations = []
  // eslint-disable-next-line
  for (let attr in rule) {
    if (attr === '$global') continue
    declarations.push(`${spaces}${minify ? '' :'  '}${attr}:${minify ? '' :' '}${rule[attr]};`)
  }
  return `${spaces}${rule.$global ? '' : '.'}${label}${state ? `:${state}` : ''} {${minify ? '' :'\n'}${declarations.join(minify ? '' : '\n')}${minify ? '' :'\n'}${spaces}}`
}

export default function(rules, {whiteList, minify} = {}) {
  const cssRules = []
  const medias = {}
  rules.forEach(([label, {state, media, rule}]) => {
    if (whiteList && !whiteList[label] && !rule.$global) return
    if (media) {
      (medias[media] = medias[media] || []).push({label, rule, state})
    } else {
      cssRules.push(createDeclaration(label, rule, '', state, minify))
    }
  })

  Object.keys(rules.mediaQueries).forEach(label => {
    const query = rules.mediaQueries[label]
    if (medias[query]) {
      cssRules.push(`@media ${query} {`)
      medias[query].forEach(({label, rule, state}) => {
        cssRules.push(createDeclaration(label, rule, minify ? '' : '  ', state, minify))
      })
      cssRules.push('}')
    }
  })
  return cssRules.join(minify ? '' : '\n')
}