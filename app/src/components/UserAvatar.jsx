import React from 'react';
import Image from 'next/image';

const UserAvatar = ({ user, size = 30 }) => {
  if (!user) return null;

  const { avatar, email, fullName } = user;
  const initial = email ? email[0].toUpperCase() : (fullName ? fullName[0].toUpperCase() : '?');

  return (
    <div>
      {avatar ? (
        <Image
          src={avatar}
          alt={fullName || email || "User avatar"}
          height={size}
          width={size}
          className="rounded-full"
        />
      ) : (
        <div
          className="bg-primary flex items-center justify-center rounded-full"
          style={{ height: size, width: size }}
        >
          <span className="text-primary-darker dark:text-neutral-light" style={{ fontSize: size / 2 }}>
            {initial}
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(UserAvatar);
