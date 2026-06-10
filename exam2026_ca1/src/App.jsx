import { useState } from 'react';
import Header from './components/Header';
import ProductForm from './components/ProductForm';
import ProductTable from '././components/ProductTable';
import { mockData } from './data/data';
import './styles/app.css';

function App() {
  const [products, setProducts] = useState(mockData);

  // Xử lý Thêm sản phẩm mới
  const handleSubmitProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="container">
      {/* BANNER ĐẦU TRANG */}
      <Header />

      {/* NỘI DUNG CHÍNH CHIA 2 CỘT */}
      <main className="main-content">
        {/* CỘT TRÁI: FORM THÊM */}
        <ProductForm 
          onSubmit={handleSubmitProduct}
        />

        {/* CỘT PHẢI: BẢNG DANH SÁCH & THỐNG KÊ */}
        <ProductTable 
          products={products}
        />
      </main>
    </div>
  );
}

export default App;
