"use client";

import Image, { StaticImageData } from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface GalleryCardProps {
  imageSrc: StaticImageData | string;
  name: string;
  description: string;
  totalItems: number;
}

// https://lightswind.com/components/card?component=seasonal-hover-cards
// https://lightswind.com/components/progress?component=3d-hover-gallery
const GalleryHoverCard = ({ imageSrc, name, description, totalItems }: GalleryCardProps) => {
  const cardRef = useRef<HTMLLIElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Calculate initial and expanded widths based on viewport
  const initialWidth = 80 / totalItems; // or calculate based on viewport

  useGSAP(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;

    if (!card || !image || !overlay) return;

    // Initial state
    gsap.set(card, { width: `${initialWidth}%` });
    gsap.set(overlay, { opacity: 0 });
    gsap.set(image, { filter: 'grayscale(100%)' });


    // Hover animation
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        width: "80%",
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
        zIndex: 20,
        onStart: () => {
          gsap.to(image, { filter: 'grayscale(0%)', duration: 0.3 });
        }
      });
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.2,
        delay: 0.1,
        ease: "power2.out"
      });
    });

    // Mouse leave animation
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        width: `${initialWidth}%`,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        zIndex: 0,
        onComplete: () => {
          gsap.set(card, { clearProps: 'zIndex' });
        }
      });
      gsap.to(image, { filter: 'grayscale(100%)', duration: 0.3 });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out"
      });
    });

    // Cleanup
    return () => {
      card.removeEventListener('mouseenter', () => { });
      card.removeEventListener('mouseleave', () => { });
    };
  }, [initialWidth]);

  return (
    <li
      ref={cardRef}
      tabIndex={0}
      className="group relative h-[500px] shadow-md overflow-hidden rounded-lg will-change-transform"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={imageSrc}
          quality={100}
          alt={`${name} view`}
          fill
          className="object-cover filter transition-all duration-300 ease-out"
        />
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 flex items-end justify-center pb-5 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
      >
        <div className="text-center text-white p-6 rounded-lg max-w-md">
          <h2 className="text-3xl font-bold mb-2">{name}</h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </li>
  );
};


export type CardProps = {
  id: number;
  imageSrc: StaticImageData | string;
  name: string;
  description: string;
};

export default function GalleryHover({ images }: { images: CardProps[] }) {
  return (
    <div className="flex justify-center py-6">
      <ul className="flex justify-center items-center gap-4 px-4 w-[80vw] h-full">
        {images.map((image) => (
          <GalleryHoverCard
            key={image.id}
            imageSrc={image.imageSrc}
            name={image.name}
            description={image.description}
            totalItems={images.length}
          />
        ))}
      </ul>
    </div>
  );
}
