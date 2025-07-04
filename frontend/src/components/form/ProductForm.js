import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addPost, getCategories, updateProduct } from "../../store/productSlice";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import './ProductForm.css';

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

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
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
                    url: `http://localhost:8000/${imgUrl}`,
                    isExisting: true,
                    id: `existing-${index}`
                }));
                setPreviewImages(existingPreviews);
            } else if (data.imgUrl) {
                // Fallback for single image (backward compatibility)
                setPreviewImages([{
                    url: `http://localhost:8000/${data.imgUrl}`,
                    isExisting: true,
                    id: 'existing-single'
                }]);
            }
        }
    }, [data, dispatch])

    return (
        <div className="modern-product-form">
            <div className="form-header">
                <h1>{title}</h1>
                <p>{data ? 'Ürün bilgilerini güncelleyin' : 'Yeni ürün ekleyin ve müşterilerinizle buluşturun'}</p>
            </div>

            <form className="product-form" onSubmit={onSubmit}>
                <div className="form-grid">
                    {/* Left Column - Product Info */}
                    <div className="form-column">
                        <div className="form-section">
                            <h3>Ürün Bilgileri</h3>
                            
                            <div className="input-group">
                                <label>Ürün Adı *</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={product.name}
                                    onChange={inputOnChange}
                                    placeholder="Ürün adını giriniz"
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <span className="error-text">{errors.name}</span>}
                            </div>

                            <div className="input-group">
                                <label>Fiyat (₺) *</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    value={product.price}
                                    onChange={inputOnChange}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className={errors.price ? 'error' : ''}
                                />
                                {errors.price && <span className="error-text">{errors.price}</span>}
                            </div>

                            <div className="input-group">
                                <label>Kategori *</label>
                                <select 
                                    name="categoryId" 
                                    value={product.categoryId}
                                    onChange={inputOnChange}
                                    className={errors.categoryId ? 'error' : ''}
                                >
                                    <option value="">Kategori seçiniz</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && <span className="error-text">{errors.categoryId}</span>}
                            </div>

                            <div className="input-group">
                                <label>Ürün Açıklaması *</label>
                                <textarea 
                                    name="description" 
                                    value={product.description}
                                    onChange={inputOnChange}
                                    placeholder="Ürün özelliklerini ve detaylarını yazınız..."
                                    rows="5"
                                    className={errors.description ? 'error' : ''}
                                />
                                {errors.description && <span className="error-text">{errors.description}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Images */}
                    <div className="form-column">
                        <div className="form-section">
                            <h3>Ürün Görselleri</h3>
                            <p className="section-desc">En az 1, en fazla 10 görsel yükleyebilirsiniz</p>
                            
                            {/* Image Upload Area */}
                            <div className={`image-upload-area ${errors.images ? 'error' : ''}`}>
                                <input
                                    type="file"
                                    id="image-upload"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="image-upload" className="upload-label">
                                    <CloudUploadIcon className="upload-icon" />
                                    <span className="upload-text">
                                        Görselleri sürükleyip bırakın veya seçin
                                    </span>
                                    <span className="upload-subtext">
                                        PNG, JPG, JPEG (Max 5MB)
                                    </span>
                                </label>
                            </div>
                            {errors.images && <span className="error-text">{errors.images}</span>}

                            {/* Image Previews */}
                            {previewImages.length > 0 && (
                                <div className="image-previews">
                                    <h4>Yüklenen Görseller ({previewImages.length}/10)</h4>
                                    <div className="preview-grid">
                                        {previewImages.map((preview, index) => (
                                            <div key={preview.id} className="preview-item">
                                                <img src={preview.url} alt={`Preview ${index + 1}`} />
                                                {!preview.isExisting && (
                                                    <button
                                                        type="button"
                                                        className="remove-image"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                )}
                                                <div className="image-info">
                                                    <PhotoCameraIcon />
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
                <div className="form-actions">
                    <button 
                        type="button" 
                        className="btn-cancel"
                        onClick={() => navigate('/admin_product')}
                        disabled={isLoading}
                    >
                        <CancelIcon />
                        İptal
                    </button>
                    <button 
                        type="submit" 
                        className={`btn-save ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="loading-spinner"></div>
                        ) : (
                            <SaveIcon />
                        )}
                        {isLoading ? 'Kaydediliyor...' : (data ? 'Güncelle' : 'Kaydet')}
                    </button>
                </div>
            </form>
        </div>
    )
}