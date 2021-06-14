/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ComponentMapping as SPAComponentMapping} from '@adobe/aem-spa-component-mapping';
import {Type} from '@angular/core';
import {ContentFragmentV1Properties} from "./model";
import {ComponentMappingProvider} from '@adobe/aem-angular-editable-components';

const MODEL_PREFIX = "ContentFragmentV1-"


/**
 * The current class extends the @adobe/cq-spa-component-mapping#Mapto library and features with Angular specifics such as
 *
 * - Storing the editing configurations for each resource type
 */
export class ContentfragmentV1RegistryImpl implements ComponentMappingProvider{

    constructor(private spaMapping: SPAComponentMapping) {}


    /**
     * Stores a component class for the given resource types and also allows to provide an EditConfig object
     * @param models - List of resource types
     * @param clazz - Component class to be stored
     * @type Model - The Model interface / class type bound to the editconfig object.
     */
    mapRenderer<Model extends ContentFragmentV1Properties = any>(models: string | string[], clazz:Type<Model>) : void {
        const innerClass = clazz;

        const resourceList = (typeof models === 'string') ? [ models ] : models;

        resourceList.forEach((model) => {
            this.spaMapping.map(this.getModelKey(model), innerClass);
        });

    }

    /**
     * Stores a  component class for the given resource types and also allows to provide an EditConfig object in a Lazy Manner
     * @param models - List of models
     * @param lazyClassFunction - A function that returns a promise to give back the designated type / class
     * @type Model - The Model interface / class type bound to the editconfig object.
     */
    lazyMap<Model extends ContentFragmentV1Properties = any>(models:string|string[], lazyClassFunction: () => Promise<Type<Model>>) {
        const modelList = (typeof models === 'string') ? [ models ] : models;

        modelList.forEach((entry) => {
            this.spaMapping.lazyMap(this.getModelKey(entry), lazyClassFunction);
        });
    }

    /**
     * Returns the component class for the given resourceType
     * @param model - Resource type for which the component class has been stored
     * @type Model - The Model interface / class type bound to the editconfig object.
     */
    get(model:string):Type<unknown> {
        return this.spaMapping.get(this.getModelKey(model)) as Type<unknown>;
    }

    lazyGet(resourceType: string): Promise<Type<unknown>> {
        return this.spaMapping.getLazy(this.getModelKey(resourceType)) as Promise<Type<unknown>>;
    }

    getModelKey(modelType:string){
        return MODEL_PREFIX + modelType;
    }
}

const contentFragmentRegistry = new ContentfragmentV1RegistryImpl(SPAComponentMapping);

/**
 * Stores a component class for the given resource types and also allows to provide an EditConfig object
 * @param resourceTypes - List of resource types
 * @type Model - The Model interface / class type that will be Mapped. Bound to the EditConfig configuration.
 */
function MapToContentFragmentModel<Model extends ContentFragmentV1Properties = any>(resourceTypes: string | string[]) {
    /**
     * @param clazz - Component class to be stored
     * @param [editConfig] - Edit configuration to be stored for the given resource types
     */
    return (clazz:Type<Model>): void =>
        contentFragmentRegistry.mapRenderer(resourceTypes, clazz);
}

/**
 * Stores a clazz the lazy way for dynamic imports / code splitting.function that returns a promise
 * @param resourceTypes - List of resource types
 * @type Model - The Model interface / class type that will be Mapped. Bound to the EditConfig configuration.
 */
function LazyMapToContentFragmentModel<Model extends ContentFragmentV1Properties = any>(resourceTypes: string | string[]) {
    /**
     * @param lazyClassPromise - Function that returns a promise resolving a class
     * @param [editConfig] - Edit configuration to be stored for the given resource types
     */
    return (lazyClassFunction: () => Promise<Type<Model>>): void =>
        contentFragmentRegistry.lazyMap(resourceTypes, lazyClassFunction);
}

export { contentFragmentRegistry as ContentfragmentV1Registry, MapToContentFragmentModel, LazyMapToContentFragmentModel };