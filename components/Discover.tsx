'use client';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GalleryHover from './ui/GalleryHover';
import { galleryCards } from '@/contants';

gsap.registerPlugin(ScrollTrigger);

export default function Discover() {
    useGSAP(() => {
        gsap.set(['#discover-title', '#discover-text', '#discover-gallery'], {
            opacity: 0,
            y: 100,
        });

        const tl = gsap.timeline().to("#discover-title", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "linear",
        }).to("#discover-text", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "linear",
        }, "-=1")
            .to("#discover-gallery", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "linear",
            }, "-=1");

        ScrollTrigger.create({
            trigger: "#discover-section",
            animation: tl,
            toggleActions: "restart none reverse none",
            markers: true,
        });

    }, []);

    return (
        <section id="discover-section">
            <div className="container mx-auto px-8">
                <h1 id="discover-title" className="text-8xl md:text-9xl font-bold tracking-tight mb-6">DISCOVER GRANADA</h1>
                <p id="discover-text" className="text-2xl md:text-3xl font-bold tracking-tight mb-6">A city where history whispers through ancient streets, where tapas flow freely, and the Alhambra crowns it all. Your Andalusian adventure starts here.</p>
            </div>
            <div id="discover-gallery" className="container mx-auto pt-0">
                <GalleryHover images={galleryCards} />
            </div>
        </section>
    );
}
