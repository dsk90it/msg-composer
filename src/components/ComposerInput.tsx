function ComposerInput() {
  return (
    <div className="relative bg-white w-full rounded-2xl min-h-32 overflow-x-hidden">
      {/* textarea */}
      <textarea
        placeholder="write something..."
        maxLength={200}
        className="absolute placeholder:text-slate-400 custom-scrollbar inset-x-0 top-0 bottom-8 z-[1] px-6 py-4 resize-none bg-transparent outline-none caret-slate-900"
      />

      {/* highlight-text */}
      <div className="absolute inset-x-0 z-0 text-start px-6 py-4 top-0 bottom-8 whitespace-pre-wrap break-words"></div>

      {/* length-limit */}
      <p className="absolute bottom-0 end-0 text-end px-6 py-3 text-slate-400 text-xs">
        <span className="text-slate-900">11</span>/200
      </p>
    </div>
  )
}

export default ComposerInput
