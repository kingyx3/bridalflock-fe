import { categories } from "../../utils/categories";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Services() {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState(null);
  const regularCategories = categories.filter(category => category.popular === false);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 bg-neutral-light dark:bg-neutral-dark">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-neutral-light mb-2">
          Everything for Your Perfect Wedding
        </h2>
        <p className="text-neutral-medium dark:text-neutral-light text-sm md:text-base max-w-2xl">
          Discover all the services you need to make your special day unforgettable
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {regularCategories.map(({ name, logo }) => (
          <button
            key={name}
            className={`relative flex flex-col items-center p-4 rounded-lg border border-neutral-medium/30 dark:border-neutral-medium transition-all duration-200 cursor-pointer bg-neutral-light dark:bg-neutral-dark
              ${hoveredItem === name ? 
                'border-accent dark:border-success shadow-md' : // Using accent for light mode active, success for dark
                'hover:border-accent dark:hover:border-success hover:shadow-sm' // Same for hover
              }`}
            onClick={() => router.push(`/search?category=${encodeURIComponent(name)}`)}
            onMouseEnter={() => setHoveredItem(name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`absolute inset-0 rounded-lg bg-accent/30 dark:bg-success/30 opacity-0 transition-opacity duration-200
              ${hoveredItem === name ? 'opacity-100' : ''}`}
            />
            
            <div className="relative h-12 w-12 md:h-14 md:w-14 mb-3 z-10">
              <Image 
                src={logo} 
                alt={name} 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 48px, 56px"
              />
            </div>
            <span className="text-sm font-medium text-center text-neutral-dark dark:text-neutral-light z-10">
              {name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Services;