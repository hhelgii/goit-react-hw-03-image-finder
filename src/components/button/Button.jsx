import React from "react";
import propTypes from "prop-types"
import css from './button.module.css'
export const Button=({text})=>{
    return(
        <button type="button" className={css.Button}>{text}</button>
    )
}
Button.propTypes={
    text:propTypes.string.isRequired
}