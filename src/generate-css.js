export default function(rules, {whiteList, minify} = {}) {
  const cssRules = []
  let lastMedia = null
  let spaces = ''
  rules.forEach(([label, {state, media, rule}]) => {
    if (whiteList && !whiteList[label] && !rule.$global) return
    if (media !== lastMedia) {
      if (lastMedia) {
        if (!minify) spaces = spaces.slice(2)
        cssRules.push(`${spaces}}`)
      }
      lastMedia = media
      if (media) {
        cssRules.push(`${spaces}@media ${media} {`)
        if (!minify) spaces += '  '
      }
    }
    const rules = []
    // eslint-disable-next-line
    for (let attr in rule) {
      if (attr === '$global') continue
      rules.push(`${spaces}${minify ? '' :'  '}${attr}:${minify ? '' :' '}${rule[attr]};`)
    }
    cssRules.push(`${spaces}${rule.$global ? '' : '.'}${label}${state ? `:${state}` : ''} {${minify ? '' :'\n'}${rules.join(minify ? '' : '\n')}${minify ? '' :'\n'}${spaces}}`)
  })
  if (lastMedia) {
    cssRules.push(`${spaces}}`)
  }
  return cssRules.join(minify ? '' : '\n')
}