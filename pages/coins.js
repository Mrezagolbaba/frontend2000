import React from 'react';
import MainLayout from '@/components/MainLayout/MainLayout';
import CoinsList from '@/components/CoinsList/CoinsList';
import Head from 'next/head';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title> بازار - آرسونیکس</title>
      </Head>
      <CoinsList />
    </MainLayout>
  );
}
