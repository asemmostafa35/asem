"use client"
import { useEffect, useState } from "react"

export function useTypewriter(words: readonly string[], typeMs = 90, deleteMs = 45, pauseMs = 1400): string {
  const [state, setState] = useState({ word: 0, chars: 0, deleting: false })

  useEffect(() => {
    const current = words[state.word]
    const atEnd = !state.deleting && state.chars === current.length
    const atStart = state.deleting && state.chars === 0
    const delay = atEnd ? pauseMs : state.deleting ? deleteMs : typeMs

    const timer = setTimeout(() => {
      if (atEnd) setState((s) => ({ ...s, deleting: true }))
      else if (atStart) setState({ word: (state.word + 1) % words.length, chars: 0, deleting: false })
      else setState((s) => ({ ...s, chars: s.chars + (s.deleting ? -1 : 1) }))
    }, delay)
    return () => clearTimeout(timer)
  }, [state, words, typeMs, deleteMs, pauseMs])

  return words[state.word].slice(0, state.chars)
}
