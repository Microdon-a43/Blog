import React from 'react';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { Title } from '../../components/Title/Title';
import cls from './auth.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { login } from '../../store/actions/authAction';

export const LoginPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
 

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const watchChanges = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitChanges = async (e) => {
    e.preventDefault();

    dispatch(login(userData));
    navigate('/');
  };

  return (
    <div className="container">
      <Card className={cls.login}>
        <Title className={cls.title}>Войти</Title>
        <Form onSubmit={submitChanges}>
          <Input
            type="text"
            className={cls.login_input}
            name="username"
            value={userData.username}
            placeholder="Username"
            onChange={watchChanges}
          />
          <Input
            type="password"
            className={cls.login_input}
            name="password"
            value={userData.password}
            placeholder="Password"
            onChange={watchChanges}
          />
          <div className={cls.forgot}>Забыли пароль?</div>
          <Button max>Войти</Button>
        </Form>
      </Card>
    </div>
  );
};
