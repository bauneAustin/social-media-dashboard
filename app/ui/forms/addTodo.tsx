'use client';
import { useState } from "react";
import Form from 'next/form';
import { v4 } from "uuid";
import { addTodo } from "@/app/lib/actions";

export default function AddTodo() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        column: 'todo'
    });
    const handleChange = (evt) => {
        console.log(evt.target);
        setFormData(prevData => ({
            ...prevData,
            [evt.target.name]: evt.target.value,
        }));
    };

    const handleSubmit = async (formData: FormData) => {
        const todos = window.localStorage.getItem('todos');
        if(todos) {
            const todosList = JSON.parse(todos);
            todosList.push(
                {
                    todoId: `id:${v4()}`,
                    title: formData.get('title'),
                    description: formData.get('description'),
                    column: formData.get('column')
                }
            );
            window.localStorage.setItem('todos', JSON.stringify(todosList));
        }
        await addTodo();
    };

    return (
        <div>
            <h2 className="flex w-full mb-6 text-2xl align-middle justify-center font-semibold">
                Add Todo Item
            </h2>
            <Form action={handleSubmit} className="p-4 bg-valentino-800 rounded">
                {/* Text Input */}
                <label className="text-lg mr-2 font-semibold" htmlFor="name">Title: </label>
                <input
                    className="text-valentino-950 rounded border-none p-1"
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                /><br /><br />

                {/* Text Area */}
                <label className="text-lg mb-2 font-semibold" htmlFor="message">Description: </label>
                <br />
                <textarea
                    className="text-valentino-950 rounded border-none p-1"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    cols={50}>
                </textarea>
                <br />
                <br />

                {/* Radio Buttons */}
                <label className="text-lg font-semibold">Choose an Status: </label><br />
                <div className='flex'>
                    <input
                        className="mr-2 cursor-pointer"
                        type="radio"
                        id="todo"
                        name="column"
                        value="todo"
                        checked={formData.column === 'todo'}
                        onChange={handleChange}
                    />
                    <label className="mr-4" htmlFor="option1">Todo</label><br />

                    <input
                        className="mr-2 cursor-pointer"
                        type="radio"
                        id="inProgress"
                        name="column"
                        value="inProgress"
                        checked={formData.column === 'inProgress'}
                        onChange={handleChange}
                    />
                    <label className="mr-4" htmlFor="option2">In Progress</label><br />

                    <input
                        className="mr-2 cursor-pointer"
                        type="radio"
                        id="done"
                        name="column"
                        value="done"
                        checked={formData.column === 'done'}
                        onChange={handleChange}
                    />
                    <label className="mr-4" htmlFor="option3">Done</label>
                </div>
                <div className='flex w-full flex-row-reverse mt-3'>
                    <button className="pt-3 pb-3 pl-6 pr-6 bg-valentino-400 rounded hover:bg-valentino-100 hover:text-valentino-950" type="submit" value="Submit">Add</button>
                </div>
            </Form>
        </div>
    );
};
