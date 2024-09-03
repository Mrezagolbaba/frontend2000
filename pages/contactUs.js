import React from 'react';
import MainLayout from '@/components/MainLayout/MainLayout';
import ContactUs from '@/components/ContactUs/ContactUs';
import Head from 'next/head';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title> تماس با ما - آرسونیکس</title>
      </Head>
      <ContactUs />
    </MainLayout>
  );
}
