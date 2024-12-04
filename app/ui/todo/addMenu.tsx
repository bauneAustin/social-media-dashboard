'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import Modal from '../modal/modal';
import AddTodo from '../forms/addTodo';
import { useState } from 'react';

export default function AddMenu(props: {callback: () => any}) {
    const [showModal, setShowModal] = useState(false);

    const onButtonClick = () => {
        setShowModal(prev => !prev);
    };

    return (
        <>
            {showModal ? <Modal closeModalCallback={onButtonClick}>
                <div className='bg-valentino-950 pt-6 pb-6 pl-10 pr-10 rounded'>
                    <AddTodo />
                </div>
            </Modal> : null}
            <div onClick={onButtonClick} className='bg-valentino-500 p-4 rounded cursor-pointer hover:bg-valentino-300'>
                <PlusIcon className='h-8 w-8 text-valentino-100'/>
            </div>
        </>
    )
};
