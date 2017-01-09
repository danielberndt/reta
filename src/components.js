import React from 'react'
import {Flex, Block, InlineBlock} from 'glamor/jsxstyle'

export default function buildComponents(rules) {
  const inlineTa = (props) => {
    const result = {}
    for (let prop in props) {
      if (rules.hasOwnProperty(prop)) {
        if (!props[prop]) continue
        const ruleDef = rules[prop]
        /* eslint-disable guard-for-in */
        for (let ruleProp in ruleDef) result[ruleProp] = ruleDef[ruleProp]
        /* eslint-enable guard-for-in */
      } else {
        result[prop] = props[prop]
      }
    }
    return result
  }

  const B = (props) => <Block {...inlineTa(props)}/>
  B.I = (props) => <InlineBlock {...inlineTa(props)}/>
  B.Row = (props) => <Flex {...inlineTa(props)}/>
  B.Col = (props) => <Flex flexDirection="column" {...inlineTa(props)}/>
  return B
}
