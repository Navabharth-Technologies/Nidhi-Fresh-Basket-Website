import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.png';
import preloaderBase from '../assets/preloader_base.png';
import reloadVideo from '../assets/create_reloading_page_to_add_a.mp4';
import './Preloader.css';

// --- Premium High-Gloss Illustrated SVG Fruits & Vegetables (Ambient Watermarks) ---

const AppleSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
            <radialGradient id="apple-grad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFA1A1" />
                <stop offset="65%" stopColor="#F87171" />
                <stop offset="100%" stopColor="#DC2626" />
            </radialGradient>
            <linearGradient id="apple-leaf" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#86EFAC" />
            </linearGradient>
        </defs>
        <path d="M50 82 C30 82 12 70 12 46 C12 25 30 18 50 28 C70 18 88 25 88 46 C88 70 70 82 50 82 Z" fill="url(#apple-grad)" />
        <path d="M50 28 Q48 12 38 14" stroke="#78350F" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M50 22 Q65 10 60 25 C55 25 50 24 50 22 Z" fill="url(#apple-leaf)" />
        <ellipse cx="32" cy="38" rx="8" ry="12" fill="white" opacity="0.5" transform="rotate(-15 32 38)" />
    </svg>
);

const OrangeSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
            <radialGradient id="orange-grad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFC374" />
                <stop offset="75%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#EA580C" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="38" fill="url(#orange-grad)" />
        <path d="M50 12 Q65 2 60 16 C55 16 50 15 50 12 Z" fill="#22C55E" />
        <path d="M22 40 A20 20 0 0 1 40 22" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
);

const BananaSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
            <linearGradient id="banana-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="60%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
        </defs>
        <path d="M15 70 Q50 85 85 30 C70 50 40 55 15 45 C18 55 15 65 15 70 Z" fill="url(#banana-grad)" />
        <path d="M85 30 Q88 26 89 22 Q84 25 80 28" stroke="#451A03" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M15 70 Q11 72 8 75 Q12 65 15 60" fill="#334155" />
    </svg>
);

const TomatoSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
            <radialGradient id="tomato-grad" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FCA5A5" />
                <stop offset="65%" stopColor="#F87171" />
                <stop offset="100%" stopColor="#EF4444" />
            </radialGradient>
        </defs>
        <ellipse cx="50" cy="53" rx="38" ry="34" fill="url(#tomato-grad)" />
        <ellipse cx="32" cy="38" rx="8" ry="5" fill="white" opacity="0.5" transform="rotate(-10 32 38)" />
        <path d="M50 22 C55 20 65 14 60 17 C56 19 52 21 50 22 Z" fill="#16A34A" />
        <path d="M50 22 C45 20 35 14 40 17 C44 19 48 21 50 22 Z" fill="#16A34A" />
    </svg>
);

const AvocadoSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
            <linearGradient id="avo-shell" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#166534" />
                <stop offset="100%" stopColor="#14532D" />
            </linearGradient>
            <linearGradient id="avo-flesh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E2F0D9" />
                <stop offset="100%" stopColor="#BEF264" />
            </linearGradient>
            <radialGradient id="avo-pit" cx="40%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#78350F" />
            </radialGradient>
        </defs>
        <path d="M50 15 C32 15 26 40 26 62 C26 80 36 88 50 88 C64 88 74 80 74 62 C74 40 68 15 50 15 Z" fill="url(#avo-shell)" />
        <path d="M50 20 C35 20 30 42 30 62 C30 77 38 84 50 84 C62 84 70 77 70 62 C70 42 65 20 50 20 Z" fill="url(#avo-flesh)" />
        <circle cx="50" cy="62" r="16" fill="url(#avo-pit)" />
    </svg>
);

const LeafSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path 
            d="M2 22C2 22 6 18 12 18C18 18 22 22 22 22C22 22 20 14 16 8C12 2 8 2 8 2C8 2 8 6 6 12C4 18 2 22 2 22Z" 
            fill="url(#light-leaf-grad)" 
        />
        <defs>
            <linearGradient id="light-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A3E635" />
                <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
        </defs>
    </svg>
);

const fruitList = [AppleSVG, OrangeSVG, BananaSVG, TomatoSVG, AvocadoSVG, LeafSVG];

const Preloader = ({ onComplete }) => {
    const { lang } = useLanguage();
    const [progress, setProgress] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isCurtainSplitting, setIsCurtainSplitting] = useState(false);
    const [floatingParticles, setFloatingParticles] = useState([]);
    const [pollenParticles, setPollenParticles] = useState([]);
    const videoRef = useRef(null);

    // Initial setup of clean light-mode particles
    useEffect(() => {
        // Spawn 6 subtle floating particles (reduced count to avoid clutter)
        const generatedFruits = Array.from({ length: 6 }).map((_, i) => {
            const RandomFruitComp = fruitList[i % fruitList.length];
            return {
                id: `fruit-${i}`,
                Component: RandomFruitComp,
                x: Math.random() * 80 + 10, 
                y: Math.random() * 70 + 15,
                scale: Math.random() * 0.2 + 0.35, // Smaller sizes
                delay: Math.random() * 1.5,
                duration: 9 + Math.random() * 9, // Slower organic drift
                rotateDirection: Math.random() > 0.5 ? 180 : -180
            };
        });
        setFloatingParticles(generatedFruits);

        // Spawn 14 golden shimmering light dust specks
        const generatedPollen = Array.from({ length: 14 }).map((_, i) => ({
            id: `pollen-${i}`,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: 6 + Math.random() * 6,
            delay: Math.random() * 2
        }));
        setPollenParticles(generatedPollen);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.loop = true;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay recovered seamlessly...", error);
                });
            }
        }
    }, []);

    const loadingMessages = {
        en: [
            "Gathering Farm-Fresh Harvest...",
            "Selecting Premium Grade Produce...",
            "Polishing Crisp Tomatoes & Slices...",
            "Washing Organic Greens...",
            "Ready to Serve Freshness!"
        ],
        kn: [
            "ಹೊಲದ ತಾಜಾ ಬೆಳೆ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತಿದೆ...",
            "ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಉತ್ಪನ್ನಗಳನ್ನು ಆರಿಸಲಾಗುತ್ತಿದೆ...",
            "ತಾಜಾ ಟೊಮೆಟೊಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
            "ಸಾವಯವ ಸೊಪ್ಪನ್ನು ತೊಳೆಯಲಾಗುತ್ತಿದೆ...",
            "ತಾಜಾತನವನ್ನು ಬಡಿಸಲು ಸಿದ್ಧವಾಗಿದೆ!"
        ]
    };

    const messages = loadingMessages[lang] || loadingMessages['en'];

    const getStatusIndex = () => {
        if (progress < 22) return 0;
        if (progress < 48) return 1;
        if (progress < 72) return 2;
        if (progress < 90) return 3;
        return 4;
    };

    useEffect(() => {
        const totalDuration = 4200; 
        const intervalTime = 30; 
        const increment = 100 / (totalDuration / intervalTime);

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    
                    // Phase 5: Split the Curtains open
                    setTimeout(() => {
                        setIsCurtainSplitting(true);
                        
                        // Phase 6: Fade out entire preloader block
                        setTimeout(() => {
                            setIsFadingOut(true);
                            setTimeout(() => {
                                if (onComplete) onComplete();
                            }, 300);
                        }, 1100);
                    }, 400);
                    
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isFadingOut && (
                <motion.div 
                    className="preloader-overlay light-theme"
                    id="preloader-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Radial Soft Sunlight Ray Background Overlay */}
                    <div className="sunlight-glow" />

                    {/* Gold Light Dust Shimmers (Layered on background) */}
                    <div className="pollen-container absolute inset-0 pointer-events-none z-10 overflow-hidden">
                        {pollenParticles.map(p => (
                            <motion.div
                                key={p.id}
                                className="pollen-spec"
                                style={{
                                    left: `${p.x}%`,
                                    top: `${p.y}%`,
                                    width: p.size,
                                    height: p.size,
                                }}
                                animate={{
                                    y: [0, -70, 0],
                                    x: [0, 20, -20, 0],
                                    opacity: [0.15, 0.7, 0.15],
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    delay: p.delay,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>

                    {/* Floating SVG Fruit Watermarks (Layered behind video, very high transparency) */}
                    <div className="fruits-particle-layer absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30">
                        {floatingParticles.map(f => {
                            const Comp = f.Component;
                            return (
                                <motion.div
                                    key={f.id}
                                    className="floating-fruit-item absolute"
                                    style={{
                                        left: `${f.x}%`,
                                        top: `${f.y}%`,
                                        width: `${f.scale * 75}px`,
                                        height: `${f.scale * 75}px`,
                                    }}
                                    animate={{
                                        y: [0, -18, 18, 0],
                                        x: [0, 10, -10, 0],
                                        rotate: [0, f.rotateDirection * 0.4, f.rotateDirection, 0],
                                    }}
                                    transition={{
                                        duration: f.duration,
                                        repeat: Infinity,
                                        delay: f.delay,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <Comp />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Main Cinematic Video & Progress Card (Z-INDEX 30 - ALWAYS OVER THE CURTAINS!) */}
                    <motion.div 
                        className="preloader-content-card z-30"
                        animate={isCurtainSplitting ? { scale: 0.95, opacity: 0, filter: "blur(5px)" } : { scale: 1, opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Premium Soft Rotating Swirl Halo */}
                        <div 
                            className="preloader-swirl-bg" 
                            style={{ backgroundImage: `url(${preloaderBase})` }}
                        />

                        {/* Beautifully Framed Central Animated Logo Video */}
                        <div className="premium-video-wrapper shadow-xl relative">
                            <video 
                                ref={videoRef}
                                src={reloadVideo} 
                                className="w-full h-full object-cover rounded-full"
                                muted 
                                playsInline
                                autoPlay
                            />
                            <div className="video-inner-shimmer" />
                        </div>

                        {/* Premium Text Branding */}
                        <div className="text-center mt-5">
                            <h1 className="brand-text-display font-display text-3xl font-extrabold tracking-wide">
                                Nidhi Fresh Basket
                            </h1>
                            <p className="tagline-text-display text-xs font-bold tracking-widest text-[#15803D]/70 mt-1 uppercase">
                                Come Join Freshness
                            </p>
                        </div>

                        {/* Clean Light-Mode Progress Bar */}
                        <div className="preloader-progress-wrapper mt-7">
                            <div className="preloader-progress-bar">
                                <div 
                                    className="preloader-progress-fill relative" 
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="progress-sparkle-glider" />
                                </div>
                            </div>
                            
                            <div className="preloader-status-container flex flex-col items-center">
                                <div className="preloader-status">
                                    {messages[getStatusIndex()]}
                                </div>
                                <div className="preloader-percentage-counter">
                                    {Math.round(progress)}%
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- PHASE 5: Dual Soft-Cream radial curtains (Z-INDEX 20 - BEHIND THE CONTENT CARD!) --- */}
                    <div className="curtain-container fixed inset-0 pointer-events-none z-20 flex overflow-hidden">
                        {/* Left Light Curtain */}
                        <motion.div
                            className="curtain-panel-left relative flex-1 h-full bg-[#FAF9F6]"
                            initial={{ x: "0%" }}
                            animate={isCurtainSplitting ? { x: "-100%" } : { x: "0%" }}
                            transition={{ type: "spring", stiffness: 45, damping: 15 }}
                        >
                            <div className="curtain-leaf-texture" />
                        </motion.div>

                        {/* Right Light Curtain */}
                        <motion.div
                            className="curtain-panel-right relative flex-1 h-full bg-[#FAF9F6]"
                            initial={{ x: "0%" }}
                            animate={isCurtainSplitting ? { x: "100%" } : { x: "0%" }}
                            transition={{ type: "spring", stiffness: 45, damping: 15 }}
                        >
                            <div className="curtain-leaf-texture img-flipped" />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
