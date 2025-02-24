import React from 'react';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, Card, Typography, Row, Col, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "host/store";

const { Text } = Typography;

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const addProducts = (product, quantity = 1) => {
        const existingProduct = cart.find((item) => item.id === product.id);

        let updatedCart;
        if (existingProduct) {
            updatedCart = cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity }];
        }

        dispatch(setCart(updatedCart));
    };

    const removeProduct = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);

        if (!existingProduct) return;

        let updatedCart;
        if (existingProduct.quantity > 1) {
            updatedCart = cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            );
        } else {
            updatedCart = cart.filter((item) => item.id !== product.id);
        }

        dispatch(setCart(updatedCart));
    };

    const handleRemove = (product) => {
        const updatedCart = cart.filter((item) => item.id !== product.id);
        dispatch(setCart(updatedCart));
    };

    const columns = [
        {
            title: "Cart Items",
            key: "cartItems",
            render: (_, product) => (
                <Card
                    title={product.title}
                    extra={<Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleRemove(product)} />}
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
                                    onClick={() => removeProduct(product)}
                                    disabled={product.quantity <= 1}
                                />
                                <Text strong>{product.quantity}</Text>
                                <Button
                                    shape="circle"
                                    icon={<PlusOutlined />}
                                    onClick={() => addProducts(product)}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Card>
            ),
        },
    ];

    const pagination = {
        pageSize: 2,
    };

    return (
        <div>
            {cart?.length === 0 ? (
                <div style={{ textAlign: "center", padding: "50px 0" }}>
                    <span>No products in the cart</span>
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={cart}
                    rowKey="id"
                    pagination={pagination}
                    bordered
                    scroll={{ x: "max-content" }}
                />
            )}
        </div>
    );
};

export default Cart;
