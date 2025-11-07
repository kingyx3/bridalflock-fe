import React from "react";

// The `className` prop will be used to pass Tailwind text color classes (e.g., "text-accent dark:text-primary")
function BridalFlockLogo({ className = "text-accent" }) {
  return (
    <svg
      width="240"
      height="60"
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className} // Apply passed Tailwind classes here
    >
      {/* Flock icon - uses currentColor from the className prop */}
      <path
        d="M30 40C30 25 50 20 60 30C70 40 65 55 50 60C35 65 30 55 30 40Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path d="M45 35L50 30L55 35" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M65 45L70 40L75 45" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M50 55L55 50L60 55" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Text - uses currentColor from the className prop */}
      <text
        x="120"
        y="40"
        fontFamily="'Playfair Display', serif"
        fontSize="24"
        fontWeight="700"
        fill="currentColor"
        textAnchor="middle"
      >
        Bridal
      </text>
      <text
        x="120"
        y="60"
        fontFamily="'Montserrat', sans-serif"
        fontSize="24"
        fontWeight="600"
        fill="currentColor"
        textAnchor="middle"
      >
        Flock
      </text>

      {/* Tagline - uses its own Tailwind class for color, but still inherits currentColor logic */}
      <g className="text-neutral-medium dark:text-neutral-light"> {/* Apply tagline color here */}
        <text
          x="120"
          y="75"
          fontFamily="'Montserrat', sans-serif"
          fontSize="10"
          fill="currentColor" // Inherits from the <g> tag's text-neutral-medium
          letterSpacing="1"
          textAnchor="middle"
        >
          Where wedding pros take flight
        </text>
      </g>
    </svg>
  );
}

export default React.memo(BridalFlockLogo);