const ImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 10}`
}

export default ImageLoader