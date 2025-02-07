export default function MyQuiz(){
    return(
        <> 
            <h1 className="text-center mt-6 mb-3 text-xl font-bold tracking-widest">Hello MyQuiz</h1>
            <div className="flex justify-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer tracking-widest">Add</span>
            </div>

            <div className="grid grid-cols-3 gap-1 mx-10">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                        <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-yellow-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-500 mr-2 mb-2 cursor-pointer">Edit</span>
                        <span className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">Delete</span>
                    </div>
                </div>

            </div>
        </>
    )
}