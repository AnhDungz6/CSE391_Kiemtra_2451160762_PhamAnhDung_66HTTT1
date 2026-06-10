import React, { useState } from 'react';
import Header from './components/Header';
import ProductForm from './components/ProductForm';
import ProductTable from '././components/ProductTable';
import { mockData } from './data/data';
import './styles/app.css';

function App() {
  const [products, setProducts] = useState(mockData);
  const [editingProduct, setEditingProduct] = useState(null);

  // Xử lý Thêm hoặc Cập nhật sản phẩm
  const handleSubmitProduct = (productData) => {
    if (editingProduct) {
      // Cập nhật sản phẩm cũ
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id ? { ...p, ...productData } : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      // Thêm sản phẩm mới
      const newProduct = {
        id: Date.now(),
        ...productData
      };
      setProducts([...products, newProduct]);
    }
  };

  // Chọn sản phẩm để sửa
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (id) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
    if (isConfirmed) {
      setProducts(products.filter((p) => p.id !== id));
      if (editingProduct && editingProduct.id === id) {
        setEditingProduct(null);
      }
    }
  };

  // Hủy/Reset trạng thái sửa
  const handleResetEditing = () => {
    setEditingProduct(null);
  };

  return (
    <div className="container">
      {/* BANNER ĐẦU TRANG */}
      <Header />

      {/* NỘI DUNG CHÍNH CHIA 2 CỘT */}
      <main className="main-content">
        {/* CỘT TRÁI: FORM THÊM/SỬA */}
        <ProductForm 
          onSubmit={handleSubmitProduct}
          editingProduct={editingProduct}
          onResetEditing={handleResetEditing}
        />

        {/* CỘT PHẢI: BẢNG DANH SÁCH & THỐNG KÊ */}
        <ProductTable 
          products={products}
          onEdit={handleEditClick}
          onDelete={handleDeleteProduct}
        />
      </main>
    </div>
  );
}

export default App;
