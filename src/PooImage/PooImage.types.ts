import { PooCircularProgressSize } from "../PooCircularProgress/PooCircularProgress.types";

export interface PooImageProps {
    altText?              : string;
    classNames?           : string;
    lazy?                 : "lazy" | "eager" | undefined;
    loadingAnimationSize? : PooCircularProgressSize;
    responsive?           : boolean;
    src?                  : string;
}

export type PooImageState = {
    errored:           boolean,
    loading:           boolean,
    loadedSuccessfuly: boolean,
}

export type PooImageAction = { type: 'loaded' } | { type: 'loading'} | { type: 'errored' } | { type: 'reset' }