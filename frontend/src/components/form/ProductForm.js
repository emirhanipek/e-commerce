import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addPost, getCategories, updateProduct } from "../../store/productSlice";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ProductForm({ title, data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => state.product.categories);
    const [product, setProduct] = useState({ 
        name: '', 
        price: '', 
        description: '', 
        categoryId: '', 
        userId: localStorage.getItem('userId') 
    });
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!product.name.trim()) newErrors.name = 'Ürün adı gereklidir';
        if (!product.price || product.price <= 0) newErrors.price = 'Geçerli bir fiyat giriniz';
        if (!product.description.trim()) newErrors.description = 'Ürün açıklaması gereklidir';
        if (!product.categoryId) newErrors.categoryId = 'Kategori seçiniz';
        if (images.length === 0 && !data) newErrors.images = 'En az 1 görsel yükleyiniz';
        if (images.length > 10) newErrors.images = 'En fazla 10 görsel yükleyebilirsiniz';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const inputOnChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };
      
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };
      
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFiles = (files) => {
        const maxFiles = 10;
        
        if (images.length + files.length > maxFiles) {
            setErrors({ ...errors, images: `En fazla ${maxFiles} görsel yükleyebilirsiniz` });
            return;
        }

        const newImages = [...images, ...files];
        setImages(newImages);

        // Create preview URLs
        const newPreviews = [...previewImages];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                newPreviews.push({
                    file,
                    url: e.target.result,
                    id: Date.now() + Math.random()
                });
                setPreviewImages([...newPreviews]);
            };
            reader.readAsDataURL(file);
        });

        // Clear error
        if (errors.images) {
            setErrors({ ...errors, images: '' });
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const removeImage = (indexToRemove) => {
        const newImages = images.filter((_, index) => index !== indexToRemove);
        const newPreviews = previewImages.filter((_, index) => index !== indexToRemove);
        setImages(newImages);
        setPreviewImages(newPreviews);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            formData.append('categoryId', product.categoryId);
            formData.append('userId', product.userId);
            
            // Append all images with different field names or as array
            if (images.length > 0) {
                images.forEach((image, index) => {
                    formData.append('images', image); // Backend should handle 'images' as array
                });
            }
            
            // For debugging - log what we're sending
            console.log('Sending images:', images.length);
            for (let pair of formData.entries()) {
                if (pair[0] === 'images') {
                    console.log('Image file:', pair[1].name, pair[1].size);
                }
            }
            
            if (data) {
                formData.append('productId', product.productId);
                await dispatch(updateProduct({formData, product}));
            } else {
                await dispatch(addPost(formData));
            }
            
            navigate('/admin_product');
        } catch (error) {
            console.error('Error saving product:', error);
            setErrors({ ...errors, submit: 'Ürün kaydedilirken bir hata oluştu' });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        dispatch(getCategories());
        if (data) {
            setProduct({ 
                productId: data._id,
                name: data.name, 
                price: data.price,
                description: data.description, 
                categoryId: data.categoryId, 
                userId: data.userId 
            });
            
            // Handle multiple existing images
            if (data.images && Array.isArray(data.images) && data.images.length > 0) {
                // If backend returns array of image URLs
                const existingPreviews = data.images.map((imgUrl, index) => ({
                    url: `${process.env.REACT_APP_API_URL}${imgUrl}`,
                    isExisting: true,
                    id: `existing-${index}`
                }));
                setPreviewImages(existingPreviews);
            } else if (data.imgUrl) {
                // Fallback for single image (backward compatibility)
                setPreviewImages([{
                    url: `${process.env.REACT_APP_API_URL}${data.imgUrl}`,
                    isExisting: true,
                    id: 'existing-single'
                }]);
            }
        }
    }, [data, dispatch])

    return (
        <div className="max-w-7xl mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 animate-fadeInUp">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-6 md:p-10 mb-6 md:mb-10 text-center transform hover:scale-[1.01] transition-transform duration-300">
                <h1 className="text-2xl md:text-4xl font-bold md:font-extrabold text-white mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">{title}</h1>
                <p className="text-gray-200 text-sm md:text-lg">{data ? 'Ürün bilgilerini güncelleyin' : 'Yeni ürün ekleyin ve müşterilerinizle buluşturun'}</p>
            </div>

            <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Left Column - Product Info */}
                    <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                        <div className="mb-6 md:mb-8">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Ürün Bilgileri</h2>
                            <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6">Ürün detaylarını eksiksiz doldurarak müşterilerinize doğru bilgi sunun</p>
                            
                            <div className="mb-4 md:mb-6">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                                    Ürün Adı <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="name"
                                    name="name" 
                                    value={product.name}
                                    onChange={inputOnChange}
                                    placeholder="Ürün adını giriniz"
                                    className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-primary-500'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200`}
                                />
                                {errors.name && <p className="mt-1 md:mt-2 text-xs md:text-sm text-red-600 flex items-center"><span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>{errors.name}</p>}
                            </div>

                            <div className="mb-4 md:mb-6">
                                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                                    Fiyat (₺) <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="number" 
                                    id="price"
                                    name="price" 
                                    value={product.price}
                                    onChange={inputOnChange}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 ${errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-primary-500'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200`}
                                />
                                {errors.price && <p className="mt-1 md:mt-2 text-xs md:text-sm text-red-600 flex items-center"><span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>{errors.price}</p>}
                            </div>

                            <div className="mb-4 md:mb-6">
                                <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    id="categoryId"
                                    name="categoryId" 
                                    value={product.categoryId}
                                    onChange={inputOnChange}
                                    className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 ${errors.categoryId ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-primary-500'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200 appearance-none bg-no-repeat bg-right`}
                                    style={{backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundSize: "1.5em 1.5em", backgroundPosition: "right 0.75rem center"}}
                                >
                                    <option value="">Kategori seçiniz</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && <p className="mt-1 md:mt-2 text-xs md:text-sm text-red-600 flex items-center"><span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>{errors.categoryId}</p>}
                            </div>

                            <div className="mb-4 md:mb-6">
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                                    Ürün Açıklaması <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    id="description"
                                    name="description" 
                                    value={product.description}
                                    onChange={inputOnChange}
                                    placeholder="Ürün özelliklerini ve detaylarını yazınız..."
                                    rows="5"
                                    className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-primary-500'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200`}
                                />
                                {errors.description && <p className="mt-1 md:mt-2 text-xs md:text-sm text-red-600 flex items-center"><span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>{errors.description}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Images */}
                    <div className="p-6 md:p-8">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Ürün Görselleri</h2>
                            <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6">Yüksek kaliteli görseller satışlarınızı artırır (En az 1, en fazla 10 görsel)</p>
                            
                            {/* Image Upload Area */}
                            <div 
                                className={`border-2 md:border-3 border-dashed rounded-lg md:rounded-xl p-4 md:p-8 text-center transition-all duration-300 ${dragActive ? 'border-primary-500 bg-primary-50 scale-[1.02] shadow-lg' : errors.images ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    id="image-upload"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer block group">
                                    <CloudUploadIcon className={`h-10 w-10 md:h-16 md:w-16 mx-auto ${dragActive ? 'text-primary-500 scale-110' : 'text-gray-400'} group-hover:text-primary-500 transition-all duration-300 transform group-hover:scale-110`} />
                                    <span className={`block mt-2 md:mt-4 text-sm md:text-base font-medium ${dragActive ? 'text-primary-700' : 'text-gray-700'} group-hover:text-primary-700 transition-colors duration-200`}>
                                        {dragActive ? 'Bırakın ve Yükleyin!' : 'Görselleri sürükleyip bırakın veya seçin'}
                                    </span>
                                    <span className="block mt-1 md:mt-2 text-xs md:text-sm text-gray-500">
                                        PNG, JPG, JPEG (Max 15MB, En fazla 10 adet)
                                    </span>
                                </label>
                            </div>
                            {errors.images && <p className="mt-1 md:mt-2 text-xs md:text-sm text-red-600 flex items-center"><span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>{errors.images}</p>}

                            {/* Image Previews */}
                            {previewImages.length > 0 && (
                                <div className="mt-4 md:mt-8 animate-scaleIn">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2 md:mb-4 flex items-center">
                                        <PhotoCameraIcon className="mr-2 text-primary-500 h-4 w-4 md:h-5 md:w-5" />
                                        Yüklenen Görseller 
                                        <span className="ml-2 text-xs md:text-sm font-normal px-1.5 md:px-2 py-0.5 md:py-1 bg-primary-100 text-primary-800 rounded-full">
                                            {previewImages.length}/10
                                        </span>
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                                        {previewImages.map((preview, index) => (
                                            <div key={preview.id} className="relative group rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]">
                                                <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                                                    <img 
                                                        src={preview.url} 
                                                        alt={`Önizleme ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                                {!preview.isExisting && (
                                                    <button
                                                        type="button"
                                                        className="absolute top-1 md:top-2 right-1 md:right-2 bg-red-500 text-white rounded-full p-1 md:p-1.5 shadow-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 opacity-0 group-hover:opacity-100"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        <DeleteIcon className="h-3 w-3 md:h-4 md:w-4" />
                                                    </button>
                                                )}
                                                <div className="absolute bottom-1 md:bottom-2 left-1 md:left-2 bg-black/70 text-white text-xs py-0.5 md:py-1 px-1.5 md:px-2.5 rounded-full flex items-center shadow-md">
                                                    <PhotoCameraIcon className="h-2 w-2 md:h-3 md:w-3 mr-0.5 md:mr-1" />
                                                    <span>{index + 1}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="px-6 md:px-8 py-4 md:py-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-3 sm:space-y-0">
                    <button 
                        type="button" 
                        className="inline-flex items-center justify-center px-4 md:px-5 py-2 md:py-3 border-2 border-gray-300 shadow-sm text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 w-full sm:w-auto"
                        onClick={() => navigate('/admin_product')}
                        disabled={isLoading}
                    >
                        <CancelIcon className="mr-2 -ml-1 h-5 w-5" />
                        İptal
                    </button>
                    <button 
                        type="submit" 
                        className={`relative inline-flex items-center justify-center px-5 md:px-6 py-2 md:py-3 border border-transparent shadow-lg text-sm font-semibold rounded-lg text-white ${isLoading ? 'bg-primary-400' : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transform hover:-translate-y-0.5'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 w-full sm:w-auto`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <SaveIcon className="mr-2 -ml-1 h-5 w-5" />
                        )}
                        {isLoading ? 'Kaydediliyor...' : (data ? 'Güncelle' : 'Kaydet')}
                    </button>
                </div>
                
                {errors.submit && (
                    <div className="px-8 py-4 bg-red-50 border-t border-red-200 animate-scaleIn">
                        <p className="text-sm text-red-600 flex items-center">
                            <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {errors.submit}
                        </p>
                    </div>
                )}
            </form>
        </div>
    )
}