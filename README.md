# retachyons

A very happy marriage between tachyons-css and react – type less, more style.

> **Warning** this is work on progress and not used in production anywhere, tread carefully!

## Why?

Styling with react tends to be quite a strain on a typical keyboard. So many special characters. And a lot of boilerplate-y code.
Let's learn from the atomic css movement. [tachyons](http://tachyons.io/) is a great example of how to be very expressive with very little code. An experience that promises a big productivity boost once you've learned its [syntax](http://tachyons.io/docs/).

**retachyons** takes this approach even further. Rather than using _classNames_ to describe the style of your component, simply use _attributes_. So much leaner in react land!

## Example code

```css
// index.css
@import 'retachyons/loader!reachyons/defaults'
```

```jsx
// component.js
import B from retachyons

const Col = props => <B flex flexColumn {...props}/>

<Col pa3 bgWashedBlue hoverLightBlue flexRowNs>
  <B component="img" src={img} alt="media" w30 mr3/>
  <B flex-auto f5 white80>{children}</B>
</Col>
```

## Features

- media queries via customisable suffixes: `<B pa3 pa5Md/>`
- hover, active, focus states via prefixes: `<B blue hoverDarkBlue/>`
- makes it quite easy to combine it with your preferred styling approach
- support for server side rendering
- Overwritable defaults for colors, scales, etc
- Support for camelCase and kebabCase: `<B bg-dark-green/>` and `<B bgDarkGreen/>`
- Extremely performant since all the work is done on compile time. The runtime simply sets class names on your components.

## Getting Started

```
npm i retachyons
```

```jsx
import B from retachyons

const Col = props => <B flex flexColumn {...props}/>

const Media = ({img, children}) => (
  <Col pa3 bgWashedBlue flexRowNs>
    <B component="img" src={img} alt="media" w30 mr3/>
    <B flexAuto f5 white80>{children}</B>
  </Col>
)
```

## Use your custom colours or scales

**mystyle.js**

```js
import defaultOpts from 'retachyons/defaults'
import rulesBuilder from 'retachyons/rules-builder'
import componentBuilder from 'retachyons/component-builder'

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

export default componentBuilder(rulesBuilder(opts)))
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
