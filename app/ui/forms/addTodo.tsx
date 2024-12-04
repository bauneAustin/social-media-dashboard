import { useState } from "react";
export default function AddTodo() {
    const handleChange = () => {};
    const handleSubmit = () => {};
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        column: 'Todo'
    })
    return (
        <div>
            <h2>Add Todo Item</h2>
            <form onSubmit={handleSubmit}>
                {/* Text Input */}
                <label htmlFor="name">Title: </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                /><br /><br />

                {/* Text Area */}
                <label htmlFor="message">Description: </label>
                <br />
                <textarea
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
                <label>Choose an Status: </label><br />
                <input
                    type="radio"
                    id="todo"
                    name="todo"
                    value="Todo"
                    checked={formData.column === 'Todo'}
                    onChange={handleChange}
                />
                <label htmlFor="option1">Todo</label><br />

                <input
                    type="radio"
                    id="inProgress"
                    name="inProgress"
                    value="In Progress"
                    checked={formData.column === 'In Progress'}
                    onChange={handleChange}
                />
                <label htmlFor="option2">In Progress</label><br />

                <input
                    type="radio"
                    id="done"
                    name="done"
                    value="Done"
                    checked={formData.column === 'Done'}
                    onChange={handleChange}
                />
                <label htmlFor="option3">Done</label>
                <br />
                <br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};
