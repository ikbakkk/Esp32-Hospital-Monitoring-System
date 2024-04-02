import RoomCards from '@/components/Home/RoomCards';
import { User } from '@/type';
import { mainPathRef, db } from '@/utils/firebase';

import { get } from 'firebase/database';

export default async function Home() {
  const dataSnapshot = await get(mainPathRef);
  const snapshotValue = dataSnapshot.val() as User[];

  return <RoomCards initialData={snapshotValue} />;
}
