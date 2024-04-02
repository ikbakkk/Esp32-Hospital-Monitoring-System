import { FC } from 'react';

interface EditFormProps {
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const EditForm: FC<EditFormProps> = ({ handleOnSubmit, setInput }) => {
  return (
    <form
      onSubmit={e => handleOnSubmit(e)}
      className='my-2 flex flex-col items-center'>
      <label>Enter new name: </label>
      <input
        className='rounded-lg bg-title/30 p-2 duration-150 placeholder:text-title hover:bg-title/20 focus:bg-title focus:text-white focus:outline focus:outline-title focus:placeholder:text-white'
        type='text'
        required
        placeholder='Max. 35 Characters'
        name='name'
        maxLength={35}
        onChange={e => setInput(e.target.value)}
      />
      <button
        type='submit'
        className='mt-5 inline-flex justify-center rounded-lg border border-transparent bg-title/70 px-4 py-2 text-sm font-medium text-white duration-150 hover:bg-title active:scale-95 '>
        Submit
      </button>
    </form>
  );
};

export default EditForm;
