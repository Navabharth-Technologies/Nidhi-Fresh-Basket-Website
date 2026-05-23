import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProducePicks from './components/ProducePicks';
import ComboOffers from './components/ComboOffers';
import DairyProducts from './components/DairyProducts';
import Features from './components/Features';
import Products from './components/Products';
import HowToOrder from './components/HowToOrder';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ComingSoon from './components/ComingSoon';
import Preloader from './components/Preloader';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isReloading, setIsReloading] = useState(true); // Greet users with premium load experience on mount

  const triggerReload = () => {
    setIsReloading(true);
  };

  useEffect(() => {
    // scroll to top when coming soon page is shown
    if (showComingSoon) {
      window.scrollTo(0, 0);
    }

    // Auto-scroll logic for new launches
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('launch') === 'true') {
      setTimeout(() => {
        // Scroll to bottom
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });

        // After reaching bottom, scroll back to top
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
          // Clean up URL parameter to avoid re-triggering
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        }, 3000); // Give it 3 seconds to stay at the bottom
      }, 1000); // Wait 1 second after load to start
    }
  }, [showComingSoon]);

  const addToCart = (product) => {
    setCartItems(prev => {
      // Create a unique ID based on product ID and selected variant
      const cartId = `${product.id}-${product.variant || 'default'}`;
      const existing = prev.find(item => item.cartId === cartId);

      if (existing) {
        return prev.map(item =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, cartId, quantity: 1 }];
    });
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const triggerComingSoon = (e) => {
    if (e) e.preventDefault();
    setShowComingSoon(true);
  };

  if (showComingSoon) {
    return <ComingSoon onBackToHome={() => setShowComingSoon(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {isReloading && <Preloader onComplete={() => setIsReloading(false)} />}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
        animate={!isReloading ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0.7, scale: 0.97, filter: 'blur(3px)' }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <Navbar onComingSoon={triggerComingSoon} onReload={triggerReload} />
        <main>
          <Hero onComingSoon={triggerComingSoon} />
          <ProducePicks onComingSoon={triggerComingSoon} />
          <ComboOffers onAddToCart={addToCart} onComingSoon={triggerComingSoon} />
          <DairyProducts onAddToCart={addToCart} onComingSoon={triggerComingSoon} />
          <Features />
          <Products onAddToCart={addToCart} onComingSoon={triggerComingSoon} />
          <HowToOrder />
          <Gallery />
          <Contact onComingSoon={triggerComingSoon} />
        </main>
        <Footer />
        <Cart
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={triggerComingSoon}
        />
      </motion.div>
    </div>
  );
}

export default App;
