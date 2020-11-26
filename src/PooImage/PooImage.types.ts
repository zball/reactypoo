import { PooCircularProgressSize } from "../PooCircularProgress/PooCircularProgress.types";

export interface PooImageProps {
    classNames?           : string;
    lazy?                 : "lazy" | "eager" | undefined;
    loadingAnimationSize? : PooCircularProgressSize;
    responsive?           : boolean;
    src?                  : string;
}