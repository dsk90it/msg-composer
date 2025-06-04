import React, { useRef, useState } from 'react'
import clsx from 'clsx'

const mentionsList = ['french', 'friday', 'frog & fries']
const urlRegex = /\bhttps?:\/\/[^\s]+|www\.[^\s]+/gi
const hashtagRegex = /#[\w]+/gi
const mentionRegex = /@[\w]+/gi

function ComposerInput() {
  const [text, setText] = useState('')
  const [mentionQuery, setMentionQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value)

    const cursorPos = e.target.selectionStart
    const tillCursor = value.substring(0, cursorPos)
    const match = /@(\w*)$/.exec(tillCursor)

    if (match) {
      setMentionQuery(match[1])
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const handleSelectMention = (mention: string) => {
    const cursorPos = textareaRef.current?.selectionStart || 0
    const beforeCursor = text.substring(0, cursorPos)
    const afterCursor = text.substring(cursorPos)

    const updatedBefore = beforeCursor.replace(/@(\w*)$/, `@${mention} `)
    const newText = updatedBefore + afterCursor

    setText(newText)
    setMentionQuery('')
    setShowDropdown(false)

    setTimeout(() => {
      textareaRef.current?.focus()
    }, 0)
  }

  const filteredMentions = mentionsList.filter((item) =>
    item.toLowerCase().startsWith(mentionQuery.toLowerCase()),
  )

  const getHighlightedText = (input: string) => {
    const tokens = input.split(/(\s+)/) // Keep spaces

    return tokens.map((token, idx) => {
      if (urlRegex.test(token)) {
        return (
          <span key={idx} className="font-semibold text-indigo-600">
            {token}
          </span>
        )
      }
      if (hashtagRegex.test(token)) {
        return (
          <span
            key={idx}
            className="cursor-pointer font-semibold text-indigo-600"
          >
            {token}
          </span>
        )
      }
      if (mentionRegex.test(token)) {
        return (
          <span key={idx} className="rounded bg-gray-100 py-1 font-semibold">
            {token}
          </span>
        )
      }
      return <span key={idx}>{token}</span>
    })
  }

  return (
    <div className="relative overflow-y-visible">
      <div className="relative h-64 w-full overflow-x-hidden rounded-2xl bg-white sm:h-32">
        {/* textarea */}
        <textarea
          ref={textareaRef}
          placeholder="write something..."
          maxLength={200}
          value={text}
          onChange={handleChange}
          spellCheck={false}
          className="custom-scrollbar absolute inset-x-0 bottom-8 top-0 z-[1] h-64 resize-none bg-transparent px-6 py-4 text-base text-transparent caret-slate-900 outline-none placeholder:text-gray-400 sm:h-32"
        />

        {/* highlight-text */}
        <div className="absolute inset-x-0 bottom-8 top-0 z-0 h-64 whitespace-pre-wrap break-words px-6 py-4 text-start text-base sm:h-32">
          {getHighlightedText(text)}
        </div>

        {/* length-limit */}
        <p
          className={clsx(
            'absolute bottom-0 end-0 px-6 py-3 text-end text-xs',
            text.length < 200 ? 'text-gray-400' : 'text-slate-900',
          )}
        >
          <span className={clsx(text.length > 0 && 'text-slate-900')}>
            {text.length}
          </span>
          /200
        </p>
      </div>

      {/* mentions-dropdown */}
      {showDropdown && filteredMentions.length > 0 && (
        <ul className="custom-scrollbar mt-4 max-h-56 w-44 overflow-clip rounded-lg bg-white text-sm shadow-lg transition-all">
          {filteredMentions.map((mention, i) => (
            <li
              key={i}
              className="cursor-pointer px-3 py-2 transition-all hover:bg-gray-100"
              onClick={() => handleSelectMention(mention)}
            >
              {mention}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ComposerInput
