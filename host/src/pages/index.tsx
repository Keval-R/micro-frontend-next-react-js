'use client'
import React from "react";
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from "antd";
import { changeDrawer } from '@/store';

const HomePage = dynamic(() => import('nextApp/Home'), {
  ssr: false,
  suspense: true,
});

const CartPage = dynamic(() => import('reactApp/CartPage'), {
  ssr: false,
  suspense: true,
});



export default function Home() {
  const dispatch = useDispatch()
  const [isClient, setIsClient] = useState(false);
  const visible = useSelector((state: any) => state.drawer.visible);

  const onClose = () => {
    dispatch(changeDrawer(false))
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderApp = () => (
    <React.Fragment>
      <Drawer
        title="Your Cart"
        placement="right"
        width={600}
        onClose={onClose}
        visible={visible}
      >
        <Suspense fallback="Loading Cart...">
          <CartPage />
        </Suspense>
      </Drawer>
      <Suspense fallback={<div>Loading Products...</div>}>
        <HomePage />
      </Suspense>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {isClient ? renderApp() : <div>Loading...</div>}
    </React.Fragment>
  );
}
