import gsap from 'gsap';

declare var spirit: spirit.SpiritStatic;

export = spirit;
export as namespace spirit;

declare namespace spirit {
  type GSAP = typeof gsap;

  interface SpiritStatic {
    config: Config;

    version: string;

    setup(gsapInstance: GSAP): Promise<void>;

    create(data: DataGroup | DataGroup[], element?: Element): Groups;

    load(url: string, element?: Element): Promise<Groups>;

    groups: Groups;

    loadAnimation(
      options: LoadAnimationOptions
    ): Promise<{ [group: string]: gsap.core.Timeline } & gsap.core.Timeline>;
  }

  type LoadAnimationOptions = ({ path: string } | { animationData: object }) &
    Partial<{
      container: Element;

      autoPlay: boolean;

      loop: boolean | number;

      yoyo: boolean;

      delay: number;

      timeScale: number;
    }>;

  interface EvalMap {
    regex: RegExp;

    map: any;
  }

  type sortFn = (a: number | object, b: number | object) => number | boolean;

  interface List<T> extends Iterable<T> {
    [key: number]: T;

    [Symbol.iterator](): Iterator<T>;

    duplicates: boolean | object;

    checkOnDuplicates(): void;

    sortOn: boolean | string | sortFn;

    sort(): void;

    linkedList: boolean;

    linkItems(): void;

    list: T[];

    length: number;

    at(index: number): T;

    add(item: T | object | Array<T | object>): T | T[];

    remove(item: T | T[]): T | T[];

    clear(): void;

    each<K>(callback: (item: T) => K): K[];

    toArray(): T[];
  }

  interface Props extends List<Prop> {
    mappings: EvalMap[];

    get(name: string): Prop;

    haveProp(name: string): boolean;

    toObject(): object;

    destroy(): void;
  }

  interface Prop {
    keyframes: Keyframes;

    list: Props;

    next(): Prop | null;

    prev(): Prop | null;

    setupBubbleEvents(): void;

    toObject(): object;

    isCSSTransform(): boolean;

    destroy(): void;
  }

  interface Keyframes extends List<Keyframe> {
    get(time: string | number): Keyframe;

    mappings(): EvalMap[];

    toObject(): object;

    destroy(): void;
  }

  interface Keyframe {
    time: number;

    ease?: string;

    value: any;

    list: Keyframes;

    prev(): Keyframe | null;

    next(): Keyframe | null;

    isEval(): boolean;

    toObject(): object;

    destroy(): void;
  }

  interface Timelines extends List<Timeline> {
    get(transformObject: Element | object): Timeline;
  }

  interface Timeline {
    type: 'dom' | 'object';

    transferObject: Element | object | null;

    label?: string;

    path: string;

    id?: string;

    props: Props;

    toObject(): object;

    destroy(): void;
  }

  interface Config {
    debug: boolean;

    overwriteAnimations: boolean;

    gsap: {
      instance: GSAP | null;

      autoInject: boolean;

      autoInjectUrl: string;
    };
  }

  interface Groups extends List<Group> {
    get(name: string): Group;

    groupNames(): string[];
  }

  interface Group {
    timeline: gsap.core.Timeline;

    timelines: Timelines;

    timeScale: number;

    duration: number;

    list: Groups;

    name: string;

    toObject(): object;

    construct(): gsap.core.Timeline;
  }

  interface DataTimeline {
    type: 'dom' | 'object';

    id?: string;

    label?: string;

    path?: string;

    props?: object;
  }

  interface DataGroup {
    name: string;

    timeScale?: number;

    timelines?: DataTimeline[];
  }
}
