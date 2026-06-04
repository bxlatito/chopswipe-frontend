function Button({ text = 'Sample Button', type = 'button' }) {
  return (
    <button
      type={type}
      className="bg-black text-white p-2 rounded-xl transition duration-300 hover:bg-white hover:text-black border-2 border-black font-bold cursor-pointer text-center w-full mt-5"
    >
      {text}
    </button>
  )
}

export default Button;