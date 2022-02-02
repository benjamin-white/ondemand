import React, { useRef, useEffect, useState } from 'react'

const useIntersect = ({ connectedCallback, options={} }: { connectedCallback: Function; options: object }) => {

  // supply default options?

  const containerRef = useRef(null)
  const [ isVisible, setIsVisible ] = useState(false)

  const callback = (entries) => {
    const [ entry ] = entries
    setIsVisible(entry.isIntersecting)
    if (typeof connectedCallback === 'function') connectedCallback(entry.isIntersecting)
  }

  useEffect(() => {
    
    const observer = new IntersectionObserver(callback, options)

    if (containerRef.current) observer.observe(containerRef.current)
    
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
      // maybe use observer.disconnect?
    }

  }, [containerRef, options])

  return [containerRef, isVisible]

}

export default useIntersect