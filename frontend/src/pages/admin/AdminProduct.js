import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProductsByUserId } from "../../store/productSlice";
// Material UI icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import InventoryIcon from '@mui/icons-material/Inventory';
import SortIcon from '@mui/icons-material/Sort';

export default function AdminProduct() {
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.product.userProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const deleteBtnOnClick = (productId) => {
        if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
            dispatch(deleteProduct(productId));
        }
    }

    const getProductImage = (product) => {
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            return `https://api.sergioferrari.tr/${product.images[0]}`;
        }
        if (product.imgUrl) {
            return `https://api.sergioferrari.tr/${product.imgUrl}`;
        }
        return '/placeholder-image.jpg';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR');
    };
    
    const sortProducts = (products) => {
        return [...products].sort((a, b) => {
            let comparison = 0;
            
            if (sortField === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortField === 'price') {
                comparison = a.price - b.price;
            } else if (sortField === 'date') {
                comparison = new Date(a.date) - new Date(b.date);
            }
            
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    };
    
    const toggleSelectProduct = (productId) => {
        setSelectedProducts(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };
    
    const handleBulkDelete = () => {
        if (selectedProducts.length === 0) return;
        
        if (window.confirm(`Seçilen ${selectedProducts.length} ürünü silmek istediğinizden emin misiniz?`)) {
            selectedProducts.forEach(id => {
                dispatch(deleteProduct(id));
            });
            setSelectedProducts([]);
        }
    };

    useEffect(() => {
        dispatch(getProductsByUserId(userId));
    }, [userId, dispatch]);

    useEffect(() => {
        const filtered = userProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [userProducts, searchTerm]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1>
                    <p className="text-sm text-gray-500 mt-1">Mağazanızdaki ürünleri yönetin</p>
                </div>
                <Link 
                    to="/add_product" 
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                    <AddIcon className="h-5 w-5 mr-2" />
                    Yeni Ürün Ekle
                </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Ürün ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition duration-150 ease-in-out"
                    />
                </div>
                <div className="text-sm text-gray-500">
                    {filteredProducts.length} ürün bulundu
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-3 rounded-lg shadow-sm mb-6 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                            viewMode === 'grid' 
                                ? 'bg-primary-100 text-primary-700' 
                                : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                            viewMode === 'list' 
                                ? 'bg-primary-100 text-primary-700' 
                                : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    
                    {selectedProducts.length > 0 && (
                        <button 
                            onClick={handleBulkDelete}
                            className="ml-2 p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center"
                        >
                            <DeleteOutlineIcon className="h-5 w-5 mr-1" />
                            <span>{selectedProducts.length} Ürünü Sil</span>
                        </button>
                    )}
                </div>
                
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-500">Sırala:</span>
                        <select 
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                            className="text-sm border-0 rounded-md bg-gray-100 py-1 pl-2 pr-8 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        >
                            <option value="date">Tarih</option>
                            <option value="name">İsim</option>
                            <option value="price">Fiyat</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-5 w-5 transform transition-transform ${sortOrder === 'asc' ? '' : 'rotate-180'}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid View */}
            {filteredProducts.length > 0 ? (
                viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sortProducts(filteredProducts).map(item => (
                            <div key={item._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 relative">
                                {/* Selection Checkbox */}
                                <div className="absolute top-2 left-2 z-10">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(item._id)}
                                        onChange={() => toggleSelectProduct(item._id)}
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                </div>

                                <div className="relative bg-gray-200">
                                    <img 
                                        src={getProductImage(item)} 
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <Link 
                                            to={`/product/${item._id}`} 
                                            className="flex items-center justify-center h-8 w-8 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200"
                                        >
                                            <VisibilityIcon className="h-5 w-5 text-gray-700" />
                                        </Link>
                                    </div>
                                </div>
                                
                                <div className="p-4">
                                    <div className="mb-2">
                                        <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                                        <div className="text-lg font-bold text-primary-600">{item.price}₺</div>
                                    </div>
                                    
                                    <div className="flex items-center text-xs text-gray-500 mb-4">
                                        <span>{formatDate(item.date)}</span>
                                    </div>
                                    
                                    <div className="flex space-x-2">
                                        <Link 
                                            to={`/edit_product/${item._id}`} 
                                            className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                                        >
                                            <DriveFileRenameOutlineIcon className="h-4 w-4 mr-1" />
                                            Düzenle
                                        </Link>
                                        <button 
                                            className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-transparent rounded text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                            onClick={() => deleteBtnOnClick(item._id)}
                                        >
                                            <DeleteOutlineIcon className="h-4 w-4 mr-1" />
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedProducts(filteredProducts.map(p => p._id));
                                                } else {
                                                    setSelectedProducts([]);
                                                }
                                            }}
                                            checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                                        />
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ürün
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fiyat
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tarih
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortProducts(filteredProducts).map(item => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                                checked={selectedProducts.includes(item._id)}
                                                onChange={() => toggleSelectProduct(item._id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <img 
                                                        className="h-10 w-10 rounded-md object-cover" 
                                                        src={getProductImage(item)} 
                                                        alt={item.name}
                                                        onError={(e) => {
                                                            e.target.src = '/placeholder-image.jpg';
                                                        }}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-primary-600">{item.price}₺</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(item.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    to={`/product/${item._id}`}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    <VisibilityIcon className="h-5 w-5" />
                                                </Link>
                                                <Link
                                                    to={`/edit_product/${item._id}`}
                                                    className="text-primary-600 hover:text-primary-700"
                                                >
                                                    <DriveFileRenameOutlineIcon className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteBtnOnClick(item._id)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <DeleteOutlineIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="text-4xl mb-4">📦</div>
                    <h2 className="text-xl font-medium text-gray-900 mb-2">Henüz ürün yok</h2>
                    <p className="text-gray-500 mb-6">İlk ürününüzü ekleyerek başlayın</p>
                    <Link 
                        to="/add_product" 
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        <AddIcon className="h-5 w-5 mr-2" />
                        İlk Ürünü Ekle
                    </Link>
                </div>
            )}
        </div>
    )
}