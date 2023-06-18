import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    <rect x="0" y="265" rx="0" ry="0" width="280" height="26" /> 
    <rect x="225" y="340" rx="0" ry="0" width="0" height="2" /> 
    <circle cx="140" cy="125" r="125" /> 
    <rect x="0" y="310" rx="0" ry="0" width="280" height="88" /> 
    <rect x="0" y="420" rx="0" ry="0" width="83" height="40" /> 
    <rect x="155" y="420" rx="0" ry="0" width="128" height="40" />
  </ContentLoader>
)

export default Skeleton