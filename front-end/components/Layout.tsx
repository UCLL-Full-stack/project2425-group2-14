import Head from 'next/head';
import Header from './Header';
import { ReactNode } from 'react';

import { useEffect } from 'react';
import Footer from './Footer';
import CookiePolicy from './CookiePolicy';

const Layout: React.FC<{ children: ReactNode; className: string }> = ({ children, className }) => {
    useEffect(() => {
        document.body.className = className;
        return () => {
            document.body.className = '';
        };
    }, [className]);

    return (
        <>
            <Head>
                <title>Shoppingcart app</title>
                <meta name="description" content="Shoppingcart app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={'max-w-5xl py-8 mx-auto px-8 min-h-[calc(100dvh-164px)]'}>
                {children}
            </main>
            <Footer />
            <CookiePolicy />
        </>
    );
};

export default Layout;
