import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Error, Register, ProtectedRoute } from './pages';
import { AddJobs, AllJobs, SharedLayout, Stats, Profile } from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJobs />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
