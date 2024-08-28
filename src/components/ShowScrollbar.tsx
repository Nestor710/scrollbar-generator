import { useState } from 'react';
import '../assets/css/ShowScrollbar.css'
import scrollbarStore from '../store/scrollbarStore'

const ShowScrollbar = () => {

  const { 
    thumbColor, 
    trackColor, 
    scrollbarWidth, 
    scrollRadius, 
    scrollBorderWidth,
    thumbColorTwo,
    isGradient
  } = scrollbarStore(state => state)

  const [copyLabel, setcopyLabel] = useState('Copy');

  const copyTextToClipboard = () => {
    const code = document.querySelector('code') as HTMLElement
    const text = code.innerText
    
    navigator.clipboard.writeText(text).then(() => {
      setcopyLabel('Copied!');
      const timer = setTimeout(() => {
        setcopyLabel('Copy');
      }, 1000);
      return () => clearTimeout(timer);
    }).catch(err => {
      console.log('Failed to copy text: ', err);
    })
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-lg my-10">Code</h2>   
        <button className="bg-sky-700 text-white h-10 px-4 py-2 rounded-md" onClick={() => copyTextToClipboard()}>{copyLabel}</button>
      </div>
      <div className="flex flex-col gap-y-3">
        <code 
        className={`${isGradient ? 'is-gradient' : ''} text-left`}
        style={{
          '--thumb-color': thumbColor,
          '--thumb-color-two': thumbColorTwo,
          '--track-color': trackColor,
          '--scrollbar-width': `${scrollbarWidth}px`,
          '--scrollbar-border-radius': `${scrollRadius}px`,
          '--scrollbar-thumb-border-width': `${scrollBorderWidth}px`,
        }}
        >
          <pre>
            {`body {
  --sb-track-color: ${trackColor};
  --sb-thumb-color: ${thumbColor};${isGradient ? `\n  --sb-thumb-color-two: ${thumbColorTwo};` : ''}
  --sb-size: ${scrollbarWidth}px;
}

body::-webkit-scrollbar {
  width: var(--sb-size)
}

body::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: ${scrollRadius}px;
}

body::-webkit-scrollbar-thumb {
  background: ${isGradient ? `linear-gradient(360deg,
    var(--sb-thumb-color) 15%, 
    var(--sb-thumb-color-two))` : 'var(--sb-thumb-color)'};
  border-radius: ${scrollBorderWidth}px;
}

@supports not selector(::-webkit-scrollbar) {
  body {
    scrollbar-color: var(--sb-thumb-color)
    var(--sb-track-color);
  }
}`}
          </pre>
        </code>
      </div>
    </>
  )
}

export default ShowScrollbar