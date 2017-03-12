// this file redefines all default rules found on http://tachyons.io/docs/
// as well as the flexbox rules https://github.com/tachyons-css/tachyons-flexbox

// list may look like
// [0, '1rem', '34px', 14] or {solid: 1, title: 1.25}
const buildRuleDict = (list, keyFn, styleKeys, intoDict = {}) => {
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      const styleDict = Array.isArray(styleKeys)
        ? styleKeys.reduce((m, s) => {m[s] = list[i]; return m}, {})
        : {[styleKeys]: list[i]}
      intoDict[keyFn(i)] = styleDict
    }
  } else {
    Object.keys(list).forEach(label => intoDict[keyFn(label)] = {[styleKeys]: list[label]})
  }
  return intoDict
}

export default function buildRules(opts) {
  if (__DEV__ ) {
    const missing = 'colors lineHeightScale typeSizeScale fontWeightScale boxShadows fontFamilies widthScale'
      .split(' ').filter(o => !opts[o])
    if (missing.length) throw new Error(`you need to pass "${missing.join(', ')}" within build options!`)
    if (!opts.defaultScale) {
      const missingDefaults = 'paddingScale marginScale positionScale borderRadiusScale borderWidthScale'
        .split(' ').filter(o => !opts[o])
      if (missingDefaults.length) throw new Error(`If you don't pass a 'defaultScale' you need to pass "${missingDefaults.join(', ')}" within build options!`)
    }
  }
  const {
    colors, // {red: #ff5533, blue: 'cyan'}

    typeSizeScale,
    measureScale, // {"": "30em", narrow: "20em"}
    lineHeightScale, // {solid: 1, title: 1.25}
    trackingScale, // {"": ".1em", tight: "-.05em"}
    fontWeightScale, // [100, 200, 300]
    fontFamilies, // {"sans-serif": '-apple-system, BlinkMacSystemFont, "avenir next", avenir'}
    paddingScale = opts.defaultScale,
    marginScale = opts.defaultScale,
    widthScale,
    maxWidthScale = widthScale,
    heightScale = widthScale,
    positionScale = opts.defaultScale,
    borderWidthScale = opts.defaultScale,
    borderRadiusScale = opts.defaultScale,
    boxShadows, // {1: '0px 0px 4px 2px rgba(0, 0, 0, 0.2)'}


    // defaultRules // {'html, body...' : {boxSizing: 'border-box'}}
  } = opts

  const rules = {}

  rules.typeScale = buildRuleDict(typeSizeScale, i => `f${i+1}`, 'font-size')

  rules.measure = {
    indent: {'text-indent': '1em', 'margin-top': 0, 'margin-bottom': 0},
    'small-caps': {'font-variant': 'small-caps'},
    truncate: {'white-space': 'nowrap', overflow: 'hidden', 'text-overflow': 'ellipsis'}
  }
  buildRuleDict(measureScale, i => `measure${i ? `-${i}` : ''}`, 'max-width', rules.measure)

  rules.lineHeight = buildRuleDict(lineHeightScale, i => `lh-${i}`, 'line-height')

  rules.tracking = buildRuleDict(trackingScale, i => `tracked${i ? `-${i}` : ''}`, 'letter-spacing')

  rules.fontWeight = {
    normal: {'font-weight': 'normal'},
    b: {'font-weight': 'bold'}
  }
  buildRuleDict(fontWeightScale, i => `fw${i + 1}`, 'font-weight', rules.fontWeight)

  rules.fontStyle = {
    i: {'font-style': 'italic'},
    'fs-normal': {'font-style': 'normal'}
  }

  rules.verticalAlign = {
    'v-base': {'vertical-align': 'baseline'},
    'v-mid': {'vertical-align': 'middle'},
    'v-top': {'vertical-align': 'top'},
    'v-btm': {'vertical-align': 'bottom'}
  }

  rules.textAlign = {
    tl: {'text-align': 'left'},
    tr: {'text-align': 'right'},
    tc: {'text-align': 'center'},
  }

  rules.textTransform = {
    ttc: {'text-transform': 'capitalize'},
    ttl: {'text-transform': 'lowercase'},
    ttu: {'text-transform': 'uppercase'},
    ttn: {'text-transform': 'none'},
  }

  rules.textDecoration = {
    strike: {'text-decoration': 'line-through'},
    underline: {'text-decoration': 'underline'},
    'no-underline': {'text-decoration': 'none'},
  }

  rules.whiteSpite = {
    'ws-normal': { 'white-space': 'normal'},
    nowrap: { 'white-space': 'nowrap'},
    pre: { 'white-space': 'pre'},
  }

  rules.fontFamilies = {
    code: { 'font-family': 'Consolas, monaco, monospace', $global: true}
  }
  rules.fontFamilies = buildRuleDict(fontFamilies, i => i, 'font-family', rules.fontFamilies)

  rules.boxSizing = {
    'html, body, div, article, section, main, footer, header, form, fieldset, legend, pre, code, a, h1, h2, h3, h4, h5, h6, p, ul, ol, li, dl, dt, dd, textarea, table, td, th, tr, input[type="email"], input[type="number"], input[type="password"], input[type="tel"], input[type="text"], input[type="url"]': {'box-sizing': 'border-box', $global: true},
    'border-box' : {'box-sizing': 'border-box'}
  }

  rules.spacing = {
    mla: {'margin-left': 'auto'},
    mra: {'margin-right': 'auto'},
    mba: {'margin-bottom': 'auto'},
    mta: {'margin-top': 'auto'},
    mva: {'margin-top': 'auto', 'margin-bottom': 'auto'},
    mha: {'margin-left': 'auto', 'margin-right': 'auto'},
  };

  [['p', 'padding', paddingScale], ['m', 'margin', marginScale]].forEach(([short, long, scale]) => {
    buildRuleDict(scale, i => `${short}a${i}`, long, rules.spacing)

    buildRuleDict(scale, i => `${short}l${i}`, `${long}-left`, rules.spacing)
    buildRuleDict(scale, i => `${short}r${i}`, `${long}-right`, rules.spacing)
    buildRuleDict(scale, i => `${short}b${i}`, `${long}-bottom`, rules.spacing)
    buildRuleDict(scale, i => `${short}t${i}`, `${long}-top`, rules.spacing)

    buildRuleDict(scale, i => `${short}v${i}`, [`${long}-top`, `${long}-bottom`], rules.spacing)
    buildRuleDict(scale, i => `${short}h${i}`, [`${long}-left`, `${long}-right`], rules.spacing)
  })

  rules.float = {
    fl: {float: 'left'},
    fr: {float: 'right'},
    fn: {float: 'none'}
  }

  rules.display = {
    dn: {display: 'none'},
    di: {display: 'inline'},
    db: {display: 'block'},
    dib: {display: 'inline-block'},
    dit: {display: 'inline-table'},
    dt: {display: 'table'},
    dtc: {display: 'table-cell'},
    'dt-row': {display: 'table-row'},
    'dt-row-group': {display: 'table-row-group'},
    'dt-column': {display: 'table-column'},
    'dt-column-group': {display: 'table-column-group'}
  }

  rules.color = buildRuleDict(colors, i => i, 'color')
  rules.backgroundColor = buildRuleDict(colors, i => `bg-${i}`, 'background-color')

  rules.width = {
    'w-10': {width: '10%'},
    'w-20': {width: '20%'},
    'w-25': {width: '25%'},
    'w-30': {width: '30%'},
    'w-33': {width: '33%'},
    'w-34': {width: '34%'},
    'w-40': {width: '40%'},
    'w-50': {width: '50%'},
    'w-60': {width: '60%'},
    'w-70': {width: '70%'},
    'w-75': {width: '75%'},
    'w-80': {width: '80%'},
    'w-90': {width: '90%'},
    'w-100': {width: '100%'},

    'w-third': {width: 'calc(100% / 3)'},
    'w-two-thirds': {width: 'calc(100% / 1.5)'},
    'w-auto': {width: 'auto'},
    'img': {'max-width': '100%', $global: true}
  }
  buildRuleDict(widthScale, i => `w${i+1}`, 'width', rules.width)

  rules.maxWidth = {
    'mw-100': {'max-width': '100%'}
  }
  buildRuleDict(maxWidthScale, i => `w${i+1}`, 'max-width', rules.maxWidth)

  rules.height = {
    'h-25': {height: '25%'},
    'h-50': {height: '50%'},
    'h-75': {height: '75%'},
    'h-100': {height: '100%'},
    'min-h-100': {'min-height': '100%'},
    'vh-25': {height: '25vh'},
    'vh-50': {height: '50vh'},
    'vh-75': {height: '75vh'},
    'vh-100': {height: '100vh'},
    'min-vh-100': {'min-height': '100vh'},
    'h-auto': {height: 'auto'},
    'h-inherit': {height: 'inherit'},
  }
  buildRuleDict(heightScale, i => `h${i+1}`, 'height', rules.height)

  rules.position = {
    static: {position: 'static'},
    relative: {position: 'relative'},
    absolute: {position: 'absolute'},
    fixed: {position: 'fixed'},
  };

  ['top', 'left', 'right', 'bottom'].forEach(dir => {
    buildRuleDict(positionScale, i => `${dir}-${i}`,  dir, rules.position)
  })

  rules.backgroundSize = {
    cover: {'background-size': 'cover'},
    contain: {'background-size': 'contain'},
  }

  rules.borders = {
    ba: {'border-style': 'solid', 'border-width': 1 },
    bt: {'border-top-style': 'solid', 'border-top-width': 1 },
    br: {'border-right-style': 'solid', 'border-right-width': 1 },
    bb: {'border-bottom-style': 'solid', 'border-bottom-width': 1 },
    bl: {'border-left-style': 'solid', 'border-left-width': 1 },
    bn: {'border-style': 'none', 'border-width': 0 },

    'bt-0': {'border-top-width': 0 },
    'br-0': {'border-right-width': 0 },
    'bb-0': {'border-bottom-width': 0 },
    'bl-0': {'border-left-width': 0 },

    'b--dotted': {'border-style': 'dotted'},
    'b--dashed': {'border-style': 'dashed'},
    'b--solid': {'border-style': 'solid'},
    'b--none': {'border-style': 'none'}
  }
  buildRuleDict(borderWidthScale, i => `bw${i}`, 'border-width', rules.borders)
  buildRuleDict(colors, i => `b--${i}`, 'border-color', rules.borders)

  rules.borderRadius = {
    'br-100': {'border-radius': '100%'},
    'br-pill': {'border-radius': '9999px'},
    'br--bottom': {'border-top-left-radius': 0, 'border-top-right-radius': 0},
    'br--top': {'border-bottom-left-radius': 0, 'border-bottom-right-radius': 0},
    'br--right': {'border-top-left-radius': 0, 'border-bottom-left-radius': 0},
    'br--left': {'border-top-right-radius': 0, 'border-bottom-right-radius': 0},
  }
  buildRuleDict(borderRadiusScale, i => `br${i}`, 'border-radius', rules.borderRadius)

  rules.boxShadow = buildRuleDict(boxShadows, i => `shadow-${i}`, 'box-shadow')

  rules.opacity = {
    'o-100': {opacity: 1},
    'o-90': {opacity: .9},
    'o-80': {opacity: .8},
    'o-70': {opacity: .7},
    'o-60': {opacity: .6},
    'o-50': {opacity: .5},
    'o-40': {opacity: .4},
    'o-30': {opacity: .3},
    'o-20': {opacity: .2},
    'o-10': {opacity: .1},
    'o-05': {opacity: .05},
    'o-025': {opacity: .025},
    'o-0': {opacity: 0},
  }

  rules.list = {
    list: {'list-style-type': 'none' }
  }

  rules.forms = {
    'input-reset': {'-webkit-appearance': 'none', '-moz-appearance': 'none'},
  }

  rules.flex = {
    flex: { display: 'flex'},
    'inline-flex': { display: 'inline-flex'},
    'flex-auto': {flex: '1 1 auto', 'min-width': 0},
    'flex-none': {flex: 'none'},
    'flex-column': {'flex-direction': 'column'},
    'flex-row': {'flex-direction': 'row'},
    'flex-wrap': {'flex-wrap': 'wrap'},
    'items-start': {'align-items': 'flex-start'},
    'items-end': {'align-items': 'flex-end'},
    'items-center': {'align-items': 'center'},
    'items-baseline': {'align-items': 'baseline'},
    'items-stretch': {'align-items': 'stretch'},
    'self-start': {'align-self': 'flex-start'},
    'self-end': {'align-self': 'flex-end'},
    'self-center': {'align-self': 'center'},
    'self-baseline': {'align-self': 'baseline'},
    'self-stretch': {'align-self': 'stretch'},
    'justify-start': {'justify-content': 'flex-start'},
    'justify-end': {'justify-content': 'flex-end'},
    'justify-center': {'justify-content': 'center'},
    'justify-between': {'justify-content': 'space-between'},
    'justify-around': {'justify-content': 'space-around'},
    'content-start': {'align-content': 'flex-start'},
    'content-end': {'align-content': 'flex-end'},
    'content-center': {'align-content': 'center'},
    'content-between': {'align-content': 'space-between'},
    'content-around': {'align-content': 'space-around'},
    'content-stretch': {'align-content': 'stretch'},
    'order-0': {order: '0'},
    'order-1': {order: '1'},
    'order-2': {order: '2'},
    'order-3': {order: '3'},
    'order-4': {order: '4'},
    'order-5': {order: '5'},
    'order-6': {order: '6'},
    'order-7': {order: '7'},
    'order-8': {order: '8'},
    'order-last': {order: '99999'},
  }

  return rules
}
