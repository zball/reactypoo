import React, { useEffect, useReducer, useState } from "react";
import PooCircularProgress from "../PooCircularProgress";
import { PooImageAction, PooImageProps as PooImageProps, PooImageState } from "./PooImage.types";
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

export const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
export const BASE_CLASSNAME     = 'poo-image';
export const ERROR_MESSAGE      = 'Error loading image';

// #endregion Constants

// ------------------------------------------------------------------------------------------
// #region Reducer
// ------------------------------------------------------------------------------------------

const initialState: PooImageState = {
    errored           : false,
    loading           : true,
    loadedSuccessfuly : false,
    src               : ''
};

function reducer(state: PooImageState, action: PooImageAction): PooImageState {
  switch (action.type) {
    case 'loaded':
      return {
            ...state,
            errored: false,
            loading: false,
            loadedSuccessfuly: true
        };
    case 'loading':
      return {
            ...state,
            errored: false,
            loading: true,
            loadedSuccessfuly: false
        };
    case 'errored':
      return {
            ...state,
            errored: true,
            loading: false,
            loadedSuccessfuly: false
        };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

// #endregion Reducer

// ------------------------------------------------------------------------------------------
// #region Component
// ------------------------------------------------------------------------------------------

const PooImage: React.FunctionComponent<PooImageProps> = (props: PooImageProps) => {

    // ------------------------------------------------------------------------------------------
    // #region Setup
    // ------------------------------------------------------------------------------------------
    
    const { altText, classNames: customClassNames, lazy, loadingAnimationSize, responsive, src } = props;
    
    // #endregion Setup

    // ------------------------------------------------------------------------------------------
    // #region Side Effects
    // ------------------------------------------------------------------------------------------

    initialState.src = src;
    const [{ errored, loading, loadedSuccessfuly, src: imageSrc }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => dispatch({type: 'reset'}), [src]);

    // #endregion Side Effects
    
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
    
    const isImage                     = ALLOWED_FILE_TYPES.includes(src?.split('.').pop());
    const meetsBasicRequirements      = isImage && altText;
    const doesntMeetBasicRequirements = !meetsBasicRequirements;

    // #endregion Transformations & Computation

    // ------------------------------------------------------------------------------------------
    // #region Return
    // ------------------------------------------------------------------------------------------
    
    if(doesntMeetBasicRequirements) return null;

    return (
        <>
            {loading && <PooCircularProgress size={loadingAnimationSize} />}
            {!errored &&
                <img 
                    alt       = { altText }
                    className = { imageClassNames }
                    loading   = { lazy }
                    onError   = { () => dispatch({type: 'errored'}) }
                    onLoad    = { () => dispatch({type: 'loaded'}) }
                    src       = { imageSrc } 
                />}
            {errored && <div>{`${ERROR_MESSAGE} for ${altText}`}</div>}
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