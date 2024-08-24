import React from 'react';
import MainLayout from '@/components/MainLayout/MainLayout';
import AboutUs from '@/components/AboutUs/AboutUs';
import Head from 'next/head';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>درباره ما - آرسونیکس</title>
      </Head>
      <AboutUs />
    </MainLayout>
  );
}
