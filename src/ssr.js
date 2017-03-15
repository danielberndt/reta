import {setEmitRule} from './component-builder'
import generateCss from './generate-css'

export default function(buildRules, actionCb) {
  const usedRules = {}
  setEmitRule(rule => usedRules[rule] = true)
  const html = actionCb()
  setEmitRule(null)
  return {html, css: generateCss(buildRules, {whiteList: usedRules})}
}