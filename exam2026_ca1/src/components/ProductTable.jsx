import ProductRow from './ProductRow';

function ProductTable({ products }) {
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
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>
                  Chưa có sản phẩm nào trong danh sách.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <ProductRow 
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProductTable;
