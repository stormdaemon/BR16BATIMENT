"use client";

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';
import logo from '../../../assets/logo.png';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Accueil' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' }
  ];

  const toggleMenu = (): void => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src={logo} alt="BR16BATIMENT - Charpentier professionnel" />
          <span className={styles.logoText}>BR16BATIMENT</span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button 
          className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <nav className={styles.mobileNav}>
                <ul className={styles.mobileNavList}>
                  {navigationItems.map((item) => (
                    <li key={item.path}>
                      <Link 
                        to={item.path}
                        className={`${styles.mobileNavLink} ${location.pathname === item.path ? styles.active : ''}`}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
