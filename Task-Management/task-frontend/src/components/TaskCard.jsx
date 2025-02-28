import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ task, onDelete }) => {
  const getBgColor = (status) => {
    if (status === 'completed') return 'bg-lime-200';
    if (status === 'in progress') return 'bg-blue-200';
    if (status === 'pending') return 'bg-yellow-200';
    return 'bg-white';
  };

  const getTextColor = (status) => {
    if (status === 'completed') return 'text-lime-700';
    if (status === 'in progress') return 'text-blue-700';
    if (status === 'pending') return 'text-yellow-700';
    return 'text-black';
  };

  const getBorderColor = (status) => {
    if (status === 'completed') return 'border-b-lime-500';
    if (status === 'in progress') return 'border-b-blue-500';
    if (status === 'pending') return 'border-b-yellow-500';
    return '';
  };

  return (
    <div className={`${getBgColor(task.status)} shadow-md rounded p-4 border-b-4 ${getBorderColor(task.status)}`}>
      <h3 className="text-xl font-semibold mb-2">{task.name}</h3>
      <p className="text-gray-700 mb-2">{task.description}</p>
      <p className={`${getTextColor(task.status)} text-sm font-medium mb-2`}>Status: {task.status}</p>
      <div className="flex justify-end space-x-4">
        <Link to={`/tasks/edit/${task.id}`} className="text-blue-500 hover:underline" title="Edit Task">
          <FaEdit size={18} />
        </Link>
        <button onClick={() => onDelete(task.id)} className="text-red-500 hover:underline" title="Delete Task">
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
