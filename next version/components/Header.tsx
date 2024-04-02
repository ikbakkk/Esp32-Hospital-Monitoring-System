'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TbHeartRateMonitor } from 'react-icons/tb';

const nav = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Grafik',
    link: '/grafik'
  },
  {
    title: 'Catatan',
    link: '/catatan'
  }
];

const Header = () => {
  const path = usePathname();

  return (
    <header className='fixed z-40 w-full bg-title px-3 py-2 text-white'>
      <section className='flex items-center gap-10'>
        <TbHeartRateMonitor size={32} />
        <nav>
          <ul className='flex items-center'>
            {nav.map(n => (
              <Link
                href={n.link}
                className={`${
                  n.link === path
                    ? 'font-bold tracking-wide text-white'
                    : 'text-white/80'
                } rounded-md px-3 py-1 duration-150 hover:cursor-pointer hover:bg-white/20`}
                key={n.title}>
                {n.title}
              </Link>
            ))}
          </ul>
        </nav>
      </section>
      <section></section>
    </header>
  );
};

export default Header;
