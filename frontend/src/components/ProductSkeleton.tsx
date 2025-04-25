export const ProductsSkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 md:max-w-7xl mx-auto py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse rounded-md bg-muted">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-full h-48 bg-gray-300 rounded-lg skeleton"></div>
                    <div className="mt-4">
                        <div className="h-4 bg-gray-300 rounded w-3/4 skeleton mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2 skeleton"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

