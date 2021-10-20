import React from "react";
import "./Pixel.css";

const Pixel = props => {
    return (
        <div className="pixel" onClick={ () => props.selectPixel(props.x, props.y)} style={{ backgroundColor: props.color}}></div>
    );
}

export default Pixel;