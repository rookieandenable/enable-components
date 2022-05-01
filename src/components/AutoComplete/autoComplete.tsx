import React, { ChangeEvent, FC, ReactNode, useCallback, useEffect, useRef, useState, KeyboardEvent, useMemo } from "react"
import classNames from "classnames"
import Input, { InputProps } from "../Input/input"
import { useDebounce } from "../../hooks/useDebounce"
import { useClickOutSide } from "../../hooks/useClickOutSide"
import Transition from "../Transition/transition"
import Icon from "../Icon/icon"

interface DataSourceObject {
  value: string
}

export type DataSource<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (value: string, data?: string[]) => DataSource[] | Promise<DataSource[]>
  onSelect?: (value: DataSource) => void
  renderOption?: (value: DataSource) => ReactNode
  debounceTime?: number
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    renderOption,
    debounceTime,
    value,
    ...resetProps
  } = props

  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<DataSource[]>([])
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const autoCompleteRef = useRef(null)
  const debounceValue = useDebounce(inputValue, debounceTime)

  useClickOutSide(autoCompleteRef, () => setSuggestions([]))
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions?.(debounceValue as string)
      if (results instanceof Promise) {
        setSuggestions([])
        setLoading(true)
        results.then(data => {
          setSuggestions(data)
          setLoading(false)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setIndex(-1)

  }, [debounceValue, fetchSuggestions])

  const hightLight = useCallback((i: number) => {
    if (i < 0) {
      i = 0
    }

    if (i >= suggestions.length) {
      i = suggestions.length - 1
    }
    setIndex(i)
  }, [suggestions])

  const change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }, [])

  const handleSelect = useCallback((dataSource: DataSource) => {
    setInputValue(dataSource.value)
    setSuggestions([])
    onSelect?.(dataSource)
    triggerSearch.current = false
  }, [onSelect])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        suggestions[index] && handleSelect(suggestions[index])
        break
      case 38:
        hightLight(index - 1)
        break
      case 40:
        hightLight(index + 1)
        break
      case 27:
        setSuggestions([])
        setIndex(-1)
        break
      default:
        break
    }
  }, [handleSelect, hightLight, index, suggestions])

  const renderTemplate = useCallback((dataSource: DataSource) => {
    return renderOption ? renderOption(dataSource) : dataSource.value
  }, [renderOption])

  const generateDropdown = useMemo(() => (
    <Transition
      in={suggestions.length > 0 || loading}
      animation='zoom-in-top'
      timeout={300}
      onExited={() => setSuggestions([])}
    >
      <ul className="suggestion-list">
        { loading && <div className="suggestion-loading-icon"><Icon icon={'spinner'} spin/></div> }
        {
          suggestions.map((value, i) => {
            const classes = classNames('suggestion-item', {
              'item-highlighted': i = index
            })
            return (
              <li className={classes} key={i} onClick={() => handleSelect(value)}>
                { renderTemplate(value) }
              </li>
            )
          })
        }
      </ul>
    </Transition>
  ), [handleSelect, index, loading, renderTemplate, suggestions])

  return (
    <div className="auto-complete" ref={autoCompleteRef}>
      <Input 
        value={inputValue}
        onChange={change}
        onKeyDown={handleKeyDown}
        { ...resetProps }
      />
      { generateDropdown }
    </div>
  )
}

export default AutoComplete;