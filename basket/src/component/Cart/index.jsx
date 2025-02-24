import React from "react";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, Card, Typography, Row, Col, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";

const { Text } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products) ?? [];

  // Handle removing a product from the cart
  const handleRemoveFromCart = (productId) => {
    dispatch({ type: "products/removeProduct", payload: productId });
  };

  // Handle increasing the product quantity
  const handleIncreaseQuantity = (productId) => {
    dispatch({ type: "products/increaseQuantity", payload: productId });
  };

  // Handle decreasing the product quantity
  const handleDecreaseQuantity = (productId) => {
    dispatch({ type: "products/decreaseQuantity", payload: productId });
  };

  const columns = [
    {
      title: "Cart Items",
      key: "cartItems",
      render: (_, product) => (
        <Card
          title={product.title}
          extra={
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveFromCart(product.id)}
            />
          }
          style={{ width: 300, marginBottom: 16 }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100%", objectFit: "contain" }}
              />
            </Col>
            <Col span={18}>
              <Text>Category: {product.category}</Text>
              <br />
              <Text strong>Price: ${product.price}</Text>
              <br />
              <Space size="middle">
                <Button
                  shape="circle"
                  icon={<MinusOutlined />}
                  onClick={() => handleDecreaseQuantity(product.id)}
                  disabled={product.quantity <= 1}
                />
                <Text strong>{product.quantity}</Text>
                <Button
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={() => handleIncreaseQuantity(product.id)}
                />
              </Space>
            </Col>
          </Row>
        </Card>
      ),
    },
  ];

  return (
    <div>
      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <span>No products in the cart</span>
        </div>
      ) : (
        <Table
          columns={columns}
          scroll={{ x: "max-content" }}
          dataSource={products}
          rowKey="id"
        />
      )}
    </div>
  );
};

export default Cart;
