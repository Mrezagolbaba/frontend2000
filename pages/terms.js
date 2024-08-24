import React from 'react';
import MainLayout from '@/components/MainLayout/MainLayout';
import Terms from '@/components/Terms/Terms';
import Head from 'next/head';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title> قوانین و مقررات - آرسونیکس</title>
      </Head>
      <Terms />
    </MainLayout>
  );
}
