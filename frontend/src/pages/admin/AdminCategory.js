import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, updateCategory, deleteCategory, setCurrentCategory, clearCurrentCategory } from '../../store/categorySlice';
import './AdminCategory.css';
import Loader from '../../components/Loader';

const AdminCategory = () => {
  const dispatch = useDispatch();
  const { items, status, error, currentCategory } = useSelector((state) => state.categories || { items: [], status: 'idle', error: null, currentCategory: null });
  const [formData, setFormData] = useState({ name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    console.log('AdminCategory component mounted');
    console.log('Redux store categories state:', { items, status, error, currentCategory });
    
    try {
      dispatch(fetchCategories())
        .unwrap()
        .then(result => {
          console.log('Categories fetched successfully:', result);
        })
        .catch(err => {
          console.error('Failed to fetch categories:', err);
          setLocalError('Kategorileri yüklerken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        });
    } catch (err) {
      console.error('Error dispatching fetchCategories:', err);
      setLocalError('Bir hata oluştu. Lütfen sayfayı yenileyin.');
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentCategory) {
      setFormData({ name: currentCategory.name });
      setIsEditing(true);
    } else {
      setFormData({ name: '' });
      setIsEditing(false);
    }
  }, [currentCategory]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Kategori adı boş olamaz!');
      return;
    }

    if (isEditing && currentCategory) {
      dispatch(updateCategory({ id: currentCategory._id, categoryData: formData }))
        .then(() => {
          resetForm();
        });
    } else {
      dispatch(createCategory(formData))
        .then(() => {
          resetForm();
        });
    }
  };

  const resetForm = () => {
    setFormData({ name: '' });
    setIsEditing(false);
    dispatch(clearCurrentCategory());
  };

  const handleEdit = (category) => {
    dispatch(setCurrentCategory(category));
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
      dispatch(deleteCategory(id));
    }
  };

  const filteredCategories = items.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <div className="admin-category-container">
        <h1 className="admin-category-title">Kategori Yönetimi</h1>
        <div className="admin-category-loading">
          <Loader />
          <p>Kategoriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed' || localError) {
    return (
      <div className="admin-category-container">
        <h1 className="admin-category-title">Kategori Yönetimi</h1>
        <div className="admin-category-error">
          <h3>Hata Oluştu</h3>
          <p>{localError || error || 'Kategoriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'}</p>
          <button 
            className="btn-retry" 
            onClick={() => {
              setLocalError(null);
              dispatch(fetchCategories());
            }}
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-category-container">
      <h1 className="admin-category-title">Kategori Yönetimi</h1>
      
      <div className="admin-category-card">
        <h2>{isEditing ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}</h2>
        <form onSubmit={handleSubmit} className="admin-category-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Kategori Adı"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-save">
              {isEditing ? 'Güncelle' : 'Ekle'}
            </button>
            {isEditing && (
              <button 
                type="button" 
                className="btn-cancel"
                onClick={resetForm}
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-category-list-container">
        <div className="admin-category-search">
          <input
            type="text"
            placeholder="Kategori Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        {status === 'failed' && <div className="error-message">Hata: {error}</div>}
        
        {filteredCategories.length === 0 ? (
          <div className="no-categories">
            {searchTerm ? 'Arama kriterine uygun kategori bulunamadı.' : 'Henüz kategori eklenmemiş.'}
          </div>
        ) : (
          <div className="category-table-container">
            <table className="category-table">
              <thead>
                <tr>
                  <th>Kategori Adı</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(category)}
                      >
                        Düzenle
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(category._id)}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategory;