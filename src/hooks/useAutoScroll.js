import { useEffect } from 'react'

export default function useAutoScroll(ref) {
  useEffect(() => {
    const el = ref.current
    if (window.visualViewport.width < 450) {
      return
    } else {
      const cloned = el.innerHTML
      el.innerHTML += cloned
      let autoScroll = setInterval(() => {
        el.scrollLeft += 1.2
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }, 20)

      el.addEventListener('mouseover', () => clearInterval(autoScroll))
      el.addEventListener('mouseout', () => {
        autoScroll = setInterval(() => {
          el.scrollLeft += 1
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft = 0
          }
        }, 20)
      })

      return () => {
        clearInterval(autoScroll)
        el.removeEventListener('mouseover', () => clearInterval(autoScroll))
        el.removeEventListener('mouseout', () => {})
      }
    }
  }, [ref])
}
