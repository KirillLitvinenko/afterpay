/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CustomSelect {
        "itemHeight": number;
        "itemWidth": number;
        "itemsToShow": number;
        "mainColor": string;
        "selectCurrency": string;
        "selectId": string;
        "selectName": string;
        "selectOptions": any[] | string;
        "selectPeriod": string;
        "selectedMarkerText": string;
    }
}
declare global {
    interface HTMLCustomSelectElement extends Components.CustomSelect, HTMLStencilElement {
    }
    var HTMLCustomSelectElement: {
        prototype: HTMLCustomSelectElement;
        new (): HTMLCustomSelectElement;
    };
    interface HTMLElementTagNameMap {
        "custom-select": HTMLCustomSelectElement;
    }
}
declare namespace LocalJSX {
    interface CustomSelect {
        "itemHeight"?: number;
        "itemWidth"?: number;
        "itemsToShow"?: number;
        "mainColor"?: string;
        "selectCurrency"?: string;
        "selectId"?: string;
        "selectName"?: string;
        "selectOptions"?: any[] | string;
        "selectPeriod"?: string;
        "selectedMarkerText"?: string;
    }
    interface IntrinsicElements {
        "custom-select": CustomSelect;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "custom-select": LocalJSX.CustomSelect & JSXBase.HTMLAttributes<HTMLCustomSelectElement>;
        }
    }
}
