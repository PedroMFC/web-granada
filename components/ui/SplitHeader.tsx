'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SplitHeader({ src, children }: { src: string; children?: React.ReactNode }) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const swipeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const imageContRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        // Create ScrollSmoother
        const smoother = ScrollSmoother.create({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            smooth: 2,
            speed: 3,
            effects: true
        });

        // Apply random speed effects to each column
        imageContRefs.current.forEach((cont) => {
            smoother.effects(cont, {
                speed: gsap.utils.random(0.55, 0.85, 0.05)
            });
        });

        // Initial swipe animation
        gsap.to(swipeRefs.current, {
            yPercent: 100,
            delay: 0.2,
            duration: 1,
            stagger: {
                from: 'random',
                each: 0.1
            },
            ease: 'sine.out',
            // onComplete: () => {
            //     imageRefs.current.forEach(img => {
            //         if (img) {
            //             img.style.filter = 'grayscale(0%) contrast(1)';
            //         }
            //     });
            // }
        });

        // Parallax animation and color transition
        gsap.to(imageRefs.current, {
            scale: 1.5,
            xPercent: 20,
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: '+=1500px',
                scrub: true,
                onUpdate: (self) => {
                    // Smooth transition to color as we scroll
                    const progress = gsap.utils.mapRange(0, 0.2, 0, 100, self.progress);
                    imageRefs.current.forEach(img => {
                        if (img) {
                            const grayscale = 100 - (progress * 100);
                            img.style.filter = `grayscale(${grayscale}%)`;
                        }
                    });
                }
            }
        });

    }, []);
    return (
        <div ref={wrapperRef} id="wrapper" className="bg-[#111111]">
            <div ref={contentRef} id="content">
                <section>
                    <div ref={heroRef} className="h-screen flex gap-2">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                ref={(el) => { imageContRefs.current[index] = el }}
                                className="image-cont flex-1 overflow-hidden relative"
                            >
                                <div className="imagen-div h-full w-[700%] absolute" style={{ transform: `translateX(-${index * (100 / 7)}%)` }}>
                                    <Image
                                        fill
                                        ref={(el) => {
                                            imageRefs.current[index] = el;
                                            if (el) {
                                                // Initial black and white state
                                                gsap.set(el, {
                                                    filter: 'grayscale(100%) contrast(1.2)'
                                                });
                                            }
                                        }}
                                        src={src}
                                        alt="Split header"
                                        className="img object-cover transition-filter duration-1000"
                                        style={{ willChange: 'filter' }}
                                    />
                                    <div
                                        ref={(el) => { swipeRefs.current[index] = el }}
                                        className="anim-swipe h-full w-full bg-[#111111] absolute"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {children}
            </div>

            <img
                src="https://img.icons8.com/glyph-neue/128/ffffff/circled-down-2.png"
                alt="scroll down"
                className="fixed bottom-4 left-1/2 -translate-x-1/2 z-999 w-12 h-12"
            />
        </div>
    );
}