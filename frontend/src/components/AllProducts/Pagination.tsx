

interface Pagination {
    totalPage: number,
    onPageChange: (page: number) => void,
    currentPage: number
}
export function Pagination({ totalPage, onPageChange, currentPage }: Pagination) {
    return(
        <section className="flex w-full max-w-7xl items-center mx-auto justify-center px-6 text-gray-500">
            <div className="flex items-center gap-2">
                {Array.from({ length: totalPage }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => onPageChange(index + 1)}
                        className={`cursor-pointer rounded border border-transparent px-3 py-1 font-semibold transition-all hover:border hover:border-gray-400 ${
                            currentPage === index + 1
                                ? "bg-gray-800 text-white"
                                : "bg-gray-200 text-gray-800"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section>
    )
}
