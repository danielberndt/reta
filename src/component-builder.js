import React from 'react'

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

  return props => {
    let Comp = 'div'
    const newProps = props.props || {}
    let classNames = (props.className && [props.className]) || []
    for (const prop in props) {
      const ruleLabel = labelsToClassNames[prop]
      if (ruleLabel) {
        if (props[prop]) {
          classNames.push(ruleLabel)
          if (emitRule) emitRule()
        }
      } else {
        switch (prop) {
          case 'className':
          case 'props':
            break
          case 'component':
            Comp = props[prop]
            break
          default:
            newProps[prop] = props[prop]
        }
      }
    }
    return <Comp className={classNames.join(' ')} {...newProps}/>
  }  
}
