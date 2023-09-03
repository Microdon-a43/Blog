import React from 'react';
import { Form } from '../../components/Form/Form';
import { Card } from '../../components/Card/Card';
import { Title } from '../../components/Title/Title';
import cls from './auth.module.scss';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../components/Modal/Message';

export const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmedPass: '',
  });

  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

  const handleChanges = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitChanges = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmedPass)
      alert('Пароли не совпадают');

    const responseData = {
      username: userData.username,
      password: userData.password,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/register',
        responseData
      );
      if (response.data) {
        setMsg(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setMsg(error.response.data[0].msg);
      console.log(error);
    }
  };

  const onCloseMsg = () => {
    setMsg('');
  };

  return (
    <div className="container">
      {msg && <Message message={msg} onClose={onCloseMsg} />}
      <Card className={cls.register}>
        <Title className={cls.title}>Регистрация</Title>
        <Form onSubmit={submitChanges}>
          <Input
            type="text"
            className={cls.register_input}
            name="username"
            placeholder="Username"
            onChange={handleChanges}
          />
          <Input
            type="password"
            className={cls.register_input}
            name="password"
            placeholder="Password"
            onChange={handleChanges}
          />
          <Input
            type="password"
            className={cls.register_input}
            name="confirmedPass"
            placeholder="Confirm Password"
            onChange={handleChanges}
          />
          <Button max>Зарегистрироваться</Button>
        </Form>
      </Card>
    </div>
  );
};
