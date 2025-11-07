import React, { useState } from "react";
import Image from "next/image";

function AvatarImage({
    src,
    email = "",
    size = 96,
    editable = false,
    onFileChange = () => { },
    className = "",
    priority = false,
}) {
    const [hasError, setHasError] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const isBlobURL = typeof src === "string" && src.startsWith("blob:");
    const shouldOptimize = src && !isBlobURL;

    const fallbackInitial = (
        <div
            className={`bg-primary flex items-center justify-center rounded-full ${className}`}
            style={{ width: size, height: size }}
        >
            <span
                className="text-primary-darker dark:text-neutral-light font-semibold"
                style={{ fontSize: size / 2.2 }}
            >
                {email[0]?.toUpperCase() || "U"}
            </span>
        </div>
    );

    return (
        <div
            className={`relative rounded-full overflow-hidden group transition-all ${className}`}
            style={{ width: size, height: size }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {!hasError && src ? (
                <Image
                    src={src}
                    alt="Avatar"
                    width={size}
                    height={size}
                    className="object-cover rounded-full"
                    onError={() => setHasError(true)}
                    unoptimized={!shouldOptimize}
                    priority={priority}
                />
            ) : (
                fallbackInitial
            )}

            {editable && (
                <div
                    className={`absolute inset-0 bg-neutral-dark bg-opacity-50 flex flex-col items-center justify-center transition-opacity ${isHovering ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-neutral-light mb-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-neutral-light text-sm font-medium">Change Photo</span>
                    <input
                        type="file"
                        onChange={onFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        name="avatar"
                    />
                </div>
            )}
        </div>
    );
}

export default React.memo(AvatarImage);
