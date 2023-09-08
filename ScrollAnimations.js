
/*
    fade-in animate
    slide-left animate
    slide-right animate
    slide-top animate
    slide-bottom animate

*/

class ScrollAnimations {
    constructor({ id, animation}) {
        let element = null;
        try {
            if(!id) throw new Error('id of an element not given');
            if(typeof id === 'string' || id instanceof String) this.id = id;
            element = (this.id) ? document.getElementById(id) : null;
            if(!element) throw new Error('id not found');
            if(!animation && typeof animation === 'object' && !Array.isArray(animation)) throw new Error('animation params must be given as object');
            // else if(animation.property) throw new Error('property for animation is mandatory');
            else if(!animation.type) throw new Error('type for animation is mandatory');
            for (const key in animation) {
                if (Object.hasOwnProperty.call(animation, key)) {
                    const value = animation[key];
                    if(value && typeof value !== 'string' && !value instanceof String) throw new Error(`${key} must be a string, ${value} given`);
                }
            }
        } catch (error) {
            console.error(error);
            return;
        }

        // Defaults
        animation.duration = animation.duration ? animation.duration : '1000ms';
        animation.timingFunc = animation.timingFunc ? animation.timingFunc : 'ease-in';
        animation.delay = animation.delay ? animation.delay : '0';


        this.element = element; // DOM Element to animate
        this.animation = animation; // animation options
        
        // initStyles();
        // initObserver();
        this.init();

    }

    init() {
        const styles = document.createElement('style');
        styles.innerHTML = '';

        switch(this.animation.type) {
            case 'fade-in':
                this.element.classList.add('fade-in');
                styles.innerHTML += `
                #${this.id}.fade-in {
                    opacity: 0;
                    transition: opacity ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};
                }
                #${this.id}.fade-in.animate {
                    opacity: 1;
                }
                `;
                break;
            case 'slide-left':
                this.element.classList.add('slide-left');
                styles.innerHTML += `
                #${this.id}.slide-left {
                    transform: translateX(-100%);
                    transition: transform ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};
                }
                #${this.id}.slide-left.animate {
                    transform: translateX(0);
                }
                `;
                break;
            case 'slide-right':
                this.element.classList.add('slide-right');
                styles.innerHTML += `
                #${this.id}.slide-right {
                    transform: translateX(100%);
                    transition: transform ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};
                }
                #${this.id}.slide-right.animate {
                    transform: translateX(0);
                }
                `;
                break;
            case 'slide-bottom':
                this.element.classList.add('slide-bottom');
                styles.innerHTML += `
                #${this.id}.slide-bottom {
                    transform: translateY(100%);
                    transition: transform ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};
                }
                #${this.id}.slide-bottom.animate {
                    transform: translateY(0);
                }
                `;
                break;
            case 'slide-top':
                this.element.classList.add('slide-top');
                styles.innerHTML += `
                #${this.id}.slide-top {
                    transform: translateY(-100%);
                    transition: transform ${this.animation.duration} ${this.animation.timingFunc} ${this.animation.delay};
                }
                #${this.id}.slide-top.animate {
                    transform: translateY(0);
                }
                `;
                break;
        }
        this.element.appendChild(styles);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // console.log(entry.isIntersecting);
                // console.log(entry.target.style.transition);
                if(entry.isIntersecting){
                    entry.target.classList.add('animate');
                    // setTimeout(_ => {
                    //     this.observer.unobserve(this.element);
                    //     this.element.remove(styles);
                    //     this.element.classList.remove(this.animation.type);
                    // }, 10000);
                }
                else entry.target.classList.remove('animate');
            })
        });
        observer.observe(this.element);
        this.observer = observer;
    }

    initStyles() {
        // switch(this.animation.type) {
        //     case 'fade-in':
        //     case 'slide-left':
        //     case 'slide-right':
        //     case 'slide-top':
        //     case 'slide-bottom':
        //         this.element.classList.add(this.animation.type);
        //         break;
        //     default: 
        //         throw new Error('Invalid animation type');
        // }
        // const styles = document.createElement('style');
        // styles.innerHTML = '';

        // switch(this.animation.type) {
        //     case 'fade-in':
        //         styles += `
        //         ${this.id}.fade-in {
        //             opacity: 0;
        //             /* transition: opacity 1s ease-in; */
        //             transition: all 1s ease-in;
        //         }
        //         ${this.id}.fade-in.animate {
        //             opacity: 1;
        //         }
        //         `;
        //         break;
        //     // case 'slide-left':
        //     //     break;
        //     // case 'slide-right':
        //     //     break;
        //     // case 'slide-top':
        //     //     break;
        //     // case 'slide-bottom':
        //     //     break;
        // }
        // this.element.appendChild(styles);
    }
}

new ScrollAnimations({
    id: 'test-animation',
    animation: {
        // property: 'opacity', // mandatory
        type: 'slide-top', // mandatory
        duration: '1000ms', // default 1000ms
        timingFunc: 'ease-in', // default 'ease-in'
        // delay: '1000ms', // default 0
    }
});

export { ScrollAnimations };