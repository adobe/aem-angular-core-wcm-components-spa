import {ContainerIsEmptyFn} from './container.isempty';
import {ContainerProperties} from './models';

describe('AbstractContainerComponent', () => {

    it('invalidates an empty object', () => {

        const emptyModel:ContainerProperties = {
            cqPath: "/empty/path",
            itemName: "",
            cqItems: {},
            cqItemsOrder: []
        };

        expect(ContainerIsEmptyFn(emptyModel)).toBeTrue();

    });

    it('validates an containing object', () => {

        const emptyModel:ContainerProperties = {
            cqPath: "/empty/path",
            itemName: "",
            cqItems: {
                "testComp": {

                }
            },
            cqItemsOrder: [ "testComp" ]
        };

        expect(ContainerIsEmptyFn(emptyModel)).toBeFalse();

    });


})