import { HXElement } from './HXElement';
import { KEYS } from '../util';

export class HXDisclosureElement extends HXElement {
    static get is () {
        return 'hx-disclosure';
    }

    static get observedAttributes () {
        return [ 'aria-expanded' ];
    }

    connectedCallback () {
        this.$upgradeProperty('expanded');
        this.setAttribute('role', 'button');
        this.setAttribute('tabindex', 0);

        if (this.target) {
            this.expanded = this.target.hasAttribute('open');
        } else {
            this.expanded = false;
        }

        this.addEventListener('click', this._toggle);
        this.addEventListener('keydown', this.$preventScroll);
        this.addEventListener('keyup', this._keyUp);
    }

    disconnectedCallback () {
        this.removeEventListener('click', this._toggle);
        this.removeEventListener('keydown', this.$preventScroll);
        this.removeEventListener('keyup', this._keyUp);
    }

    attributeChangedCallback (attr, oldVal, newVal) {
        if (this.target) {
            this.target.open = (newVal === 'true');
        }
    }

    get expanded () {
        return this.getAttribute('aria-expanded') === 'true';
    }

    set expanded (newVal) {
        this.setAttribute('aria-expanded', !!newVal);
    }

    get target () {
        if (!this._target) {
            let targetId = this.getAttribute('aria-controls');
            this._target = document.getElementById(targetId);
        }
        return this._target;
    }

    _keyUp (event) {
        switch (event.keyCode) {
            case KEYS.Space:
            case KEYS.Enter:
                this._toggle();
                break;
            default:
                break;
        }
    }

    _toggle () {
        this.expanded = !this.expanded;
    }
}//HXDisclosureElement
