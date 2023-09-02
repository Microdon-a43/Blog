import axios from 'axios';
import { $api } from '../../api';

export const login = (userData) => async (dispatch) => {
  try {
    const response = await $api.post(
      'http://localhost:5000/api/login',
      userData
    );
    if (response.data) {
      localStorage.setItem('token', response.data.accessToken);
      dispatch({
        type: 'AUTH',
        payload: {
          user: response.data.user,
          token: response.data.accessToken,
        },
      });
    } else {
    }
  } catch (error) {
    alert('Неверный логин или пароль');
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('token');
  try {
    dispatch({
      type: 'AUTH',
      payload: {
        user: '',
        token: '',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const res = await $api.get('/user');
      dispatch({
        type: 'AUTH',
        payload: {
          user: res.data.user,
          token: res.data.accessToken,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      dispatch({
        type: 'AUTH',
        payload: {
          user: '',
          token: '',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};
