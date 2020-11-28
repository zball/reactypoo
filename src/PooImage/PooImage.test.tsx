import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import PooImage, {ERROR_MESSAGE} from './PooImage';
import { PooImageProps } from './PooImage.types';
import { TESTID as CP_TESTID } from '../PooCircularProgress/PooCircularProgress';

describe('Test PooImage', () => {

    const ALT_TEXT         = "alt-text";
    const CUSTOM_CLASSNAME = "custom-class-name";
    const IMG_SRC          = "https://test.jpg";

    const renderComponent = (props?: PooImageProps) => render(<PooImage {...props} />);

    it('should not render if no src provided', () => {

        // Arange & Act
        const { queryByAltText } = renderComponent();
        const image = queryByAltText('test');

        // Assert
        expect(image).not.toBeInTheDocument();
    });

    it('should not render if no altText provided', () => {

        // Arrange & Act
        const { queryByAltText } = renderComponent({
            src: IMG_SRC
        });

        // Assert
        expect(queryByAltText('test')).not.toBeInTheDocument();
    });

    it('should render with loader', () => {

        // Arrange
        const { getByAltText, getByTestId } = renderComponent({
            altText: ALT_TEXT,
            src: IMG_SRC
        });

        // Act & Assert
        getByAltText(ALT_TEXT);
        getByTestId(CP_TESTID);
    });

    it('should show error when image fails to load', async () => {

        // Arrange
        const { getByText, getByAltText } = renderComponent({
            altText: ALT_TEXT,
            src: IMG_SRC
        });

        // Act
        fireEvent.error(getByAltText(ALT_TEXT));

        // Assert
        getByText(`${ERROR_MESSAGE} for ${ALT_TEXT}`);
    });

    it('should not show error when image loads successfully', async () => {

        // Arrange 
        const { getByAltText, queryByText } = renderComponent({
            altText: ALT_TEXT,
            src: IMG_SRC
        });

        // Act
        fireEvent.load(getByAltText(ALT_TEXT));

        // Assert
        expect(queryByText(ERROR_MESSAGE)).not.toBeInTheDocument();
    });

    it('should contains custon className when provided', async () => {

        // Arrange
        const { container, getByAltText } = renderComponent({
            altText: ALT_TEXT,
            classNames: CUSTOM_CLASSNAME,
            src: IMG_SRC
        });

        // Act
        fireEvent.load(getByAltText(ALT_TEXT));

        // Assert
        expect(container.firstChild).toHaveClass(CUSTOM_CLASSNAME)
    });
});