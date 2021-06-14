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

import {Component, Input, OnInit} from '@angular/core';
import {ContentFragmentV1Component,ContentFragmentV1Properties} from "../../containers/contentfragment/v1/src/public-api";


@Component({
    selector: 'lazy-comp',
    template: `<div id="lazyContentFragment-{{id}}">hi!</div>`
})
/**
 * The current class carries the base presentational logic of the AEM Layout Container (aka. Responsive grid)
 */
export class LazyComponent extends ContentFragmentV1Component implements ContentFragmentV1Properties, OnInit {
    ngOnInit(): void {
        console.log("test")
    }

}

export default LazyComponent;
