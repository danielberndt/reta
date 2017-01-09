# retachyons

A very happy marriage between tachyons-css and react – type less, more style.

## Why?

Styling with react tends to be quite a strain on a typical keyboard. So many special characters. And a lot of boilerplate-y code.
Let's learn from the atomic css movement. [tachyons]((http://tachyons.io/) is a prime example of being very expressive with very little code. An experience that promises a big productivity boost once you've learned its [syntax](http://tachyons.io/docs/).

**retachyons** takes this approach even further. Rather than using _classNames_ to describe the style of your component, simply use _attributes_. Much leaner!

## Example code

```jsx
<B.Col pa3 bgWashedBlue hoverLightBlue flexRowNs>
  <B component="img" props={{src, alt: "media"}} w-30 mr3/>
  <B flex-auto f5 white80>{children}</B>
</B.Col>
```

## Features

- media queries via customisable suffixes: `<B pa3 pa5Md/>`
- hover, active, focus states via prefixes: `<B blue hoverDarkBlue/>`
- full power of [glamor](https://github.com/threepointone/glamor/blob/master/docs/jsxstyle.md) for all kinds of fallbacks: `<B w50 style={{opacity: value}} select={[' svg': {height: 12}]}/>`
- support for [server side rendering](https://github.com/threepointone/glamor/blob/master/docs/server.md)
- 4 Basic building blocks: `B`: block, `B.Col`: flexDirection column, `B.Row` flexDirection column, `B.I`: inline-block
  (set your custom display prop via `<B display="inline"/>`)
- Overwritable defaults for colors, scales, etc
- Potential for very nice performance due to fixed set of atomic-rules

## Getting Started

```
npm i retachyons
```

```jsx
import B from retachyons

const Media = ({img, children}) => (
  <B.Col pa3 bgWashedBlue flexRowNs>
    <B component="img" props={{src, alt: "media"}} w-30 mr3/>
    <B flex-auto f5 white80>{children}</B>
  </B.Col>
)
```

## Use your custom colours or scales

**mystyle.js**

```js
import defaultOpts from 'retachyons/defaults'
import builder from 'retachyons/builder'

const opts = {
  ...defaultOpts,
  colors: {
    ...defaultOpts.colors,
    brand: '#aa6633',
    light-brand: '#ffee55',
  },
  mediaQueries: {
    xs: 'screen and (min-width: 0)',
    sm: 'screen and (min-width: 576px)',
    md: 'screen and (min-width: 768px)',
    lg: 'screen and (min-width: 992px)',
    xl: 'screen and (min-width: 1200px)'
  },
}

export default builder(defaultOpts)
```

```jsx
import B from './mystyle'

const Component = () => (
  <B pa1Xs pa3Md bgBrand hoverBgLightBrand/>
)
```

## Contribute

- clone the repo
- `npm install && cd samples && npm install`
- for running the sample project: `cd samples && npm run dev` and open `http://localhost:8080/`

## License

ISC
