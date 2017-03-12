import {setEmitRule} from './component-builder'
import generateCss from './generate-css'

export default function(buildRules, actionCb) {
  const usedRules = {}
  setEmitRule(rule => usedRules[rule] = true)
  actionCb()
  setEmitRule(null)
  return generateCss(buildRules, {whiteList: usedRules})
}