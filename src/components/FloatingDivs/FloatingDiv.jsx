function FloatingDiv() {
  return (
    <>
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-blue-300 rounded-full opacity-20 animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-400 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
    </>
  )
}

export default FloatingDiv
