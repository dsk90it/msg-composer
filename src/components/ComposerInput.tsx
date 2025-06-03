function ComposerInput() {
  return (
    <div className="relative bg-white w-full rounded-2xl min-h-24 overflow-x-hidden">
      {/* textarea */}
      <textarea
        placeholder="write something..."
        maxLength={200}
        className="absolute placeholder:text-slate-400 inset-0 z-[1] px-6 py-4 bottom-10 resize-none bg-transparent outline-none caret-slate-900 whitespace-pre"
      />

      {/* highlight-text */}
      <div className="absolute inset-0 z-0 text-start px-6 py-4 bottom-10 whitespace-pre"></div>

      {/* length-limit */}
      <p className="absolute bottom-0 end-0 text-end px-6 py-3 text-slate-400 text-xs">
        <span className="text-slate-900">11</span>/200
      </p>
    </div>
  )
}

export default ComposerInput
