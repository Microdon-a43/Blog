import React, { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import { Title } from '../Title/Title';
import cls from './Modal.module.scss';
import addSvg from '../../assets/add.svg';
import closeBtn from '../../assets/btn-delete.svg';
import { $api } from '../../api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthModal } from './AuthModal';

export const Editor = ({ active, closeModal, id }) => {
  const [postData, setPostData] = useState([]);
  const [postValues, setpostValues] = useState({
    title: '',
    category: '',
    description: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const [msg, setMsg] = useState('')

  const handleChanges = (e) => {
    setpostValues({ ...postValues, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      console.log(file);
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

  const UpdatePost = async (e) => {
    e.preventDefault();

    try {
      const accToken = localStorage.getItem('token');
      const response = await $api.patch(
        `/posts/${id}`,
        {
          ...postValues,
          picture: imageUrl,
        },
        {
          headers: {
            Authorization: accToken,
          },
        }
      );
      if (response.data) {
        console.log(response.data);
        setMsg(response.data.message)
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.message)
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await $api.get(`/posts/${id}`);
        if (response.data) {
          setPostData([response.data.post]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);


  return (
    <div className={`${cls.overlay} ${active && cls.active}`}>
      {msg && <AuthModal message={msg}/>}
      <div className={cls.editor}>
        <div className={cls.editorTop}>
          <Title className={cls.title}>Редактировать Пост</Title>
          <img src={closeBtn} alt="" onClick={closeModal} />
        </div>
        {postData.map((post) => (
          <div className={cls.editBox}>
            <Form onSubmit={UpdatePost}>
              <div className={cls.addFile}>
                <label className={cls.upload_label} for="upload-input">
                  <Input
                    type="file"
                    id="upload-input"
                    name="picture"
                    className={cls.upload_input}
                    accept="image/*,.png, .jpg,.jpeg,.web"
                    onChange={handleFileChange}
                  />
                  {imageUrl ? (
                    <img
                      src={`http://localhost:5000${imageUrl}`}
                      alt="AddFile"
                    />
                  ) : (
                    <img src={addSvg} alt="AddFile" />
                  )}
                </label>
              </div>

              <Input
                name="title"
                placeholder={post.title}
                onChange={handleChanges}
              />

              <select name="category" onChange={handleChanges}>
                <option value="" disabled selected>
                  {post.category}
                </option>
                <option value="Еда">Еда</option>
                <option value="Путешествия">Путешествия</option>
                <option value="Спорт">Спорт</option>
                <option value="Политика">Политика</option>
              </select>
              <textarea
                name="description"
                id=""
                cols="30"
                rows="10"
                placeholder="Введите описание поста"
                onChange={handleChanges}
              >
                {post.description}
              </textarea>
              <Button type="submit">Редактировать</Button>
            </Form>
          </div>
        ))}
      </div>
    </div>
  );
};
