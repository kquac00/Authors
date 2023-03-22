import './App.css';
import { Routes, Route } from 'react-router-dom'
import MainAuthor from './views/MainAuthor'
import CreateAuthor from './views/CreateAuthor'
import UpdateAuthor from './views/UpdateAuthor'


function App() {
  return (
    <div className='center1'>
      
      <h1>Favorite authors</h1>
      <Routes>
        <Route path="/author" element={<MainAuthor />} />
        <Route path="/author/new" element={<CreateAuthor />} />
        <Route path="/author/:id/edit" element={<UpdateAuthor />} />
      </Routes>
    </div>
  );
}

export default App;
