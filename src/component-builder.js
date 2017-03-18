import React from 'react'
const styletronUtils = require('styletron-utils')

let emitRule

export function setEmitRule(cb) {
  emitRule = cb
}

/* eslint-disable guard-for-in */
export default function buildComponent(combinedRules) {
  const labelsToClassNames = {}
  combinedRules.forEach(ruleDesc => {
    const label = ruleDesc[0]
    labelsToClassNames[label] = label
    const camelCaseKey = label.split(/-+/).map((s,i) => i > 0 ? `${s[0].toUpperCase()}${s.slice(1)}` : s).join('')
    labelsToClassNames[camelCaseKey] = label
  })

  const customCssForMediaQueries = Object.keys(combinedRules.mediaQueries).reduce(
    (m, label) => {
      m[`css${label}`] = combinedRules.mediaQueries[label]
      m[`css${label[0].toUpperCase()}${label.slice(1)}`] = combinedRules.mediaQueries[label]
      return m
    },
    {}
  )

  const B = (props, ctx) => {
    let Comp = 'div'
    const newProps = props.props || {}
    let classNames = (props.className && [props.className]) || []
    for (const prop in props) {
      const ruleLabel = labelsToClassNames[prop]
      if (ruleLabel) {
        if (props[prop]) {
          classNames.push(ruleLabel)
          if (emitRule) emitRule(ruleLabel)
        }
      } else {
        switch (prop) {
          case 'className':
          case 'props':
            break
          case 'css':
            classNames.push(styletronUtils.injectStylePrefixed(ctx.styletron, props[prop]))
            break
          case 'component':
            Comp = props[prop]
            break
          default:
            if (customCssForMediaQueries[prop]) {
              classNames.push(styletronUtils.injectStylePrefixed(ctx.styletron, props[prop], customCssForMediaQueries[prop]))
            } else {
              newProps[prop] = props[prop]
            }
        }
      }
    }
    return <Comp className={classNames.join(' ')} {...newProps}/>
  }
  B.contextTypes = {styletron: React.PropTypes.object}
  return B
}
