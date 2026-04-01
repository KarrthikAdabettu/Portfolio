import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingScroll from './FloatingScroll';

const Layout = () => {
    const location = useLocation();

    // Scroll restoration logic
    useEffect(() => {
        // If there's no scrollTo state, simply jump/scroll to the top smoothly when path changes
        if (!location.state?.scrollTo) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [location.pathname]);

    return (
        <div className="layout-wrapper">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <FloatingScroll />
        </div>
    );
};

export default Layout;
