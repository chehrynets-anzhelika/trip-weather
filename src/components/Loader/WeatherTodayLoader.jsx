import React from "react";
import ContentLoader from "react-content-loader"

const Loader = (props) => (
  <ContentLoader className={props.className}
    speed={2}
    width={props.width}
    height={props.height}
    viewBox={`0 0 ${props.width} ${props.height}`}
    backgroundColor="#7d7e97"
    foregroundColor="#a5d9df"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="50%" height="20" />
    <rect x="0" y="30" rx="5" ry="5" width="30%" height="20" />
    <rect x="0" y="60" rx="5" ry="5" width="50%" height="20" />
    <circle cx="80%" cy="40" r="40" />
    <rect x="30%" y="120" rx="5" ry="5" width="40%" height="20" />
    <rect x="30%" y="150" rx="5" ry="5" width="40%" height="20" />
  </ContentLoader>
)

export default Loader;