import React from 'react';
import { Card } from '../../components/Card/Card';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { Title } from '../../components/Title/Title';
import cls from './AddPost.module.scss';
import addSvg from '../../assets/add.svg';
import deleteBtn from '../../assets/btn-delete.svg';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { $api } from '../../api';
import { AuthModal } from '../../components/Modal/AuthModal';

export const AddPostPage = () => {
  const [postData, setPostData] = useState({
    title: '',
    category: '',
    description: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const watchChanges = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post(
        'http://localhost:5000/upload',
        formData
      );
      setImageUrl(data.url);
    } catch (error) {
      console.error(error);
    }
  };
  const onDeleteImage = () => {
    setImageUrl('');
  };
  const submitChanges = async (e) => {
    e.preventDefault();

    try {
      const accToken = localStorage.getItem('token');
      const response = await $api.post(
        '/createPost',
        {
          ...postData,
          picture: imageUrl,
        },
        {
          headers: {
            Authorization: accToken,
          },
        }
      );
      if (response.data) {
        setMsg(response.data.message);
        setTimeout(() => {
          onCloseMsg();
           setTimeout(() => {
            navigate('/')
          }, 1500)
        },2000)
        
      }
    } catch (error) {
      setMsg(error.response.data[0].msg);
      console.log(error);
    }
  };

  function onCloseMsg() {
    setMsg('');
  }

  return (
    <div className="container">
      {msg && <AuthModal message={msg} onClose={onCloseMsg} />}
      <Card className={cls.addPost}>
        <Title className={cls.title}>Добавить Пост</Title>
        <Form onSubmit={submitChanges}>
          <div className={cls.addFile}>
            <div className={cls.addFileWrap}>
              <Input
                type="file"
                id="upload-input"
                name="picture"
                className={cls.upload_input}
                accept="image/*,.png, .jpg,.jpeg,.web"
                onChange={handleFileChange}
              />
              <img
                className={cls.deleteBtn}
                src={deleteBtn}
                alt="deletePic"
                onClick={onDeleteImage}
              />
              <label className={cls.upload_label} for="upload-input">
                {imageUrl ? (
                  <img src={`http://localhost:5000${imageUrl}`} alt="AddFile" />
                ) : (
                  <img src={addSvg} alt="AddFile" />
                )}

                <span>Выберите файл(ы)</span>
              </label>
            </div>
          </div>
          <Input
            value={postData.title}
            name="title"
            placeholder="Введите название поста"
            onChange={watchChanges}
          />
          <select
            name="category"
            value={postData.category}
            onChange={watchChanges}
          >
            <option value="" disabled selected>
              Выберите категорию
            </option>
            <option value="Еда">Еда</option>
            <option value="Путешествия">Путешествия</option>
            <option value="Спорт">Спорт</option>
            <option value="Политика">Политика</option>
          </select>
          <textarea
            name="description"
            value={postData.description}
            id=""
            cols="30"
            rows="10"
            placeholder="Введите описание поста"
            onChange={watchChanges}
          ></textarea>
          <Button>Добавить</Button>
        </Form>
      </Card>
    </div>
  );
};
