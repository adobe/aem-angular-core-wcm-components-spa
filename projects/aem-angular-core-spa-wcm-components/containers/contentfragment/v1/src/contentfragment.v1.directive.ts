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

import {Directive, Type} from '@angular/core';
import {AEMComponentDirective, ComponentMappingProvider} from "@adobe/aem-angular-editable-components";
import {ContentfragmentV1Registry} from "./contentfragment.v1.registry";
import {ContentFragmentV1DefaultRenderer} from "./defaultrenderer/contentfragment.v1.defaultrenderer";

@Directive({
  selector: '[aemContentFragment]'
})

export class ContentFragmentV1Directive extends AEMComponentDirective {

    getFallbackComponent():Type<unknown> | null{
        return ContentFragmentV1DefaultRenderer;
    }

    getComponentMappingProvider():ComponentMappingProvider  {
        return ContentfragmentV1Registry;
    }

    getType(): string | undefined {
        return this.cqItem && this.cqItem["model"];
    }

}
