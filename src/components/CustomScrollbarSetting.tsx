import { useEffect, useRef, useState } from "react";
import scrollbarStore from "../store/scrollbarStore"
import { ChromePicker, ColorResult } from "react-color";

const CustomScrollbarSetting = () => {

    const {
        thumbColor,
        setThumbColor,
        trackColor,
        setTrackColor,
        scrollbarWidth,
        scrollRadius,
        scrollBorderWidth,
        increaseScrollBorderWidth, 
        decreaseScrollBorderWidth,
        increaseScrollbarWidth,
        decreaseScrollbarWidth,
        increaseScrollRadius,
        decreasescrollRadius,
        isGradient,
        setIsGradient,
        thumbColorTwo,
        setThumbColorTwo
    } = scrollbarStore(state => state)

    const thumbColorPickerRef = useRef<HTMLDivElement | null>(null)
    const trackColorPickerRef = useRef<HTMLDivElement | null>(null)
    const thumbBorderColorPickerRef = useRef<HTMLDivElement | null>(null)
    const thumbBorderColorPickerRefTwo = useRef<HTMLDivElement | null>(null)

    const [colorPicker, setColorPicker] = useState({
        thumb: false,
        thumbTwo: false,
        track: false,
        thumbBorder: false
    })

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (thumbColorPickerRef.current && !thumbColorPickerRef.current.contains(event.target as Node)) setColorPicker({ ...colorPicker, thumb: false })
            if (trackColorPickerRef.current && !trackColorPickerRef.current.contains(event.target as Node)) setColorPicker({ ...colorPicker, track: false })
            if (thumbBorderColorPickerRef.current && !thumbBorderColorPickerRef.current.contains(event.target as Node)) setColorPicker({ ...colorPicker, thumbBorder: false })
            if (thumbBorderColorPickerRefTwo.current && !thumbBorderColorPickerRefTwo.current.contains(event.target as Node)) setColorPicker({ ...colorPicker, thumbTwo: false })
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [thumbColorPickerRef, trackColorPickerRef, thumbBorderColorPickerRef, thumbBorderColorPickerRefTwo, colorPicker])

    const handleSetColorPicker = (color: ColorResult, type: 'thumb' | 'thumbTwo' | 'track' | 'thumbBorder') => {
        if (type === 'thumb') {
            setThumbColor(color.hex);
        } else if (type === 'track') {
            setTrackColor(color.hex);
        } else if (type === 'thumbTwo') {
            setThumbColorTwo(color.hex);
        }
    }
        
    return (
        <>
            <h2 className="text-lg my-10">Setting</h2>
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-row justify-between items-center">
                    <span>Do you want the Scrollbar Gradient?</span>
                    <div>
                        <select className="bg-gray-500 border border-gray-600 text-gray-200 py-1 px-2 rounded-md" value={isGradient} onChange={ (e) => {setIsGradient(Number(e.target.value))}}>
                            <option defaultValue="select">Select</option>
                            <hr />
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <span>Thumb Color</span>
                    <div ref={thumbColorPickerRef}>
                        <span className="w-5 h-5 rounded-md cursor-pointer relative inline-block" style={{background: thumbColor}} onClick={() => setColorPicker({ ...colorPicker, thumb: !colorPicker.thumb })}></span>
                        {
                            colorPicker.thumb &&
                                <div ref={thumbColorPickerRef} className="flex flex-row justify-between absolute z-10" style={{ margin: '0.3rem 0' }}>
                                    <ChromePicker color={thumbColor} onChange={(color) => handleSetColorPicker(color, 'thumb')} />
                                </div>
                        }
                    </div>
                </div>
                {
                    isGradient === 1 &&
                    <div className="flex flex-row justify-between">
                        <span>Thumb Color 2</span>
                        <div ref={thumbBorderColorPickerRefTwo}>
                            <span className="w-5 h-5 rounded-md cursor-pointer relative inline-block" style={{background: thumbColorTwo}} onClick={() => setColorPicker({ ...colorPicker, thumbTwo: !colorPicker.thumbTwo })}></span>
                            {
                                colorPicker.thumbTwo &&
                                    <div ref={thumbBorderColorPickerRefTwo} className="flex flex-row justify-between absolute z-10" style={{ margin: '0.3rem 0' }}>
                                        <ChromePicker color={thumbColorTwo} onChange={(color) => handleSetColorPicker(color, 'thumbTwo')} />
                                    </div>
                            }
                        </div>
                    </div>
                }
                <div className="flex flex-row justify-between">
                    <span>Track Color</span>
                    <div ref={trackColorPickerRef}>
                        <span className="w-5 h-5 rounded-md cursor-pointer relative inline-block" style={{background: trackColor}} onClick={() => setColorPicker({ ...colorPicker, track: !colorPicker.track })}></span>
                        {
                            colorPicker.track &&
                                <div className="flex flex-row justify-between absolute z-10" style={{ margin: '0.3rem 0' }}>
                                    <ChromePicker color={thumbColor} onChange={(color) => handleSetColorPicker(color, 'track')} />
                                </div>
                        }
                    </div>
                </div>
{/*                 <div className="flex flex-row justify-between">
                    <span>Thumb Border Color</span>
                    <div ref={thumbBorderColorPickerRef}>
                        <span className="w-5 h-5 rounded-md cursor-pointer relative inline-block" style={{background: thumbBorderColor}} onClick={() => setColorPicker({ ...colorPicker, thumbBorder: !colorPicker.thumbBorder })}></span>
                        {
                            colorPicker.thumbBorder &&
                                <div className="flex flex-row justify-between absolute z-10" style={{ margin: '0.3rem 0' }}>
                                    <ChromePicker color={thumbBorderColor} onChange={(color) => handleSetColorPicker(color, 'thumbBorder')} />
                                </div>
                        }
                    </div>
                </div> */}
                <div className="flex flex-row justify-between">
                    <span>Scrollbar Width</span>
                    <div className="gap-2 flex flex-row justify-center items-center">
                        <button className="text-blue-300 font-medium text-lg" onClick={decreaseScrollbarWidth}>
                            <img src="/minus-icon.svg" className="w-4 h-5" alt="minus" />
                        </button>
                        <span className="font-light text-gray-300">{scrollbarWidth}px</span>
                        <button className="text-blue-300 font-medium text-md" onClick={increaseScrollbarWidth}>
                            <img src="/plus.svg" className="w-4 h-5" alt="plus" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <span>Scrollbar Radius</span>
                    <div className="gap-2 flex flex-row justify-center items-center">
                        <button className="text-blue-300 font-medium text-lg" onClick={decreaseScrollBorderWidth}>
                            <img src="/minus-icon.svg" className="w-4 h-5" alt="minus" />
                        </button>
                        <span className="font-light text-gray-300">{scrollBorderWidth}px</span>
                        <button className="text-blue-300 font-medium text-md" onClick={increaseScrollBorderWidth}>
                            <img src="/plus.svg" className="w-4 h-5" alt="plus" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <span>Scrollbar Border Width</span>
                    <div className="gap-2 flex flex-row justify-center items-center">
                        <button className="text-blue-300 font-medium text-lg" onClick={decreasescrollRadius}>
                            <img src="/minus-icon.svg" className="w-4 h-5" alt="minus" />
                        </button>
                        <span className="font-light text-gray-300">{scrollRadius}px</span>
                        <button className="text-blue-300 font-medium text-md" onClick={increaseScrollRadius}>
                            <img src="/plus.svg" className="w-4 h-5" alt="plus" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomScrollbarSetting