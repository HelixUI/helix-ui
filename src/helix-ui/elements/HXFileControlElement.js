import { HXFormControlElement } from './HXFormControlElement';

/**
 * Defines behavior for the `<hx-file-control>` element.
 *
 * @extends HXFormControlElement
 * @hideconstructor
 */
export class HXFileControlElement extends HXFormControlElement {
    /** @override */
    static get is () {
        return 'hx-file-control';
    }

    /**
     * Fetch the first `<input type="file">` descendant
     *
     * @override
     * @readonly
     * @type {?HTMLInputElement}
     */
    get controlElement () {
        return this.querySelector('input[type="file"]');
    }
}
