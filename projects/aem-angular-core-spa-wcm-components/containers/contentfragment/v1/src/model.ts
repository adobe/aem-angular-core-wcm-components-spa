import {MappedComponentProperties} from "@adobe/aem-angular-editable-components";
import {ContainerProperties, HasBaseCssClass} from "@adobe/aem-core-components-angular-spa/core";

export interface ContentFragmentV1Element {
    "dataType": string
    "value": string
    "title": string
    ":type": string
    "multiValue": boolean
}

export interface ContentFragmentV1Properties extends ContainerProperties, MappedComponentProperties, HasBaseCssClass {

    id: string
    title: string
    description: string,
    elements: { [key: string]: ContentFragmentV1Element }
    elementsOrder: string[]
    model: string

}