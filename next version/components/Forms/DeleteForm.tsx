import { FC } from 'react';

interface DeleteFormProps {
  roomNumber: number;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
}

const DeleteForm: FC<DeleteFormProps> = ({
  roomNumber,
  handleCancelDelete,
  handleConfirmDelete
}) => {
  return (
    <div className='mt-5 flex flex-col items-center'>
      <p className='my-2 text-justify'>
        Deleting this room card will permanently delete all of Room {roomNumber}{' '}
        data. This action cannot be undone.
      </p>
      <div className='flex w-full justify-around py-3'>
        <button
          onClick={handleConfirmDelete}
          className='inline-flex items-center justify-center rounded-lg bg-hijauTerang px-4 py-2 text-sm font-medium text-white outline outline-1 outline-title duration-150 hover:bg-hijauTerang/70 active:scale-95 '>
          Confirm
        </button>
        <button
          onClick={handleCancelDelete}
          className='inline-flex items-center justify-center rounded-lg bg-merah px-4 py-2 text-sm font-medium text-white outline outline-1 outline-title duration-150 hover:bg-merah/70 active:scale-95 '>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteForm;
