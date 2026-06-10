import React from 'react';
import ProductRow from './ProductRow';

function ProductTable({ products, onEdit, onDelete }) {
  // Tính toán các chỉ số thống kê động
  const total = products.length;
  const instock = products.filter(p => p.status === 'Còn hàng').length;
  const outstock = total - instock;

  return (
    <section className="card">
      <h2 className="card-title">Danh sách sản phẩm</h2>
      <p className="card-subtitle">Danh sách sản phẩm mẫu được hiển thị từ dữ liệu hệ thống.</p>
      
      <div className="table-responsive">
        <table className="product-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>STT</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th style={{ width: '120px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>
                  Chưa có sản phẩm nào trong danh sách.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <ProductRow 
                  key={product.id}
                  product={product}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Dashboard Thống kê */}
      <div className="dashboard-stats">
        <div className="stat-item">
          <div className="stat-num">{total}</div>
          <div className="stat-lbl">Tổng sản phẩm</div>
        </div>
        <div className="stat-item">
          <div className="stat-num" style={{ color: 'var(--success-color)' }}>{instock}</div>
          <div className="stat-lbl">Còn hàng</div>
        </div>
        <div className="stat-item">
          <div className="stat-num" style={{ color: 'var(--danger-color)' }}>{outstock}</div>
          <div className="stat-lbl">Hết hàng</div>
        </div>
      </div>
    </section>
  );
}

export default ProductTable;
