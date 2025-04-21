
const SuggestionSkeletan = () => {
    return(
    <div className="space-y-4 animate-pulse">
        {[...Array(2)].map((_, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-36 h-36 bg-blue-100 rounded-xl"/>
                <div className="flex-1 space-y-3">
                    <div className="w-3/4 h-4 bg-gray-200 rounded"/>
                    <div className="w-1/2 h-4 bg-gray-200 rounded"/>
                    <div className="w-1/4 h-4 bg-gray-300 rounded"/>
                    <div className="w-32 h-8 bg-blue-300 rounded mt-2"/>
                </div>
            </div>
        ))}
    </div>)
}

export default SuggestionSkeletan;