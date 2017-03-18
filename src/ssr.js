import ServerStyletron from 'styletron-server'
import {setEmitRule} from './component-builder'
import {preparedStyletronContainer} from './style-provider'
import generateCss from './generate-css'
import rulesBuilder from './rules-builder'

export default function(styleRules, actionCb) {
  const styletron = preparedStyletronContainer.styletron = new ServerStyletron({prefix: '_'})
  const usedRules = {}
  setEmitRule(rule => usedRules[rule] = true)
  const html = actionCb()
  setEmitRule(null)
  preparedStyletronContainer.styletron = null
  return {
    html, 
    stylesheets: `<style>${generateCss(rulesBuilder(styleRules), {whiteList: usedRules, minify: true})}</style>${styletron.getStylesheetsHtml()}`
  }
}