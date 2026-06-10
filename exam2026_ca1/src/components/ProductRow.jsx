
function ProductRow({ product, index }) {
  // Định dạng giá tiền: 24.990.000 đ
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  const badgeClass =
    product.status === "Còn hàng" ? "badge-success" : "badge-danger";

  return (
    <tr>
      <td>{index + 1}</td>
      <td style={{ fontWeight: 500 }}>{product.name}</td>
      <td>{product.category}</td>
      <td className="price-cell">{formatPrice(product.price)}</td>
      <td>
        <span className={`badge ${badgeClass}`}>{product.status}</span>
      </td>
    </tr>
  );
}

export default ProductRow;
