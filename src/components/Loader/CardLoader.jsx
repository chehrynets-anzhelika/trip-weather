import React from "react";
import ContentLoader from 'react-content-loader';


const CardLoader = (props) => {
    return (
        <>
            <ContentLoader
                speed={10}
                width={props.width}
                height={props.height}
                viewBox={`0 0 ${props.width} ${props.height}`}
                backgroundColor="#7d7e97"
                foregroundColor="#a5d9df"
                {...props}
            >
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="80%" />
                <rect x="0" y="290" rx="5" ry="5" width="50%" height="20" />
                <rect x="0" y="320" rx="5" ry="5" width="60%" height="20" />
            </ContentLoader>
        </>
    );
}

export default CardLoader;