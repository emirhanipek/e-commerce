import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import './products.css';

export default function Products({products}) {
    const getProductImage = (product) => {
        // Check if product has multiple images
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            return `http://localhost:8000/public/img/${product.images[0]}`; // Use first image
        }
        // Fallback to single image field for backward compatibility
        if (product.imgUrl) {
            return `http://localhost:8000/public/img/${product.imgUrl}`;
        }
        // Default placeholder if no image
        return '/api/placeholder/300/300';
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <div key={product._id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <Link to={`/product/${product._id}`} className="block">
                        <div className="relative aspect-w-3 aspect-h-2 bg-gray-100">
                            <img
                                src={getProductImage(product)}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.src = '/api/placeholder/300/300';
                                }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="px-4 py-2 bg-amber-500 text-white rounded-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    Ürünü İncele
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center text-amber-400 mb-2">
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                            </div>
                            <h3 className="text-gray-900 font-medium text-lg mb-1 truncate">
                                {product.name}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                                {product.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-black font-bold text-lg">{product.price}₺</span>
                                <span className="text-amber-600 hover:text-amber-800 text-sm font-medium transition-colors">
                                    Detaylar
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}