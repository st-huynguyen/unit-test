import React from 'react';
import Detail from './pages/Detail';
import List from './pages/List';
import NotFound from './pages/NotFound';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<List />} />
        <Route path="users/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
