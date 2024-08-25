import React, { useState } from 'react';
import "./right.css";
import Navbar from './Navbar';
import TaskForm from './popup/TaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { HiPencil } from "react-icons/hi2";
import { AiFillDelete } from "react-icons/ai";
import { updateTask, deleteTask, addTask } from '../../utility/searchSlice';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const Rightmenu = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [sortByPriority, setSortByPriority] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
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

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearch = () => {
    if (searchQuery) {
      const filteredItems = sortedTasks.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filteredItems);
    } else {
      setFilteredTasks([]);
    }
  };

  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status],
  }));

  const priorityCounts = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.keys(priorityCounts).map(priority => ({
    name: priority,
    count: priorityCounts[priority],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 6 ? words.slice(0, 6).join(' ') + '...' : description;
  };

  return (
    <div className='container-fluid'>
      <Navbar 
        onAddClick={togglePopup} 
        onSearchChange={handleSearchChange} 
        onSearch={handleSearch} 
      />

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

      <div className="d-flex flex-column flex-md-row">
        {/* Left Side Menu - Hidden on Small Screens */}
        <div className="tablesize flex-grow-1 d-md-block">
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
                    <td>{truncateDescription(item.description)}</td>
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

        {/* Filtered Tasks */}
        <div className="filtered-tasks ms-0 ms-md-4 mt-4 mt-md-0">
          <h3>Filtered Tasks</h3>
          <div className="table-responsive mt-4">
            <table className="table table-striped table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <Link to={`/task/${item.id}`} style={{ textDecoration: 'none' }}>
                        {item.title}
                      </Link>
                    </td>
                    <td>{truncateDescription(item.description)}</td>
                    <td>{item.dueDate}</td>
                    <td>{item.priority}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container mt-4">
        <div className="chart pie-chart-container">
          <h3>Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart bar-chart-container barchart mt-4 mt-md-0">
          <h3>Task Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="bottom" />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Rightmenu;
