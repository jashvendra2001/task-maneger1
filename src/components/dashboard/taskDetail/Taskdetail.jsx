import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TaskDetail = () => {
  const { id } = useParams();
  const task = useSelector(state => state.counter.tasks.find(task => task.id === parseInt(id)));

  if (!task) {
    return <div className="text-center mt-5">Task not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">{task.title}</h4>
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Description:</strong> {task.description}
          </p>
          <p className="card-text">
            <strong>Due Date:</strong> {task.dueDate}
          </p>
          <p className="card-text">
            <strong>Priority:</strong> 
            <span className={`badge ${
              task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-warning' : 'bg-success'
            } ms-2`}>
              {task.priority}
            </span>
          </p>
          <p className="card-text">
            <strong>Status:</strong> 
            <span className={`badge ${
              task.status === 'Completed' ? 'bg-success' : task.status === 'In Progress' ? 'bg-info' : 'bg-secondary'
            } ms-2`}>
              {task.status}
            </span>
          </p>
        </div>
        <div className="card-footer text-muted text-end">
          Task ID: {task.id}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
