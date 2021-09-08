const initialData = {
    requiredItem: 0,
    tasks: [
        {id: '1', title: 'Create List View', status: 'todo', type: 'bug'},
        {id: '2', title: 'Create Add Form', status: 'todo', type: 'bug'},
        {id: '3', title: 'Install Dependencies', status: 'todo', type: 'feature'},
        {id: '4', title: 'Create Grid View', status: 'todo', type: 'feature'},
        {id: '5', title: 'Set Up Github', status: 'doing', type: 'bug'},
        {id: '6', title: 'Create App Component', status: 'doing', type: 'task'},
        {id: '7', title: 'Plain Component Diagram', status: 'doing', type: 'bug'},
        {id: '8', title: 'Install React', status: 'review', type: 'task'},
        {id: '9', title: 'Invite Collaborators', status: 'done', type: 'feature'},
        {id: '10', title: 'App Crashes', status: 'done', type: 'task'},
    ],
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'to-do',
            taskIds: ['1', '2', '3', '4']
        },
        'column-2': {
            id: 'column-2',
            title: 'doing',
            taskIds: ['5','6', '7']
        },
        'column-3': {
            id: 'column-3',
            title: 'in review',
            taskIds: ['8']
        },
        'column-4': {
            id: 'column-4',
            title: 'done',
            taskIds: ['9', '10']
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
};

export default initialData;