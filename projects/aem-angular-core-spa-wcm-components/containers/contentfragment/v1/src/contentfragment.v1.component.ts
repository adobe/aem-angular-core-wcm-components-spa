/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import {Component, Input} from "@angular/core";
import {ContentFragmentV1Element, ContentFragmentV1Properties} from "./model";
import {AbstractContainerComponent} from "@adobe/aem-core-components-angular-spa/core";

const ITEM_KEY = "fragment";

@Component({
    selector: 'core-contentFragment-v1',
    host: {
        '[class]': 'hostClasses',
        '[attr.data-cq-data-path]':'cqPath'
    },
    templateUrl: './contentfragment.v1.component.html'
})
export class ContentFragmentV1Component extends AbstractContainerComponent implements ContentFragmentV1Properties{

    @Input() description: string;
    @Input() elements: { [p: string]: ContentFragmentV1Element };
    @Input() elementsOrder: string[];
    @Input() model: string;
    @Input() title: string;

    showFragment(){
        return !ContentFragmentV1IsEmptyFn(this);
    }

    showPlaceHolder(){
        return ContentFragmentV1IsEmptyFn(this) && this.isInEditMode;
    }

    getItemSelf(){
        return this;
    }

    getPathSelf(){
        return this.cqPath;
    }

    getItemKey(){
        return ITEM_KEY;
    }
}

export function ContentFragmentV1IsEmptyFn(props:ContentFragmentV1Properties) {
    return (props.elementsOrder == null || props.elementsOrder.length === 0) && (props.cqItemsOrder == null || props.cqItemsOrder.length === 0);
}