import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthHeader from '../utility/AuthHeader';
import { api } from '../utility/api';

// Tüm kategorileri getir
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      console.log('Fetching categories from API...');
      const response = await api().get(`/categories`);
      console.log('Categories API response:', response.data);
      return response.data.data || response.data.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
);

// Yeni kategori oluştur
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData) => {
    try {
      console.log('Creating category:', categoryData);
      const response = await api().post(
        `/categories`, 
        categoryData, 
        { headers: AuthHeader() }
      );
      console.log('Create category response:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }
);

// Kategori güncelle
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, categoryData }) => {
    try {
      console.log('Updating category:', id, categoryData);
      const response = await api().put(
        `/categories/${id}`, 
        categoryData, 
        { headers: AuthHeader() }
      );
      console.log('Update category response:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }
);

// Kategori sil
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id) => {
    try {
      console.log('Deleting category:', id);
      await api().delete(
        `/categories/${id}`, 
        { headers: AuthHeader() }
      );
      return id;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentCategory: null
  },
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        console.log('fetchCategories.pending');
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log('fetchCategories.fulfilled', action.payload);
        state.status = 'succeeded';
        state.items = action.payload || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.log('fetchCategories.rejected', action.error);
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create category
      .addCase(createCategory.fulfilled, (state, action) => {
        console.log('createCategory.fulfilled', action.payload);
        state.items.push(action.payload);
      })
      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        console.log('updateCategory.fulfilled', action.payload);
        const index = state.items.findIndex(cat => cat._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        console.log('deleteCategory.fulfilled', action.payload);
        state.items = state.items.filter(cat => cat._id !== action.payload);
      });
  }
});

export const { setCurrentCategory, clearCurrentCategory } = categorySlice.actions;

export default categorySlice.reducer;