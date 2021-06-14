import {Component, HostBinding, Input} from "@angular/core";
import {AbstractContainerComponent} from "@adobe/aem-core-components-angular-spa/core";
import {ContentFragmentV1Element, ContentFragmentV1Properties} from "../model";

@Component({
    selector: 'core-contentfragment-default-renderer-v1',
    host: {
        '[class]': 'hostClasses',
        '[attr.data-cq-data-path]':'cqPath'
    },
    templateUrl: './contentfragment.v1.defaultrenderer.html'
})
export class ContentFragmentV1DefaultRenderer extends AbstractContainerComponent implements ContentFragmentV1Properties{

    @HostBinding('class') baseCssClass = 'cmp-contentfragment';

    @Input() description: string;
    @Input() elements: { [p: string]: ContentFragmentV1Element };
    @Input() elementsOrder: string[];
    @Input() model: string;
    @Input() title: string;

    getElement(element:string) {
        return this.elements[element];
    }

    shouldShowElements():boolean{
        return this.elementsOrder && this.elementsOrder.length > 0;
    }


}