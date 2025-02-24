import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Cart from './components/CartList';

function CartPage() {
    const [store, setStore] = useState(null);

    useEffect(() => {
        import("host/store").then((mod) => {
            setStore(mod.store);
        });
    }, []);

    if (!store) return <div>Loading...</div>;
    return (
        <Provider store={store}>
            <div>
                <Cart />
            </div>
        </Provider>
    );
}

export default CartPage;
