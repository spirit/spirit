export as namespace spirit;
export = spiritjs

import {
    TweenLite, TweenMax,
    TimelineLite, TimelineMax
} from 'gsap';

type GSAPTimeline = TimelineLite | TimelineMax;
type GSAPTween = TweenLite | TweenMax

interface EvalMap {
    regex: RegExp,
    map: any
}

interface List {
    duplicates: boolean | object,

    checkOnDuplicates(): void,

    sortOn(): boolean | string,

    sort(): void,

    linkedList: boolean,

    linkItems(): void,

    list: any[],

    length: number,

    at(index: number): any,

    add(item: any): any,

    remove(item: any): any,

    clear(): void,

    each(callback: () => any): void,

    toArray(): any[]
}

interface Props extends List {
    mappings: EvalMap[],

    get(name: string): Prop,

    add<T>(prop: Prop | object | Array<Prop | object>): T,

    remove<T>(prop: Prop | Prop[]): T,

    haveProp(name: string): boolean,

    toObject(): object,

    destroy(): void
}

interface Prop {
    keyframes: Keyframes,
    list: List,

    next(): Prop | null,

    prev(): Prop | null,

    setupBubbleEvents(): void,

    toObject(): object,

    isCSSTransform(): boolean,

    destroy(): void
}

interface Keyframes extends List {
    get(time: string | number): Keyframe,

    add<T>(keyframe: Keyframe | object | Array<Keyframe | object>): T,

    remove<T>(keyframe: Keyframe): T,

    mappings(): EvalMap[],

    toObject(): object,

    destroy(): void
}

interface Keyframe {
    time: number,
    ease?: string,
    value: any,
    list: List,

    prev(): Keyframe | null,

    next(): Keyframe | null,

    isEval(): boolean,

    toObject(): object,

    destroy(): void
}

interface Timelines extends List {
    get(transformObject: HTMLElement | object): Timeline
}

interface Timeline {
    type: 'dom' | 'object',
    transferObject: HTMLElement | object | null,
    label?: string,
    path: string,
    id?: string,
    props: Props,

    toObject(): object,

    destroy(): void
}

interface config {
    gsap: {
        tween: GSAPTween,
        timeline: GSAPTimeline,
        autoInject: boolean,
        autoInjectUrl: string
    }
}

interface SetupConfig {
    timeline?: GSAPTimeline,
    tween?: GSAPTween
}

interface Groups extends List {
    add(group: Group): void,

    get(name: string): Group,

    groupNames(): string[]
}

interface Group {
    timeline: GSAPTimeline,
    timelines: Timelines,
    timeScale: number,
    duration: number,
    name: string,
    toObject(): object,
    construct(): GSAPTimeline
}

interface DataTimeline {
    type: 'dom' | 'object',
    id?: string,
    label?: string,
    path?: string,
    props?: object
}

interface DataGroup {
    name: string,
    timeScale?: number,
    timelines?: DataTimeline[]
}

declare namespace spiritjs {
    export const config: config;
    export const version: string;

    export function setup(config: SetupConfig): Promise;
    export function create(data: DataGroup | DataGroup[], element: HTMLElement)
    export function load(url: string, element: HTMLElement)

    export const groups: Groups;
}

