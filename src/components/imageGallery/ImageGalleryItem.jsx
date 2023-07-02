import React from "react";
import propTypes from "prop-types"
import css from "./imageGallery.module.css"
export const ImageGalleryItem=({src,largeSrc,tags,onImgClick})=>{
    return(
        <li className={css.item}>
            <img src={src} alt={tags} onClick={()=>{onImgClick(largeSrc)}} className={css.itemImg}/>
        </li>
    )
}
ImageGalleryItem.propTypes={
    src:propTypes.string.isRequired,
    largeSrc:propTypes.string.isRequired,
    tags:propTypes.string.isRequired,
    onImgClick:propTypes.func.isRequired
}