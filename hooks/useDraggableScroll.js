import { useEffect } from 'react'

export default function useDraggableScroll(ref, meta) {
  useEffect(() => {
    const el = ref.current

    let isDown = false
    let startX
    let scrollLeft
    let isDragging = false

    const onMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON') {
        meta.setStep(meta.step + 1)
        meta.setMajor(e.target.id)
        return // Prevent drag on button click
      }
      isDown = true
      isDragging = false
      el.classList.add('active')
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
    }

    const onMouseLeave = () => {
      isDown = false
      el.classList.remove('active')
    }

    const onMouseUp = (e) => {
      isDown = false
      el.classList.remove('active')
      if (!isDragging) return // Do not count as drag if not moved
      e.target.click() // Trigger click event if it's a button
    }

    const onMouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      isDragging = true
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1
      el.scrollLeft = scrollLeft - walk
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousemove', onMouseMove)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mousemove', onMouseMove)
    }
  }, [meta, ref])
}
