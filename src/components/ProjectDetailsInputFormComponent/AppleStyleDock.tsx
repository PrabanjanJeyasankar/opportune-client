import React from 'react';
import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  SunMoon,
} from 'lucide-react';

const data = [
  {
    title: 'Home',
    icon: <HomeIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
  },
  {
    title: 'Products',
    icon: <Package className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
  },
  {
    title: 'Components',
    icon: <Component className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
  },
  {
    title: 'Activity',
    icon: <Activity className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
  },
  {
    title: 'Change Log',
    icon: <ScrollText className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
  },
  {
    title: 'Email',
    icon: <Mail className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
  },
  {
    title: 'Theme',
    icon: <SunMoon className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
    href: '#',
  },
];

export function AppleStyleDock() {
  return (
    <div className="absolute bottom-2 left-1/2 max-w-full -translate-x-1/2">
      <div className="flex items-end pb-3">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 p-2"
          >
            <span className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
              {item.title}
            </span>
            <div className="h-6 w-6">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
