export default function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md z-50">
            <div className="relative flex flex-col items-center">

                <div className="w-20 h-20 border-4 border-t-transparent border-purple-500 rounded-full animate-spin shadow-lg"></div>

                <div className="flex mt-6 space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>

                <p className="mt-4 text-white text-lg font-semibold tracking-widest">Uploading...</p>
            </div>
        </div>
    )
}
