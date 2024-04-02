import { FC } from 'react';
import TimeIntervalLabel from '../TimeIntervalLabel';
import { MdOutlineKeyboardReturn } from 'react-icons/md';

interface FooterProps {
  handleCardFlip: (e: React.MouseEvent<SVGElement>) => void;
  firstTimestamp: number;
  latestTimestamp: number;
}

const Footer: FC<FooterProps> = ({
  handleCardFlip,
  firstTimestamp,
  latestTimestamp
}) => {
  return (
    <footer id='card-footer'>
      <TimeIntervalLabel start={firstTimestamp} end={latestTimestamp} />
      <MdOutlineKeyboardReturn
        onClick={handleCardFlip}
        className='card-button'
        size={20}
      />
    </footer>
  );
};

export default Footer;
