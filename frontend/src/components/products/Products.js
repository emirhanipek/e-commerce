import { Link } from 'react-router-dom';
import './products.css';

export default function Products({products}) {
    const getProductImage = (product) => {
        // Check if product has multiple images
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            return `http://localhost:8000/${product.images[0]}`; // Use first image
        }
        // Fallback to single image field for backward compatibility
        if (product.imgUrl) {
            return `http://localhost:8000/${product.imgUrl}`;
        }
        // Default placeholder if no image
        return '/placeholder-image.jpg';
    };

    return (
        <div className='container-products'>
            {products.map(product => {
                return (
                    <Link to={`/product/${product._id}`} key={product._id}>
                        <div className='card'>
                            <div className='card-head'>
                                <img 
                                    src={getProductImage(product)} 
                                    alt={product.name}
                                    onError={(e) => {
                                        e.target.src = '/placeholder-image.jpg';
                                    }}
                                />
                            </div>
                            <div className='card-body'>
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                                <div>{product.price}₺</div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}