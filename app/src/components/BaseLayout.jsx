import React from "react";

function BaseLayout({ children, className = "", containerClass = "" }) {
  return (
    <div className={`min-h-screen bg-neutral-light dark:bg-neutral-dark pt-[80px] ${className}`}>
      <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClass}`}>
        {children}
      </div>
    </div>
  );
}

export default React.memo(BaseLayout);
