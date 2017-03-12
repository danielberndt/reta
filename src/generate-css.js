export default function(rules, {whiteList} = {}) {
  const cssRules = []
  let lastMedia = null
  let spaces = ''
  rules.forEach(([label, {state, media, rule}]) => {
    if (whiteList && !whiteList[label]) return
    if (media !== lastMedia) {
      if (lastMedia) {
        spaces = spaces.slice(2)
        cssRules.push(`${spaces}}`)
      }
      lastMedia = media
      if (media) {
        cssRules.push(`${spaces}@media ${media} {`)
        spaces += '  '
      }
    }
    const rules = []
    // eslint-disable-next-line
    for (let attr in rule) {
      if (attr === '$global') continue
      rules.push(`${spaces}  ${attr}: ${rule[attr]};`)
    }
    cssRules.push(`${spaces}${rule.$global ? '' : '.'}${label}${state ? `:${state}` : ''} {\n${rules.join('\n')}\n${spaces}}`)
  })
  if (lastMedia) {
    cssRules.push(`${spaces}}`)
  }
  return cssRules.join('\n')
}