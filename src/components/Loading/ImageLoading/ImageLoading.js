import React, { useEffect, useRef, useState } from 'react';
import './ImageLoading.sass';
import LoadingSpinner from 'assets/images/Spinner-1s-200px.svg';
function ImageLoading(props) {
    const image = useRef(null);
    const [srcImage, setSrcImage] = useState(LoadingSpinner);

    function preloadImage(imgSrc) {
        var objImagePreloader = new Image();
        objImagePreloader.src = imgSrc;
        if (objImagePreloader.complete) {
            setSrcImage(objImagePreloader.src);

            objImagePreloader.onload = function () {};
        } else {
            objImagePreloader.onload = function () {
                setSrcImage(objImagePreloader.src);

                objImagePreloader.onload = function () {};
            };
        }
    }

    useEffect(() => {
        preloadImage(props.src);
    }, []);
    return <img ref={image} {...props} src={srcImage}></img>;
}

export default ImageLoading;
