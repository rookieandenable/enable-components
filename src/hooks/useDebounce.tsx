import React, { useState, useEffect } from "react"

// 节流函数
export const useDebounce = function <T>(value: T, delay = 300) {
  const [ deBounceValue, setDeBounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeBounceValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return deBounceValue;
}