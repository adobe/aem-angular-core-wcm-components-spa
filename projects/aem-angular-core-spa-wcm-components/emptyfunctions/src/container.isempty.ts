import {ContainerProperties} from "./models";

export function ContainerIsEmptyFn(props:ContainerProperties){
    return props.cqItemsOrder == null || props.cqItemsOrder.length === 0;
}
