import { PlusIcon } from '@heroicons/react/24/outline';
import Modal from '../modal/modal';
import AddTodo from '../forms/addTodo';
export default function AddMenu(props: {callback: () => any}) {
    return (
        <>
            <Modal>
                <div className='bg-valentino-950 p-20 rounded'>
                    <AddTodo />
                </div>
            </Modal>
            <div className='bg-valentino-500 p-4 rounded cursor-pointer hover:bg-valentino-300'>
                <PlusIcon className='h-8 w-8 text-valentino-100'/>
            </div>
        </>
    )
};
