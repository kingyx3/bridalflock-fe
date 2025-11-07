import { categories } from "../../utils/categories";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect, useCallback } from "react";

function PopularServices() {
  const router = useRouter();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationId = useRef(null);
  const scrollSpeed = useRef(0.8);
  const isFirstScroll = useRef(true);

  const popularCategories = categories.filter(category => category.popular === true);
  const loopedCategories = [...popularCategories, ...popularCategories];

  // Infinite scroll logic
  const checkScrollPosition = () => {
    if (!containerRef.current || !contentRef.current) return;
    
    const { scrollLeft } = containerRef.current;
    const contentWidth = contentRef.current.scrollWidth / 2;
    
    if (scrollLeft >= contentWidth) {
      containerRef.current.scrollLeft = scrollLeft - contentWidth;
    } else if (scrollLeft <= 0) {
      containerRef.current.scrollLeft = scrollLeft + contentWidth;
    }
  };

  // Auto-scroll animation
  const autoScroll = useCallback(() => {
    if (!isPaused && containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollSpeed.current,
        behavior: 'auto'
      });
      animationId.current = requestAnimationFrame(autoScroll);
    }
  }, [isPaused]);

  // Handle hover/touch events
  const handleMouseEnter = () => {
    setIsPaused(true);
    cancelAnimationFrame(animationId.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (!animationId.current) {
      animationId.current = requestAnimationFrame(autoScroll);
    }
  };

  // Animation lifecycle
  useEffect(() => {
    if (!isPaused) {
      animationId.current = requestAnimationFrame(autoScroll);
    }
    return () => cancelAnimationFrame(animationId.current);
  }, [isPaused, autoScroll]);

  // Initialize scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !contentRef.current) return;

    container.scrollLeft = contentRef.current.scrollWidth / 4;
    if (isFirstScroll.current) {
      animationId.current = requestAnimationFrame(autoScroll);
      isFirstScroll.current = false;
    }

    container.addEventListener('scroll', checkScrollPosition);
    return () => {
      cancelAnimationFrame(animationId.current);
      container.removeEventListener('scroll', checkScrollPosition);
    };
  }, [autoScroll]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-8 bg-neutral-light dark:bg-neutral-dark">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-neutral-light mb-2">
          Popular Wedding Services
        </h2>
        <p className="text-neutral-medium dark:text-neutral-light text-sm md:text-base">
          Most sought-after services for your special day
        </p>
      </div>

      <div className="relative">
        {/* Edge fade effects */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-neutral-light dark:from-neutral-dark to-transparent" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-neutral-light dark:from-neutral-dark to-transparent" />

        {/* Scrollable container */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto pb-6 hide-scrollbar"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
          <div 
            ref={contentRef}
            className="flex gap-5 px-1"
          >
            {loopedCategories.map(({ name, label, image }, index) => (
              <div
                key={`${name}-${index}`}
                className="flex-shrink-0 relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                style={{ 
                  width: '260px',
                  height: '300px',
                  minWidth: '260px'
                }}
                onClick={() => router.push(`/search?category=${encodeURIComponent(name)}`)}
                aria-label={`Browse ${name} services`}
              >
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/70 via-neutral-dark/30 to-transparent z-10 group-hover:from-neutral-dark/80 transition-all duration-300" />
                
                {/* Content */}
                <div className="absolute z-20 text-white left-5 bottom-5">
                  <span className="text-sm font-medium opacity-90">{label}</span>
                  <h3 className="font-bold text-xl md:text-2xl group-hover:text-white/90 transition-colors duration-300">
                    {name}
                  </h3>
                </div>
                
                {/* Optimized image */}
                <Image 
                  src={image} 
                  alt={`${name} wedding service`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 260px, (max-width: 1200px) 33vw"
                  priority={index < 3} // Only preload first 3 images
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default React.memo(PopularServices);