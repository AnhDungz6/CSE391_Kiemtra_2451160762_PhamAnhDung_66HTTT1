import React, { useState, useEffect } from 'react';

function ProductForm({ onSubmit, editingProduct, onResetEditing }) {
  // States cho các trường nhập liệu
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Còn hàng');

  // States lưu trữ lỗi validate
  const [errors, setErrors] = useState({
    name: '',
    category: '',
    price: ''
  });

  // Theo dõi khi có sản phẩm cần sửa
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price.toString());
      setStatus(editingProduct.status);
      setErrors({ name: '', category: '', price: '' }); // Xóa hết lỗi
    } else {
      resetFormInputs();
    }
  }, [editingProduct]);

  // Reset form
  const resetFormInputs = () => {
    setName('');
    setCategory('');
    setPrice('');
    setStatus('Còn hàng');
    setErrors({ name: '', category: '', price: '' });
  };

  const handleResetClick = () => {
    resetFormInputs();
    if (onResetEditing) {
      onResetEditing();
    }
  };

  // Validate form
  const validate = () => {
    let isValid = true;
    const tempErrors = { name: '', category: '', price: '' };

    if (!name.trim()) {
      tempErrors.name = 'Tên sản phẩm không được bỏ trống.';
      isValid = false;
    }

    if (!category) {
      tempErrors.category = 'Vui lòng chọn danh mục sản phẩm.';
      isValid = false;
    }

    // Xử lý giá tiền (chấp nhận cả số nguyên mộc lẫn dạng nhập có dấu chấm)
    const rawPrice = price.trim().replace(/\./g, '').replace(/,/g, '');
    const priceValue = parseFloat(rawPrice);

    if (!rawPrice || isNaN(priceValue) || priceValue <= 0) {
      tempErrors.price = 'Giá sản phẩm phải là số dương hợp lệ.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const rawPrice = price.trim().replace(/\./g, '').replace(/,/g, '');
    const priceValue = parseFloat(rawPrice);

    const productData = {
      name: name.trim(),
      category: category,
      price: priceValue,
      status: status
    };

    onSubmit(productData);
    resetFormInputs();
  };

  return (
    <section className="card">
      <h2 className="card-title">
        {editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
      </h2>
      <p className="card-subtitle">
        {editingProduct 
          ? 'Chỉnh sửa thông tin chi tiết và lưu thay đổi.' 
          : 'Nhập đầy đủ thông tin để thêm sản phẩm vào danh sách.'}
      </p>
      
      <form onSubmit={handleSubmit} novalidate>
        {/* Tên sản phẩm */}
        <div className="form-group">
          <label htmlFor="react-product-name">Tên sản phẩm</label>
          <input 
            type="text" 
            id="react-product-name" 
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Nhập tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        {/* Danh mục */}
        <div className="form-group">
          <label htmlFor="react-product-category">Danh mục</label>
          <select 
            id="react-product-category" 
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Điện thoại">Điện thoại</option>
            <option value="Máy tính bảng">Máy tính bảng</option>
            <option value="Phụ kiện">Phụ kiện</option>
            <option value="Laptop">Laptop</option>
            <option value="Tai nghe">Tai nghe</option>
          </select>
          {errors.category && <div className="error-message">{errors.category}</div>}
        </div>

        {/* Giá */}
        <div className="form-group">
          <label htmlFor="react-product-price">Giá</label>
          <input 
            type="text" 
            id="react-product-price" 
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder="Nhập giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <div className="error-message">{errors.price}</div>}
        </div>

        {/* Trạng thái */}
        <div className="form-group">
          <label htmlFor="react-product-status">Trạng thái còn hàng</label>
          <select 
            id="react-product-status" 
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Còn hàng">Còn hàng</option>
            <option value="Hết hàng">Hết hàng</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            {editingProduct ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleResetClick}>
            Làm mới form
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
