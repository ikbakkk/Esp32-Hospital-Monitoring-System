import { get } from 'firebase/database';
import { dynamicPathRef } from '@/utils/firebase';
import { User } from '@/type';
import Details from '@/components/Detail/Details';

type PageProps = {
  params: {
    slug: string;
  };
};

const DetailPage = async ({ params }: PageProps) => {
  const slug = params.slug;
  const dataSnapshot = await get(dynamicPathRef(slug));
  const snapshotValue = dataSnapshot.val() as User;

  return (
    <>
      <Details initialData={snapshotValue} slug={slug} />
    </>
  );
};

export default DetailPage;
