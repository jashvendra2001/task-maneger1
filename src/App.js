
import Leftmenu from './components/dashboard/Leftmenu';
import Rightmenu from './components/dashboard/Rightmenu';
import { Increment } from './components/Increament';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import TaskDetail from './components/dashboard/taskDetail/Taskdetail';
import NavsideMenu from './components/dashboard/navsidemenu/NavsideMenu';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<NavsideMenu/>} />
      
      <Route path="/task/:id" element={<TaskDetail />} />
    </Routes>
  </Router>
  );
}

export default App;
