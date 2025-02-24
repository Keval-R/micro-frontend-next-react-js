"use client";
import React from "react";
import { useGetProductsQuery } from "@/api/productApi";
import { Button, Row, Col, Card, Typography, Space, Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined, MinusOutlined, DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const ProductList = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.products);
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products.</p>;

  const handleAddToCart = (product) => {
    dispatch({ type: "products/addProduct", payload: { ...product, quantity: 1 } });
  };

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: "products/removeProduct", payload: productId });
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch({ type: "products/increaseQuantity", payload: productId });
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch({ type: "products/decreaseQuantity", payload: productId });
  };
  const handleCartClick = () => {
    dispatch({ type: 'drawer/openDrawer' });
  };


  return (
    <div style={{ padding: "20px" }}>
      <Row
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: "#fff",
          padding: "10px 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Col span={12}>
          <Title level={2} style={{ margin: 0 }}>Products</Title>
        </Col>

        <Col span={12} style={{ textAlign: "right", marginTop: '5px' }}>
          <ShoppingCartOutlined style={{ fontSize: "24px", cursor: "pointer" }} onClick={handleCartClick} />
          {cartProducts.length > 0 && (
            <Badge count={cartProducts.length} showZero style={{
              cursor: "pointer", position: "absolute", bottom: 6,
              left: '-6px',
            }} />
          )}
        </Col>
      </Row>
      <div style={{ marginTop: "70px" }}>
        <Row gutter={[16, 16]}>
          {products.map((product) => {
            const cartItem = cartProducts.find((item) => item.id === product.id);
            return (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ height: "200px", objectFit: "contain", padding: "10px" }}
                    />
                  }
                >
                  <Title level={5} ellipsis>
                    {product.title}
                  </Title>
                  <Text type="secondary">{product.category}</Text>
                  <p style={{ margin: "10px 0" }}>${product.price}</p>

                  {cartItem ? (
                    <Space>
                      <Button
                        shape="circle"
                        icon={<MinusOutlined />}
                        onClick={() => handleDecreaseQuantity(product.id)}
                        disabled={cartItem.quantity <= 1}
                      />
                      <Text strong>{cartItem.quantity}</Text>
                      <Button
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={() => handleIncreaseQuantity(product.id)}
                      />
                      <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveFromCart(product.id)}
                      />
                    </Space>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => handleAddToCart(product)}
                      style={{ width: "auto", padding: "0 12px" }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div >
  );
};

export default ProductList;
