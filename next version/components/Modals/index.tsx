import { CardContext } from '@/utils/CardContext';
import { dynamicPathRef } from '@/utils/firebase';
import { ModalContext } from '@/utils/ModalContext';
import { FC, Fragment, ReactNode, useContext, useState } from 'react';
import { useDatabaseRemoveMutation } from '@react-query-firebase/database';
import { useDatabaseUpdateMutation } from '@react-query-firebase/database';

import EditForm from '../Forms/EditForm';
import DeleteForm from '../Forms/DeleteForm';
import { Dialog, Transition } from '@headlessui/react';

const Backdrop = () => (
  <Transition.Child
    as={Fragment}
    enter='ease-out duration-300'
    enterFrom='opacity-0'
    enterTo='opacity-100'
    leave='ease-in duration-200'
    leaveFrom='opacity-100'
    leaveTo='opacity-0'>
    <div className='fixed inset-0 bg-black bg-opacity-25' />
  </Transition.Child>
);

const ModalContent = ({ children }: { children: ReactNode }) => (
  <Transition.Child
    as={Fragment}
    enter='ease-out duration-300'
    enterFrom='opacity-0 scale-95'
    enterTo='opacity-100 scale-100'
    leave='ease-in duration-200'
    leaveFrom='opacity-100 scale-100'
    leaveTo='opacity-0 scale-95'>
    {children}
  </Transition.Child>
);

interface ModalProps {}

const Modal: FC<ModalProps> = () => {
  const { isOpen, setIsOpen } = useContext(ModalContext);
  const { dialogTitle, type, setType, roomNumber } = useContext(CardContext);
  const [input, setInput] = useState('');
  const path = dynamicPathRef(roomNumber - 1);
  const deleteMutation = useDatabaseRemoveMutation(path);
  const editMutation = useDatabaseUpdateMutation(path);

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsOpen(false);
    deleteMutation.mutate();
  };

  const handleCancelDelete = () => {
    setIsOpen(false);
  };

  const handleOnSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editMutation.mutate({ nama: input });
    setIsOpen(false);
    setInput('');
  };

  const shownModalType =
    type === 'edit' ? (
      <EditForm setInput={setInput} handleOnSubmit={handleOnSubmitForm} />
    ) : type === 'delete' ? (
      <DeleteForm
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        roomNumber={roomNumber}
      />
    ) : null;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleOnClose}>
        <Backdrop />
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <ModalContent>
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl outline outline-title transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-center text-lg font-medium leading-6 text-title'>
                  {dialogTitle}
                </Dialog.Title>
                {shownModalType}
              </Dialog.Panel>
            </ModalContent>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
