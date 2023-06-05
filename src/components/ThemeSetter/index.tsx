import React from "react";
import './ThemeSetter.css';
import ThemeInput from "../ThemeInput";

function ThemeSetter({onThemeChange, colorPairs}) {
    function getCorrespondingBackground(pointerColor) {
        let correspondingbackgroundColor = null;
        colorPairs.forEach(pair => {
            if (pair.pointer === pointerColor) {
                correspondingbackgroundColor = pair.background;
            }
        })

        return correspondingbackgroundColor || null;
    }
    function handleThemeChange(e) {
        onThemeChange({
                pointer:e.target.value,
                background: getCorrespondingBackground(e.target.value)
            });
    }
    return <fieldset  className={"options"}>
        <legend>Theme</legend>
        {colorPairs.map(
            (colorPair,i) => <ThemeInput
                key={colorPair.pointer+colorPair.background}
                theme={colorPair}
                positionNumber={i}
                onThemeChange={handleThemeChange}
            />
        )}
    </fieldset>
    }
export default  ThemeSetter;