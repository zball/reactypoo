import React from "react";
import PooCircularProgress from "./PooCircularProgress";
import { select } from '@storybook/addon-knobs';
import { PooCircularProgressSize } from "./PooCircularProgress.types";

export default {
  title: "PooCircularProgress"
};

export const Primary = () => {

    const label = 'Sizes';
    const options = {
        Small: 'sm',
        Medium: 'md',
        Large: 'lg'
    };
    const defaultValue = 'md';
    
    return <PooCircularProgress size={select(label, options, defaultValue) as PooCircularProgressSize} />
};