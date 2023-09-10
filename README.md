
# ScrollAnimations: Scroll Animations using JS

To add beautiful scroll animations on websites.


## Documentation

### Import 
Add script tag in html
```html
<script defer type="module" src="js/ScrollAnimations.js"></script>
```

You can import the ScrollAnimations class
```javascript
import { ScrollAnimations } from "./ScollAnimations.js";
```

### Animation Types

Type | Description
---- | -----------
**fade-in** | Animation for fading in.
**slide-x** | Animation of sliding from left or right.
**slide-y** | Animatino of sliding from top or bottom.
**blur** | Animation for blur.

### Options

- **id**: Id of element as string.
- **animation**: Animation object for defining animation. Following are the options for `animation`:
    - **type**: Type of animation. This is a mandatory option. Value should be a valid animation type.
    - **duration**: Duration of animation in milliseconds. Defaults to `1000`.
    - **timingFunc**: Timing Function for animation. Defaults to `ease-out`.
    - **delay**: Delay for animation in milliseconds. Defaults to `0`.
- **onlyOnce**:  Set to true to have animation run only once.
- **viewport**: Viewport object for defining animation area. Following are the options for `viewport`:
    - **top**: Negative % value for top of animation area. Defaults to `-30%`.
    - **bottom**: Negative % value for bottom of animation area. Defaults to `-30%`.
- **slideValue**: Value for `slide-x` type. Must be less than or equal to 50 for vh or vw units to avoid unexpected behavior. Defaults to `-100%` for `slide-x` and `100%` for `slide-y`.
- **blurValue**: Value for `blur` type. Animation might finish early if value is too large. Defaults to `100px`.

## Usage/Examples

```javascript
import { ScrollAnimations } from "./ScrollAnimations.js";

new ScrollAnimations({
    id: 'test-animation',
    animation: {
        type: 'fade-in',
        duration: '800ms',
        delay: '200ms',
    }
});
new ScrollAnimations({
    id: 'test-animation',
    animation: {
        type: 'slide-x',
        slideValue: '-100%',
        duration: '1000ms',
    }
});
```


## Authors

- [@salman9802](https://www.github.com/salman9802)

