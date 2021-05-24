import {ContainerModel} from "./models";

export function ContainerIsEmptyFn(props:ContainerModel){
    return props[":itemsOrder"] == null || props[":itemsOrder"].length === 0;
}
