"use client";
import Image from "helpers/image";
import Link from "helpers/Link";
import React from "react";
import ImageUrl from './ImageUrls';
import { Provider } from "react-redux";
import { store, persistor } from 'store';

const VerticalImage = ({ img, className, objectClass, item }) => {
return (
      <Provider store={store}>
            <ImageUrl img={img} className={className} objectClass={objectClass} item={item} />
      </Provider>
    );
};

export default VerticalImage;
