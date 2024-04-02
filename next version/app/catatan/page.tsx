import Report from '@/components/Report/Report';
import { User } from '@/type';
import { mainPathRef } from '@/utils/firebase';
import { get } from 'firebase/database';

const Catatan = async () => {
  const dataSnapshot = await get(mainPathRef);
  const snapshotValue = dataSnapshot.val() as User[];

  return (
    <>
      <Report initialData={snapshotValue} />
    </>
  );
};

export default Catatan;
