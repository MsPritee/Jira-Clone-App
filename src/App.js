import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './Components/Dashboard/Dashboard';
import Sidebar from './Components/Sidebar';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './Store/Store';


const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <div className='flex flex-col h-screen'>
          <Header toggleSidebar={toggleSidebar} />
          <div className={`flex ${isSidebarOpen ? 'ml-0' : ''}`}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Dashboard />
          </div>
        </div>
      </PersistGate>
    </Provider >
    </div >
  );
}

export default App;
