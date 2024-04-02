import Loading from '@/components/Loading';

type LoadingPageProps = {};

const LoadingPage = ({}: LoadingPageProps) => {
  return (
    <div className='flex h-full items-center justify-center'>
      <Loading />
    </div>
  );
};

export default LoadingPage;
