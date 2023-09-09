
class ScrollAnimations {
    constructor({ id, animation, onlyOnce, viewport}) {
        let element = null;
        try {
            if(!id) throw new Error('id of an element not given');
            if(typeof id === 'string' || id instanceof String) this.id = id;
            element = (this.id) ? document.getElementById(id) : null;
            if(!element) throw new Error('id not found');
            if(!animation && typeof animation !== 'object' && Array.isArray(animation)) throw new Error('animation params must be given as object');
            else if(!animation.type) throw new Error('\'type\' property for \'animation\' is mandatory');
            for (const key in animation) {
                if (Object.hasOwnProperty.call(animation, key)) {
                    const value = animation[key];
                    if(value && typeof value !== 'string' && !value instanceof String) throw new Error(`${key} must be a string, '${value}' given`);
                }
            }
            if(typeof onlyOnce !== 'undefined' && typeof onlyOnce !== 'boolean') throw new Error('onlyOnce param must be a boolean');
            if(viewport && typeof viewport !== 'object' && Array.isArray(viewport)) throw new Error('viewport params must be given as object');
            for (const key in viewport) {
                if (Object.hasOwnProperty.call(viewport, key)) {
                    const value = viewport[key];
                    if(value && typeof value !== 'string' && !value instanceof String) throw new Error(`${key} must be a string, ${value} given`);
                    else if(!value.length && !value.match(/^\-[0-9]{2}%$/)) throw new Error(`${key} must be negative % value, '${value}' given`);
                }
            }

        } catch (error) {
            console.error(error);
            return;
        }

        // Defaults
        animation.duration = animation.duration ? animation.duration : '1000ms';
        animation.timingFunc = animation.timingFunc ? animation.timingFunc : 'ease-out';
        animation.delay = animation.delay ? animation.delay : '0ms';


        this.element = element; // DOM Element to animate
        this.animation = animation; // animation options
        this.onlyOnce = onlyOnce;
        this.viewport = viewport;
        this.animated = false;
        if(this.animation.type === 'blur'){
            this.animation.blurValue = animation.blurValue;
            this.onlyOnce = true;
        }

        this.init();

    }

    init() {
        const styleElem = document.createElement('style');
        styleElem.innerHTML = '';
        let style = '';
        let animationStyle = '';
        switch (this.animation.type) {
            case 'fade-in':
                style += `opacity: 0; transition: ${getComputedStyle(this.element).getPropertyValue('transition') != 'all 0s ease 0s' ? getComputedStyle(this.element).getPropertyValue('transition') + ',': ''} opacity ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};`;
                animationStyle += `opacity: 1;`;
                break;
            case 'slide-left':
                style += `transform: translateX(-100%); transition: ${getComputedStyle(this.element).getPropertyValue('transition') != 'all 0s ease 0s' ? getComputedStyle(this.element).getPropertyValue('transition') + ',': ''} transform ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};`;
                animationStyle += `transform: translateX(0);`;
                break;
            case 'slide-right':
                style += ` transform: translateX(100%); transition: ${getComputedStyle(this.element).getPropertyValue('transition') != 'all 0s ease 0s' ? getComputedStyle(this.element).getPropertyValue('transition') + ',': ''} transform ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};`;
                animationStyle += `transform: translateX(0);`;
                break;
            case 'slide-top':
                style += `transform: translateY(-100%); transition: ${getComputedStyle(this.element).getPropertyValue('transition') != 'all 0s ease 0s' ? getComputedStyle(this.element).getPropertyValue('transition') + ',': ''} transform ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};`;
                animationStyle += `transform: translateY(0);`;
                break;
            case 'slide-bottom': 
                style += `transform: translateY(100%); transition: ${getComputedStyle(this.element).getPropertyValue('transition') != 'all 0s ease 0s' ? getComputedStyle(this.element).getPropertyValue('transition') + ',': ''} transform ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};`;
                animationStyle += `transform: translateY(0);`;
                break;
            case 'blur': 
                style += `filter: blur(${ this.animation?.blurValue ? this.animation.blurValue : '5px' }); transition: ${getComputedStyle(this.element).getPropertyValue('transition') != 'all 0s ease 0s' ? getComputedStyle(this.element).getPropertyValue('transition') + ',': ''} filter ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};`;
                animationStyle += `filter: blur(0);`;
                break;
            default:
                throw new Error('Not a valid animation type');
        }

        this.element.classList.add(this.animation.type);
            styleElem.innerHTML += `
            #${this.id}.${this.animation.type} { ${style} }
            #${this.id}.${this.animation.type}.animate { ${animationStyle} }
        `;
        console.log(getComputedStyle(this.element).getPropertyValue('transition'));

        
        this.element.appendChild(styleElem);

        const observerConfig = {
            /**
             * This rootMargin creates a horizontal line vertically centered
             * that will help trigger an intersection at that the very point.
             */
            // rootMargin: '-50% 0% -50% 0%', // center
            rootMargin: `${this?.viewport?.top ? this.viewport.top : '-30%'} 0% ${this?.viewport?.bottom ? this.viewport.bottom : '-30%'} 0%`,
          
            /**
             * This is the default so you could remove it.
             * I just wanted to leave it here to make it more explicit
             * as this threshold is the only one that works with the above
             * rootMargin
             */
            threshold: 0
          };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('animate');
                    if(this.onlyOnce) this.animated = true;
                }
                else if(this.animated) entry.target.classList.remove(this.animation.type);
                else entry.target.classList.remove('animate');

            });
        }, observerConfig);
        observer.observe(this.element);
        this.observer = observer;
    }
}

// new ScrollAnimations({
//     id: 'test-animation',
//     animation: {
//         // property: 'opacity', // mandatory
//         type: 'fade-in', // mandatory
//         duration: '1000ms', // default 1000ms
//         // timingFunc: 'ease-in', // default 'ease-in'
//         // delay: '1000ms', // default 0
//     },
//     // viewport: {top: '-50%', bottom: '-50%'}, // default top: -30% bottom: -30%
//     onlyOnce: true // default false/undefined
// });

new ScrollAnimations({
    id: 'test-animation',
    animation: {
        type: 'blur',
        blurValue: '100px', // animation might finish early if this value is to large
        duration: '1500ms',
        // timingFunc: 'ease-in'
    },
    // onlyOnce: true,
    // viewport: {top: '-50%', bottom: '-50%'},
});

export { ScrollAnimations };