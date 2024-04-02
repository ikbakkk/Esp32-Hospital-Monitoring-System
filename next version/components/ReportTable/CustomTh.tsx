import { FC, ReactNode } from 'react';

interface CustomThProps {
  icon: ReactNode;
}

const CustomTh: FC<CustomThProps> = ({ icon }) => {
  return (
    <th className='flex w-full flex-col items-center justify-center gap-1'>
      {icon}
    </th>
  );
};

export default CustomTh;
