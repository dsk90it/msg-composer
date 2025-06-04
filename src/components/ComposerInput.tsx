import clsx from 'clsx'
import React, { useRef, useState } from 'react'

function ComposerInput() {
  const [text, setText] = useState('')
  // const [mentionQuery, setMentionQuery] = useState('')
  // const [showMentionList, setShowMentionList] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value)
  }

  return (
    <>
      <div className="relative h-32 w-full overflow-x-hidden rounded-2xl bg-white">
        {/* textarea */}
        <textarea
          ref={textareaRef}
          placeholder="write something..."
          maxLength={200}
          value={text}
          onChange={handleChange}
          className="custom-scrollbar absolute inset-x-0 bottom-8 top-0 z-[1] h-32 resize-none bg-transparent px-6 py-4 text-base text-transparent caret-slate-900 outline-none placeholder:text-slate-400"
        />

        {/* highlight-text */}
        <div className="absolute inset-x-0 bottom-8 top-0 z-0 h-32 whitespace-pre-wrap break-words px-6 py-4 text-start text-base">
          {text}
        </div>

        {/* length-limit */}
        <p
          className={clsx(
            'absolute bottom-0 end-0 px-6 py-3 text-end text-xs',
            text.length < 200 ? 'text-slate-400' : 'text-slate-900',
          )}
        >
          <span className={clsx(text.length > 0 && 'text-slate-900')}>
            {text.length}
          </span>
          /200
        </p>
      </div>
    </>
  )
}

export default ComposerInput
