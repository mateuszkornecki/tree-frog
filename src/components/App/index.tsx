import React, {useState} from "react";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import FilterCenterFocus from '@mui/icons-material/FilterCenterFocus';
import tinycolor from "tinycolor2";
import './App.css';
import Pointer, {PointerSize} from "../Pointer";
import Settings from "../Settings";
import ThemeSetter, {Theme} from "../ThemeSetter";
import PlayPauseSetting from "../PlayPauseOption";
import PointerSizesetter from "../PointerSizeSeter";
import useThemes from "../../hooks/useThemes";

function App() {
    const {themes} = useThemes();
    const defaultTheme = themes[0];
    const [isBouncing, setIsBouncing] = useState(true);
    const [isFrozenAndCentered, freezeAndCenter] = useState(false)
    const [isOpenSettings, setIsOpenSettings] = useState(false);
    const [pointerColor, setPointerColor] = useState(() => defaultTheme.pointer);
    const [backgroundColor, setBackgroundColor] = useState(() => defaultTheme.background);
    const [pointerSize, setPointerSize] = useState<PointerSize>(() => 'regular');

    function handleThemeChange(newTheme: Theme) {
        setPointerColor(newTheme.pointer);
        setBackgroundColor(newTheme.background);
        document.documentElement.style.setProperty('--pointer-color', newTheme.pointer);

    }

    const isBackgroundDark = tinycolor(backgroundColor).isDark();
    const settingsIconStyles = {
        color: isBackgroundDark ? "white" : "black",
    };

    function toggleBouncing() {
        setIsBouncing(!isBouncing);

        if (isFrozenAndCentered) {
            setIsBouncing(true);
            freezeAndCenter(false);
        }
    }

    function stopAndFreezePointer() {
        freezeAndCenter(true);
        setIsBouncing(false);
    }

    function toggleIsOpenSettings() {
        setIsOpenSettings(!isOpenSettings);
    }
    function handleClick(event: React.MouseEvent<HTMLElement>):void {
        const APP_CLASS_NAME = "App";
        //https://www.designcise.com/web/tutorial/how-to-fix-property-does-not-exist-on-type-eventtarget-typescript-error
        const isClickOutsideModal = (event.target as Element).className === APP_CLASS_NAME;
        if (isOpenSettings && isClickOutsideModal) {
         setIsOpenSettings(false);
        }
    }

    return (
        <div className="App" onClick={handleClick} style={{backgroundColor: backgroundColor}}>
            <Pointer
                color={pointerColor}
                paused={!isBouncing}
                size={pointerSize}
                freezeAndCenter={isFrozenAndCentered}
            />
            <Settings isOpen={isOpenSettings}>
                <PlayPauseSetting
                    isRunning={isBouncing}
                    onClick={toggleBouncing}
                />
                <FilterCenterFocus
                    fontSize={'large'}
                    className={"settingsIcon--black"}
                    onClick={stopAndFreezePointer}
                />
                <br/>
                <ThemeSetter
                    onThemeChange={handleThemeChange}
                    themes={themes}
                />
                <PointerSizesetter onSizeClick={setPointerSize}/>
            </Settings>
            <SettingsApplicationsIcon
                fontSize={'large'}
                className={"settingsIcon"}
                style={settingsIconStyles}
                onClick={toggleIsOpenSettings}
            />
        </div>
  );
}
export default  App;