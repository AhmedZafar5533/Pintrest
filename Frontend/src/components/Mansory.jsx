import { useEffect, useRef, useCallback, useState } from "react";
import "./styles.css";
import Masonry from "react-masonry-css";
import { useAppStore } from "../../store/app-store";
import { useNavigate } from "react-router-dom";

const MasonryLayout = () => {
    const { fetchOnlineImages, imageArray, loadImageFullView } = useAppStore();
    const observer = useRef();
    const naviagte = useNavigate()
    const [imageLoadState, setImageLoadState] = useState({});


    const handleImageLoad = (index) => {
        setImageLoadState((prevState) => ({
            ...prevState,
            [index]: true,
        }));
    };


    const lastImageRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        fetchOnlineImages();
                    }
                },
                { threshold: 0 }
            );

            if (node) observer.current.observe(node);
        },
        [fetchOnlineImages]
    );

    useEffect(() => {

        fetchOnlineImages();
    }, [fetchOnlineImages]);
    const sendImagedetails = (image) => {
        loadImageFullView(image);
        naviagte(`/image/${image.id}`)
    }

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {imageArray.map((image, index) => (
                <div
                    key={index}
                    className={`masonry-item ${imageLoadState[index] ? "loaded" : ""}`}
                    ref={index === imageArray.length - 1 ? lastImageRef : null}
                >
                    <img
                        src={image.url}
                        alt={`Masonry item ${index}`}
                        className="blurred-image cursor-pointer"
                        onLoad={() => handleImageLoad(index)}
                        onClick={() => {
                            console.log(image);
                            sendImagedetails(image)
                        }}
                    />
                </div>
            ))}
        </Masonry>
    );
};

export default MasonryLayout;
