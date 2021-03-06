/* eslint-disable import/prefer-default-export */
export const boardItems = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'ht_10113',
      duration: 3,
      completedTime: new Date(),
      dueDate: new Date(),
      material: 'LaserForm Ti Gr23 (A)',
      tags: ['Medical', 'Rush'],
    },
    'task-2': {
      id: 'task-2',
      title: 'HT_01221',
      duration: 4,
      completedTime: new Date(),
      dueDate: new Date(),
      material: 'LaserForm Ti Gr23 (A)',
      tags: ['Medical'],
    },
    'task-3': {
      id: 'task-3',
      title: 'HT_01221',
      duration: 2,
      completedTime: new Date(),
      dueDate: new Date(),
      material: 'LaserForm Ti Gr23 (A)',
      tags: ['Medical', 'Rush'],
    },
    'task-4': {
      id: 'task-4',
      title: 'HT_01221',
      duration: 2,
      completedTime: new Date(),
      dueDate: new Date(),
      material: 'LaserForm Ti Gr23 (A)',
      tags: ['Medical'],
    },
    'task-5': {
      id: 'task-5',
      title: 'HT_10101',
      duration: 2,
      completedTime: new Date(),
      dueDate: new Date(),
      material: 'LaserForm Ti Gr23 (A)',
      tags: ['Medical', 'Rush'],
    },
    'task-6': {
      id: 'task-6',
      title: 'HT_10104',
      duration: 2,
      completedTime: new Date(),
      dueDate: new Date(),
      material: 'LaserForm Ti Gr23 (A)',
      tags: ['Medical'],
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'PENDING',
      type: 'status',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'STATION A',
      type: 'asset',
      taskIds: ['task-5', 'task-6'],
    },
    'column-3': {
      id: 'column-3',
      title: 'STATION B',
      type: 'asset',
      taskIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'DONE',
      type: 'status',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};
