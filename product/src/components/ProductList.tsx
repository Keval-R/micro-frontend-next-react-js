'use client'

import { useDispatch, useSelector } from "react-redux";
import { setCart, changeDrawer } from "host/store";
import { PlusOutlined, MinusOutlined, DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Row, Col, Typography, Button, Badge, Space } from 'antd';
import { useGetProductsQuery } from "@/pages/api/productApi";

const { Title, Text } = Typography;

const ProductList = () => {
    const dispatch = useDispatch();
    const { data: products, error, isLoading } = useGetProductsQuery();
    const cart = useSelector((state: any) => state.cart.cart);

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products</p>;

    const addProducts = (product: any, quantity = 1) => {
        const existingProduct = cart.find((item: any) => item.id === product.id);

        let updatedCart;
        if (existingProduct) {
            updatedCart = cart.map((item: any) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item // Increment quantity
            );
        } else {
            updatedCart = [...cart, { ...product, quantity }];
        }

        dispatch(setCart(updatedCart));
    };

    const removeProduct = (product: any) => {
        const existingProduct = cart.find((item: any) => item.id === product.id);

        if (!existingProduct) return;

        let updatedCart;
        if (existingProduct.quantity > 1) {
            updatedCart = cart.map((item: any) =>
                item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            );
        } else {
            updatedCart = cart.filter((item: any) => item.id !== product.id);
        }

        dispatch(setCart(updatedCart));
    };

    const handleRemove = (product: any) => {
        const updatedCart = cart.filter((item: any) => item.id !== product.id);
        dispatch(setCart(updatedCart));
    };

    const handleCartClick = () => {
        dispatch(changeDrawer(true));
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
                    {cart.length > 0 && (
                        <Badge count={cart.length} showZero style={{
                            cursor: "pointer", position: "absolute", bottom: 6,
                            left: '-6px',
                        }} />
                    )}
                </Col>
            </Row>
            <div style={{ marginTop: "70px" }}>
                <Row gutter={[16, 16]}>
                    {products?.map((product: any) => {
                        const cartItem = cart.find((item: any) => item.id === product.id);
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
                                                onClick={() => removeProduct(product)}
                                                disabled={cartItem.quantity <= 1}
                                            />
                                            <Text strong>{cartItem.quantity}</Text>
                                            <Button
                                                shape="circle"
                                                icon={<PlusOutlined />}
                                                onClick={() => addProducts(product)}
                                            />
                                            <Button
                                                type="primary"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => handleRemove(product)}
                                            />
                                        </Space>
                                    ) : (
                                        <Button
                                            type="primary"
                                            onClick={() => addProducts(product)}
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
        </div>
    );
};

export default ProductList;
