import GrafikPage from '@/components/Graph';
import { User } from '@/type';
import { mainPathRef } from '@/utils/firebase';
import { get } from 'firebase/database';

const Grafik = async () => {
  const dataSnapshot = await get(mainPathRef);
  const snapshotValue = dataSnapshot.val() as User[];

  return (
    <>
      <GrafikPage initialData={snapshotValue} />
    </>
  );
};

export default Grafik;
