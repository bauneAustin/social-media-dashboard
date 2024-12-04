'use client';

// Delete after verifies this works

export type TodoItem = {
    todoId: string;
    title: string;
    description: string;
    column: string;
};

const titles: string[] = [

];

// TODO: rename as description
const descriptions: string[] = [
];

let sharedLookupIndex: number = 0;

/**
 * Note: this does not use randomness so that it is stable for VR tests
 */
export function getPerson(): TodoItem {
    sharedLookupIndex++;
    return getPersonFromPosition({ position: sharedLookupIndex });
}

export function getPersonFromPosition({ position }: { position: number }): TodoItem {
    // use the next name
    // const name = names[position % names.length];
    // use the next role
    const description = descriptions[position % descriptions.length];
    return {
        todoId: `id:${position}`,
        title: "test",
        description,
        column: "todo"
    };
}

export function getPeopleFromPosition({
    amount,
    startIndex,
}: {
    amount: number;
    startIndex: number;
}): TodoItem[] {
    return Array.from({ length: amount }, () => getPersonFromPosition({ position: startIndex++ }));
}

export function getPeople({ amount }: { amount: number }): TodoItem[] {
    return Array.from({ length: amount }, () => getPerson());
}

export type ColumnType = {
    title: string;
    columnId: string;
    items: TodoItem[];
};
export type ColumnMap = { [columnId: string]: ColumnType };

export function getData({
    columnCount,
    itemsPerColumn,
}: {
    columnCount: number;
    itemsPerColumn: number;
}) {
    const columnMap: ColumnMap = {};

    for (let i = 0; i < columnCount; i++) {
        const column: ColumnType = {
            title: `Column ${i}`,
            columnId: `column-${i}`,
            items: getPeople({ amount: itemsPerColumn }),
        };
        columnMap[column.columnId] = column;
    }
    const orderedColumnIds = Object.keys(columnMap);

    return {
        columnMap,
        orderedColumnIds,
        lastOperation: null,
    };
}

export function getBasicData(initialData: TodoItem[]) {
    // separate initialData into its columns

    const columnsData = initialData.reduce((accum, val) => {
        accum[val.column].push(val);
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
