import React, { useState } from 'react';
import "./right.css";
import Navbar from './Navbar';
import TaskForm from './popup/TaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { HiPencil } from "react-icons/hi2";
import { AiFillDelete } from "react-icons/ai";
import { updateTask, deleteTask, addTask } from '../../utility/searchSlice';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Rightmenu = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [sortByPriority, setSortByPriority] = useState(false);
  const tasks = useSelector(state => state.counter.tasks);
  const dispatch = useDispatch();

  const handleSave = (data) => {
    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, updatedTask: { ...editingTask, ...data } }));
      setEditingTask(null);
    } else {
      const newTask = { ...data, id: new Date().getTime() };
      dispatch(addTask(newTask));
    }
    setPopupVisible(false);
  };

  const handleCancel = () => {
    setPopupVisible(false);
    setEditingTask(null);
  };

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setPopupVisible(true);
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleSortByDueDate = () => {
    setSortByPriority(false);
    setIsAscending(!isAscending);
  };

  const handleSortByPriority = () => {
    setSortByPriority(true);
    setIsAscending(!isAscending);
  };

  const handlePriorityChange = (taskId, newPriority) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
      dispatch(updateTask({ id: taskId, updatedTask: { ...taskToUpdate, priority: newPriority } }));
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortByPriority) {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return isAscending ? priorityOrder[a.priority] - priorityOrder[b.priority] : priorityOrder[b.priority] - priorityOrder[a.priority];
    } else {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return isAscending ? dateA - dateB : dateB - dateA;
    }
  });

  // Calculate data for the pie chart
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='container-fluid'>
      <Navbar onAddClick={togglePopup} />

      {popupVisible && (
        <div className="popup">
          <TaskForm 
            onSave={handleSave} 
            onCancel={handleCancel} 
            initialValues={editingTask || { 
              title: '', 
              description: '', 
              dueDate: '', 
              priority: '', 
              status: '' 
            }} 
          />
        </div>
      )}
      <div className="tablesize">
        <div className="table-responsive mt-4">
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th onClick={handleSortByDueDate} style={{ cursor: 'pointer' }}>
                  Due Date {isAscending && !sortByPriority ? '↑' : '↓'}
                </th>
                <th onClick={handleSortByPriority} style={{ cursor: 'pointer' }}>
                  Priority {isAscending && sortByPriority ? '↑' : '↓'}
                </th>
                <th>Status</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <Link to={`/task/${item.id}`} style={{ textDecoration: 'none' }}>
                      {item.title}
                    </Link>
                  </td>
                  <td>{item.description}</td>
                  <td>{item.dueDate}</td>
                  <td>
                    <select 
                      className="form-select" 
                      value={item.priority}
                      onChange={(e) => handlePriorityChange(item.id, e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>
                  <td>{item.status}</td>
                  <td>
                    <HiPencil onClick={() => handleEdit(item)} style={{ cursor: 'pointer' }} /> - 
                    <AiFillDelete onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="pie-chart-container">
        <h3>Task Status Distribution</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Rightmenu;
