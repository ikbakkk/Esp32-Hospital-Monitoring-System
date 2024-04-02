import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex h-[80vh] items-center justify-center'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-6xl'>404</h1>
        <p>Page Not Found</p>
        <Link href='/'>
          <button>Go Back!</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
