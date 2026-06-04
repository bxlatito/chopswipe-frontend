function Display({text="Sample Text"}){
    return(
        <>
            <div className="m-2 border-3 border-black p-2 rounded-xl bg-white text-black font-bold w-2/6 mx-auto text-center mt-12">
                {text}
            </div>
        </>
    )
}

export default Display;