import PooCircularProgress from "./PooImage";
import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import PooImage from "./PooImage";

export default {
  title: "PooImage",
  decorators: [withKnobs]
};

export const Primary = () => {    
    return <PooImage 
      responsive={boolean('Responsive', false)} 
      src={text('Url', '')} 
    />
};