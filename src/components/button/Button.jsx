import React from "react";
import propTypes from "prop-types"
import css from './button.module.css'
export const Button=({text, onButtonClick})=>{
    return(
        <button type="button" className={css.Button} onClick={onButtonClick}>{text}</button>
    )
}
Button.propTypes={
    text:propTypes.string.isRequired,
    onButtonClick:propTypes.func.isRequired
}