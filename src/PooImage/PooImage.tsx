import React, { useState } from "react";
import PooCircularProgress from "../PooCircularProgress";
import { PooImageProps as PooImageProps } from "./PooImage.types";
import classNames from 'classnames';

import "./PooImage.scss";

// ------------------------------------------------------------------------------------------
// #region Interfaces
// ------------------------------------------------------------------------------------------

interface SetStateOptions {
    errored           : boolean,
    loading           : boolean,
    loadedSuccessfuly : boolean,
}

// #endregion Interfaces

// ------------------------------------------------------------------------------------------
// #region Constants
// ------------------------------------------------------------------------------------------

const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
const BASE_CLASSNAME = 'poo-image';

// #endregion Constants

// ------------------------------------------------------------------------------------------
// #region Component
// ------------------------------------------------------------------------------------------

const PooImage: React.FunctionComponent<PooImageProps> = (props: PooImageProps) => {

    // ------------------------------------------------------------------------------------------
    // #region Setup
    // ------------------------------------------------------------------------------------------
    
    const { classNames: customClassNames, lazy, loadingAnimationSize, responsive, src } = props;
    
    // #endregion Setup

    // ------------------------------------------------------------------------------------------
    // #region State
    // ------------------------------------------------------------------------------------------
    
    const [ loading,           setLoading           ] = useState<boolean>(true);
    const [ loadedSuccessfuly, setLoadedSuccessfuly ] = useState<boolean>(false);
    const [ errored,           setErrored           ] = useState<boolean>(false);
    
    // #endregion State

    // ------------------------------------------------------------------------------------------
    // #region Functions
    // ------------------------------------------------------------------------------------------

    const setState = ({ errored, loading, loadedSuccessfuly }: SetStateOptions): void => {
        setErrored(errored);
        setLoading(loading);
        setLoadedSuccessfuly(loadedSuccessfuly);
    }

    const validateSrc = (inputSrc: string): string | undefined => 
        ALLOWED_FILE_TYPES.includes(inputSrc.split('.').pop()) ? inputSrc : undefined;

    // #endregion Functions

    // ------------------------------------------------------------------------------------------
    // #region Transformations & Computation
    // ------------------------------------------------------------------------------------------

    const baseClassNames = [BASE_CLASSNAME];
    customClassNames && baseClassNames.push(customClassNames);

    const imageClassNames = classNames(baseClassNames.join(' '), { 
        '-responsive'       : responsive,
        '-loadedSuccessfuly': loadedSuccessfuly,
        '-errored'          : errored 
    });
    
    // #endregion Transformations & Computation

    // ------------------------------------------------------------------------------------------
    // #region Handlers
    // ------------------------------------------------------------------------------------------
    
    const handleOnError = () => setState({ errored: true,  loading: false, loadedSuccessfuly: false });
    const handleOnLoad  = () => setState({ errored: false, loading: false, loadedSuccessfuly: true  });
    
    // #endregion Handlers

    // ------------------------------------------------------------------------------------------
    // #region Return
    // ------------------------------------------------------------------------------------------
    
    if(!src) return null;

    return (
        <>
            {loading && <PooCircularProgress size={loadingAnimationSize} />}
            <img 
                className={imageClassNames}
                loading={lazy}
                onError={handleOnError}
                onLoad={handleOnLoad}
                src={validateSrc(src)} 
            />
            { errored && <div>Error</div> }
        </>
    )
    
    // #endregion Return

}

// #endregion Component

// ------------------------------------------------------------------------------------------
// #region Exports
// ------------------------------------------------------------------------------------------

export default PooImage;

// #endregion Exports