import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';

const CategoryTest = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    console.log('CategoryTest component mounted');
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Category Test Component</h1>
      <p>Status: {categories.status}</p>
      {categories.error && <p style={{ color: 'red' }}>Error: {categories.error}</p>}
      
      <h2>Categories ({categories.items?.length || 0})</h2>
      {categories.status === 'loading' ? (
        <p>Loading...</p>
      ) : categories.items && categories.items.length > 0 ? (
        <ul>
          {categories.items.map((category) => (
            <li key={category._id}>{category.name} (ID: {category._id})</li>
          ))}
        </ul>
      ) : (
        <p>No categories found</p>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Redux State Dump:</h3>
        <pre style={{ background: '#f0f0f0', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(categories, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default CategoryTest;
