import { create } from "zustand"

type Store = {
    thumbColor: string
    setThumbColor: (color: string) => void
    trackColor: string
    setTrackColor: (color: string) => void
    thumbBorderColor: string
    setThumbBorderColor: (color: string) => void
    scrollbarWidth: number
    increaseScrollbarWidth: () => void
    decreaseScrollbarWidth: () => void
    scrollRadius: number
    increaseScrollRadius: () => void
    decreasescrollRadius: () => void
    scrollBorderWidth: number
    increaseScrollBorderWidth: () => void
    decreaseScrollBorderWidth: () => void
    isGradient: number
    setIsGradient: (isGradient: number) => void
    thumbColorTwo: string
    setThumbColorTwo: (color: string) => void
}
  
const scrollbarStore = create<Store>()((set) => ({
    thumbColor: "#0369a1",
    setThumbColor: (color) => set(() => ({ thumbColor: color })),
    trackColor: "#cbd5e1",
    setTrackColor: (color) => set(() => ({ trackColor: color })),
    thumbBorderColor: "#1ba0dc",
    setThumbBorderColor: (color) => set(() => ({ thumbBorderColor: color })), 
    scrollbarWidth: 12,
    increaseScrollbarWidth: () => set(state => ({ scrollbarWidth: state.scrollbarWidth + 1 })),
    decreaseScrollbarWidth: () => set(state => ({ scrollbarWidth: state.scrollbarWidth - 1 })),
    scrollRadius: 12,
    increaseScrollRadius: () => set(state => ({ scrollRadius: state.scrollRadius + 1})),
    decreasescrollRadius: () => set(state => ({ scrollRadius: state.scrollRadius - 1})),
    scrollBorderWidth: 12,
    increaseScrollBorderWidth: () => set(state => ({ scrollBorderWidth: state.scrollBorderWidth + 1})),
    decreaseScrollBorderWidth: () => set(state => ({ scrollBorderWidth: state.scrollBorderWidth - 1})),
    isGradient: 0,
    setIsGradient: (isGradient) => set(() => ({ isGradient: isGradient })),
    thumbColorTwo: "#7dd3fc",
    setThumbColorTwo: (color) => set(() => ({ thumbColorTwo: color })),
}))
  

export default scrollbarStore