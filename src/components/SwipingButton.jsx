import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";


function SwipingButton({ direction, onClick }) {
    return (
        <button 
            onClick={onClick} 
            className="border-2 border-black p-3 rounded-full hover:bg-red-300 transition-colors duration-300 text-2xl bg-white"
        >
            {direction === 'left' ? <FaThumbsDown /> : <FaThumbsUp />}
        </button>
    );
}

export default SwipingButton;