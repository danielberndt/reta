import React from 'react'
import {Flex, Block, InlineBlock} from 'glamor/jsxstyle'
import {css} from 'glamor'

/* eslint-disable guard-for-in */
export default function buildComponents(rules) {
  const inlineTa = (props) => {
    const cssRules = {}
    const rest = {}
    for (let prop in props) {
      if (rules.hasOwnProperty(prop)) {
        if (!props[prop]) continue
        let ruleDef = rules[prop]
        let target = cssRules
        if (ruleDef.$media) {
          if (!cssRules[ruleDef.$media]) cssRules[ruleDef.$media] = {}
          target = cssRules[ruleDef.$media]
          ruleDef = ruleDef.rule
        }
        if (ruleDef.$state) {
          if (!target[ruleDef.$state]) target[ruleDef.$state] = {}
          target = target[ruleDef.$state]
          ruleDef = ruleDef.rule
        }
        for (let ruleProp in ruleDef) target[ruleProp] = ruleDef[ruleProp]
      } else {
        if (['hover', 'focus', 'active'].some(attr => attr === prop)) {
          cssRules[`:${prop}`] = {...cssRules[`:${prop}`], ...props[prop]}
        } else {
          rest[prop] = props[prop]
        }
      }
    }
    const className = css(cssRules).toString()
    return {...rest, className: `${props.className ? `${props.className} ` : ''}${className}`}
  }
  /* eslint-enable guard-for-in */

  const B = (props) => <Block {...inlineTa(props)}/>
  B.I = (props) => <InlineBlock {...inlineTa(props)}/>
  B.Row = (props) => <Flex {...inlineTa(props)}/>
  B.Col = (props) => <Flex flexDirection="column" {...inlineTa(props)}/>
  return B
}
