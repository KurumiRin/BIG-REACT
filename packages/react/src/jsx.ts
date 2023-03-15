/* eslint-disable @typescript-eslint/no-explicit-any */
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
    Type,
    Key,
    Ref,
    Props,
    ReactElementType,
    ElementType
} from 'shared/ReactTypes';

// ReactElement
const ReactElement = function (
    type: Type,
    key: Key,
    ref: Ref,
    props: Props
): ReactElementType {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        props,
        __mark: 'KurumiRin' // react中没有该字段,仅作为该big-react标识
    };

    return element;
};

export const jsx = (
    type: ElementType,
    config: Record<string, any>,
    ...maybeChildren: any
) => {
    let key: Key = null;
    const props: Props = {};
    let ref: Ref = null;
    // 处理config
    for (const prop in config) {
        const val = config[prop];
        // 赋值key
        if (prop === 'key') {
            if (val !== undefined) {
                key = '' + val;
            }
            continue;
        }
        // 赋值ref
        if (prop === 'ref') {
            if (val !== undefined) {
                ref = val;
            }
            continue;
        }
        // 判断是不是非原型链的prop
        if ({}.hasOwnProperty.call(config, prop)) {
            props[prop] = val;
        }
    }

    // 处理maybeChildren
    const maybeChildrenLength = maybeChildren.length;
    if (maybeChildrenLength) {
        // [child]   [child,child,child]
        if (maybeChildrenLength === 1) {
            props.children = maybeChildren[0];
        } else {
            props.children = maybeChildren;
        }
    }

    return ReactElement(type, key, ref, props);
};

// 开发环境的jsx,不过该项目不实现
export const jsxDEV = jsx;
