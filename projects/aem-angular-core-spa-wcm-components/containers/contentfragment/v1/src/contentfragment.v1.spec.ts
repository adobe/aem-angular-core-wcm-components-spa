/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2020 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';


import {ContentFragmentV1Component} from './contentfragment.v1.component';
import {
    AEMComponentDirective,
    AEMModelProviderComponent,
    Constants,
    MapTo,
    Utils
} from "@adobe/aem-angular-editable-components";

import {ModelManager} from '@adobe/aem-spa-page-model-manager';
import {ContentFragmentV1DefaultRenderer} from "./defaultrenderer/contentfragment.v1.defaultrenderer";
import {ContentFragmentV1Directive} from "./contentfragment.v1.directive";
import {MapToContentFragmentModel, LazyMapToContentFragmentModel} from "./contentfragment.v1.registry";
import {Component, HostBinding, Input, OnInit, Type} from "@angular/core";
import {AbstractContainerComponent} from "@adobe/aem-core-components-angular-spa/core";
import {ContentFragmentV1Element, ContentFragmentV1Properties} from "./model";
import LazyComponent from "../../../../test/lazy-component-wrapper/lazy.component";

@Component({
    selector: 'mycontentfragment-renderer',
    host: {
        '[class]': 'hostClasses',
        '[attr.data-cq-data-path]':'cqPath'
    },
    template: '<div>hi!</div>'
})
export class MyContentFragmentRenderer extends AbstractContainerComponent implements ContentFragmentV1Properties, OnInit{

    @HostBinding('class') baseCssClass = 'cmp-mycontentfragment';

    @Input() description: string;
    @Input() elements: { [p: string]: ContentFragmentV1Element };
    @Input() elementsOrder: string[];
    @Input() model: string;
    @Input() title: string;

    ngOnInit(): void {
        console.log("MyContentFragmentRenderer", this);
    }

}

describe('ContentFragmentV1', () => {

    const LAYOUT = require('../../../../test/data/content-fragment.json');

    let component: ContentFragmentV1Component;
    let fixture: ComponentFixture<ContentFragmentV1Component>;

    let isInEditorSpy;


    beforeEach(() => {

        spyOn(ModelManager, 'addListener').and.returnValue(undefined);
        isInEditorSpy = spyOn(Utils, 'isInEditor').and.returnValue(false);

        TestBed.configureTestingModule({
            declarations: [
                AEMModelProviderComponent,
                MyContentFragmentRenderer,
                AEMComponentDirective,
                ContentFragmentV1Component,
                ContentFragmentV1DefaultRenderer,
                ContentFragmentV1Directive]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    MyContentFragmentRenderer,
                    ContentFragmentV1Component,
                    ContentFragmentV1Directive,
                    ContentFragmentV1DefaultRenderer,
                    AEMModelProviderComponent,
                    AEMComponentDirective
                ]
            }
        }).compileComponents();


        MapTo('core-components-examples/wcm-react/components/content-fragment')(ContentFragmentV1Component);

        fixture = TestBed.createComponent(ContentFragmentV1Component);
        component = fixture.componentInstance;
    });

    it('should render the default renderer and the mapped renderer', async () => {

        MapToContentFragmentModel('testing-frontend-react/models/custom-model')(MyContentFragmentRenderer);

        isInEditorSpy.and.returnValue(true);
        component.cqItems = LAYOUT[Constants.ITEMS_PROP];
        component.cqItemsOrder = LAYOUT[Constants.ITEMS_ORDER_PROP];
        component.classNames = LAYOUT.classNames;
        component.description = LAYOUT.description;
        component.id = LAYOUT.id;
        component.elements = LAYOUT.elements;
        component.elementsOrder = LAYOUT.elementsOrder;
        component.model = LAYOUT.model;
        component.title = LAYOUT.title;

        fixture.detectChanges();

        await fixture.whenStable();

        let element = fixture.debugElement.nativeElement;
        expect(element.querySelectorAll('core-contentfragment-default-renderer-v1').length).toBeGreaterThan(0);
        expect(element.querySelectorAll('.cmp-contentfragment#' + LAYOUT.id).length).toBeGreaterThan(0);
        expect(element.querySelectorAll('.cmp-mycontentfragment').length).toBeGreaterThan(0);
        expect(element.querySelectorAll('mycontentfragment-renderer').length).toBeGreaterThan(0);
        expect(element.querySelectorAll('.cmp-contentfragment__element').length).toBe(5);
        expect(element.querySelectorAll('.cmp-mycontentfragment__element').length).toBe(0);


    });

    it('should show a placeholder if empty in author mode', async () => {

        MapToContentFragmentModel('testing-frontend-react/models/custom-model')(MyContentFragmentRenderer);

        isInEditorSpy.and.returnValue(true);
        component.cqItems = {};
        component.cqItemsOrder = [];
        component.classNames = LAYOUT.classNames;
        component.description = LAYOUT.description;
        component.id = LAYOUT.id;
        component.elements = {};
        component.elementsOrder = [];
        component.model = LAYOUT.model;
        component.title = LAYOUT.title;

        fixture.detectChanges();

        await fixture.whenStable();

        let element = fixture.debugElement.nativeElement;
        expect(element.querySelectorAll('core-contentfragment-default-renderer-v1').length).toBe(0);

        expect(element.querySelectorAll('.cf-placeholder').length).toBe(1);


    });

    it('should not show a placeholder if empty in publish mode', async () => {

        MapToContentFragmentModel('testing-frontend-react/models/custom-model')(MyContentFragmentRenderer);

        isInEditorSpy.and.returnValue(false);
        component.cqItems = {};
        component.cqItemsOrder = [];
        component.classNames = LAYOUT.classNames;
        component.description = LAYOUT.description;
        component.id = LAYOUT.id;
        component.elements = {};
        component.elementsOrder = [];
        component.model = LAYOUT.model;
        component.title = LAYOUT.title;

        fixture.detectChanges();

        await fixture.whenStable();

        let element = fixture.debugElement.nativeElement;
        expect(element.querySelectorAll('core-contentfragment-default-renderer-v1').length).toBe(0);

        expect(element.querySelectorAll('.cf-placeholder').length).toBe(0);


    });

    it('should render the lazy content fragment', async () => {

        LazyMapToContentFragmentModel('testing-frontend-react/models/custom-model')(
            () => new Promise<Type<LazyComponent>>((resolve, reject) => {
                import('../../../../test/lazy-component-wrapper/lazy.component').then((module) => resolve(module.LazyComponent)).catch(reject)
            })
        );

        isInEditorSpy.and.returnValue(true);
        component.cqItems = LAYOUT[Constants.ITEMS_PROP];
        component.cqItemsOrder = LAYOUT[Constants.ITEMS_ORDER_PROP];
        component.classNames = LAYOUT.classNames;
        component.description = LAYOUT.description;
        component.id = LAYOUT.id;
        component.elements = LAYOUT.elements;
        component.elementsOrder = LAYOUT.elementsOrder;
        component.model = LAYOUT.model;
        component.title = LAYOUT.title;

        fixture.detectChanges();

        await fixture.whenStable();

        let element = fixture.debugElement.nativeElement;
        expect(element.querySelectorAll('#lazyContentFragment-' + LAYOUT.id).length).toBe(1);

    });


});
