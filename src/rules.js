// list my look like
// [0, '1rem', '34px', 14] or {solid: 1, title: 1.25}


const buildRuleDict = (list, keyFn, styleKeys, intoDict = {}) => {
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      const styleDict = Array.isArray(styleKeys)
      ? {[styleKeys]: list[i]}
      : styleKeys.reduce((m, s) => {m[s] = list[i]; return m}, {})
      intoDict[keyFn(i)] = styleDict
    }
  } else {
    Object.keys(list).forEach(label => intoDict[label] = {[styleKeys]: list[label]})
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

  rules.typeScale = buildRuleDict(typeSizeScale, i => `f${i+1}`, 'fontSize')

  rules.measure = {
    indent: {textIndent: '1em', marginTop: 0, marginBottom: 0},
    'small-caps': {fontVariant: 'small-caps'},
    truncate: {whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}
  }
  buildRuleDict(measureScale, i => `measure${i ? `-${i}` : ''}`, 'maxWidth', rules.measure)

  rules.lineHeight = buildRuleDict(lineHeightScale, i => `lh-${i}`, 'lineHeight')

  rules.tracking = buildRuleDict(trackingScale, i => `tracked${i ? `-${i}` : ''}`, 'letterSpacing')

  rules.fontWeight = {
    normal: {fontWeight: 'normal'},
    b: {fontWeight: 'bold'}
  }
  buildRuleDict(fontWeightScale, i => `fw${i + 1}`, 'fontWeight', rules.fontWeight)

  rules.fontStyle = {
    i: {fontStyle: 'italic'},
    'fs-normal': {fontStyle: 'normal'}
  }

  rules.verticalAlign = {
    'v-base': {verticalAlign: 'baseline'},
    'v-mid': {verticalAlign: 'middle'},
    'v-top': {verticalAlign: 'top'},
    'v-btm': {verticalAlign: 'bottom'}
  }

  rules.textAlign = {
    tl: {textAlign: 'left'},
    tr: {textAlign: 'right'},
    tc: {textAlign: 'center'},
  }

  rules.textTransform = {
    ttc: {textTransform: 'capitalize'},
    ttl: {textTransform: 'lowercase'},
    ttu: {textTransform: 'uppercase'},
    ttn: {textTransform: 'none'},
  }

  rules.textDecoration = {
    strike: {textDecoration: 'line-through'},
    underline: {textDecoration: 'underline'},
    'no-underline': {textDecoration: 'none'},
  }

  rules.whiteSpite = {
    'ws-normal': { whiteSpace: 'normal'},
    nowrap: { whiteSpace: 'nowrap'},
    pre: { whiteSpace: 'pre'},
  }

  rules.fontFamilies = buildRuleDict(fontFamilies, i => i, 'fontFamily')

  rules.boxSizing = {'border-box' : {boxSizing: 'border-box'}}

  rules.spacing = {
    mla: {marginLeft: 'auto'},
    mra: {marginRight: 'auto'},
    mba: {marginBottom: 'auto'},
    mta: {marginTop: 'auto'},
    mva: {marginTop: 'auto', marginBottom: 'auto'},
    mha: {marginLeft: 'auto', marginRight: 'auto'},
  };

  [['p', 'padding', paddingScale], ['m', 'margin', marginScale]].forEach(([short, long, scale]) => {
    buildRuleDict(scale, i => `${short}a${i}`, long, rules.spacing)

    buildRuleDict(scale, i => `${short}l${i}`, `${long}Left`, rules.spacing)
    buildRuleDict(scale, i => `${short}r${i}`, `${long}Right`, rules.spacing)
    buildRuleDict(scale, i => `${short}b${i}`, `${long}Bottom`, rules.spacing)
    buildRuleDict(scale, i => `${short}t${i}`, `${long}Top`, rules.spacing)

    buildRuleDict(scale, i => `${short}v${i}`, [`${long}Top`, `${long}Bottom`], rules.spacing)
    buildRuleDict(scale, i => `${short}h${i}`, [`${long}Left`, `${long}Right`], rules.spacing)
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
  rules.backgroundColor = buildRuleDict(colors, i => `bg${i[0].toUpperCase()}${i.slice(1)}`, 'backgroundColor')

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
    'w-auto': {width: 'auto'}
  }
  buildRuleDict(widthScale, i => `w${i+1}`, 'width', rules.width)

  rules.maxWidth = {
    'mw-100': {maxWidth: '100%'}
  }
  buildRuleDict(maxWidthScale, i => `w${i+1}`, 'maxWidth', rules.maxWidth)

  rules.height = {
    'h-25': {height: '25%'},
    'h-50': {height: '50%'},
    'h-75': {height: '75%'},
    'h-100': {height: '100%'},
    'min-h-100': {minHeight: '100%'},
    'vh-25': {height: '25vh'},
    'vh-50': {height: '50vh'},
    'vh-75': {height: '75vh'},
    'vh-100': {height: '100vh'},
    'min-vh-100': {minHeight: '100vh'},
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
    cover: {backgroundSize: 'cover'},
    contain: {backgroundSize: 'contain'},
  }

  rules.borders = {
    ba: {borderStyle: 'solid', borderWidth: 1 },
    bt: {borderTopStyle: 'solid', borderTopWidth: 1 },
    br: {borderRightStyle: 'solid', borderRightWidth: 1 },
    bb: {borderBottomStyle: 'solid', borderBottomWidth: 1 },
    bl: {borderLeftStyle: 'solid', borderLeftWidth: 1 },
    bn: {borderStyle: 'none', borderWidth: 0 },

    'bt-0': {borderTopWidth: 0 },
    'br-0': {borderRightWidth: 0 },
    'bb-0': {borderBottomWidth: 0 },
    'bl-0': {borderLeftWidth: 0 },

    'b--dotted': {borderStyle: 'dotted'},
    'b--dashed': {borderStyle: 'dashed'},
    'b--solid': {borderStyle: 'solid'},
    'b--none': {borderStyle: 'none'}
  }
  buildRuleDict(borderWidthScale, i => `bw${i}`, 'borderWidth', rules.borders)
  buildRuleDict(colors, i => `b--${i}`, 'borderColor', rules.borders)

  rules.borderRadius = {
    'br-100': {borderRadius: '100%'},
    'br-pill': {borderRadius: '9999px'},
    'br--bottom': {borderTopLeftRadius: 0, borderTopRightRadius: 0},
    'br--top': {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
    'br--right': {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
    'br--left': {borderTopRightRadius: 0, borderBottomRightRadius: 0},
  }
  buildRuleDict(borderRadiusScale, i => `br${i}`, 'borderRadius', rules.borderRadius)

  rules.boxShadow = buildRuleDict(boxShadows, i => `shadow-${i}`, 'boxShadow')

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
    list: {istStyleType: 'none' }
  }

  rules.forms = {
    'input-reset': {'WebkitAppearance': 'none', 'MozAppearance': 'none'},
  }

  rules.flex = {
    flex: { display: 'flex'},
    'inline-flex': { display: 'inline-flex'},
    'flex-auto': {flex: '1 1 auto', minWidth: 0},
    'flex-none': {flex: 'none'},
    'flex-column': {flexDirection: 'column'},
    'flex-row': {flexDirection: 'row'},
    'flex-wrap': {flexWrap: 'wrap'},
    'items-start': {alignItems: 'flex-start'},
    'items-end': {alignItems: 'flex-end'},
    'items-center': {alignItems: 'center'},
    'items-baseline': {alignItems: 'baseline'},
    'items-stretch': {alignItems: 'stretch'},
    'self-start': {alignSelf: 'flex-start'},
    'self-end': {alignSelf: 'flex-end'},
    'self-center': {alignSelf: 'center'},
    'self-baseline': {alignSelf: 'baseline'},
    'self-stretch': {alignSelf: 'stretch'},
    'justify-start': {justifyContent: 'flex-start'},
    'justify-end': {justifyContent: 'flex-end'},
    'justify-center': {justifyContent: 'center'},
    'justify-between': {justifyContent: 'space-between'},
    'justify-around': {justifyContent: 'space-around'},
    'content-start': {alignContent: 'flex-start'},
    'content-end': {alignContent: 'flex-end'},
    'content-center': {alignContent: 'center'},
    'content-between': {alignContent: 'space-between'},
    'content-around': {alignContent: 'space-around'},
    'content-stretch': {alignContent: 'stretch'},
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
