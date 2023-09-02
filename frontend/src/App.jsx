import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { DataProvider } from './context';
import { AddPostPage } from './pages/AddPostPage/AddPostPage';
import { LoginPage } from './pages/AuthPage/LoginPage';
import { RegisterPage } from './pages/AuthPage/RegisterPage';
import { BlogPage } from './pages/BlogPage/BlogPage';
import { HomePage } from './pages/HomePage/HomePage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { getUser } from './store/actions/authAction';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <DataProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/addPost" element={<AddPostPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/:id" element={<BlogPage />}></Route>
        </Routes>
      </main>
    </DataProvider>
  );
}

export default App;
