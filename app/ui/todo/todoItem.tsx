'use client';

export type TodoItem = {
    todoId: string;
    title: string;
    description: string;
    columnId: string;
};

export type ColumnType = {
    title: string;
    columnId: string;
    items: TodoItem[];
};
export type ColumnMap = { [columnId: string]: ColumnType };

export function getBasicData(initialData: TodoItem[]) {
    const columnsData = initialData.reduce((accum, val) => {
        console.log(val)
        accum[val.columnId].push(val);
        return accum;
    }, 
    {
        todo: [],
        inProgress: [],
        completed: []
    });

    const columnMap: ColumnMap = {
        todo: {
            title: 'Todo',
            columnId: 'todo',
            items: columnsData.todo,
        },
        inProgress: {
            title: 'In Progress',
            columnId: 'inProgress',
            items: columnsData.inProgress,
        },
        completed: {
            title: 'Completed',
            columnId: 'completed',
            items: columnsData.completed,
        },
    };

    const orderedColumnIds = ['todo', 'inProgress', 'completed'];

    return {
        columnMap,
        orderedColumnIds,
    };
}
