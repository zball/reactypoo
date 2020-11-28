import * as React from 'react';
import classNames from 'classnames';
import PooCircularProgressProps from './PooCircularProgress.types';

import './PooCircularProgress.scss';

// ------------------------------------------------------------------------------------------
// #region Constants
// ------------------------------------------------------------------------------------------

export const BASE_CLASSNAME = 'poo-circular-progress';
export const TESTID         = BASE_CLASSNAME;

// #endregion Constants

// ------------------------------------------------------------------------------------------
// #region Component
// ------------------------------------------------------------------------------------------

const PooCircularProgress: React.FunctionComponent<PooCircularProgressProps> = (props: PooCircularProgressProps) => {

    // ------------------------------------------------------------------------------------------
    // #region Setup
    // ------------------------------------------------------------------------------------------
    
    const { size } = props;
    
    // #endregion Setup

    // ------------------------------------------------------------------------------------------
    // #region Transformations and Computations
    // ------------------------------------------------------------------------------------------
    
    const classes = classNames(BASE_CLASSNAME, {
        '-sm': size === 'sm',
        '-lg': size === 'lg',
        '-md': size === 'md',
    });
    
    // #endregion Transformations and Computations

    // ------------------------------------------------------------------------------------------
    // #region Render
    // ------------------------------------------------------------------------------------------
    
    return <div className={classes} data-testid={TESTID}><div></div><div></div><div></div><div></div></div>
    
    // #endregion Render
}

// #endregion Component

// ------------------------------------------------------------------------------------------
// #region Exports
// ------------------------------------------------------------------------------------------

export default PooCircularProgress;

// #endregion Exports