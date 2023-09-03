import React from 'react';
import cls from './Home.module.scss';
import { Title } from '../../components/Title/Title';
import { Article } from '../../components/Article/Article';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { $api } from '../../api';
import { Editor } from '../../components/Modal/Editor';
import { Message } from '../../components/Modal/Message';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [articleId, setArticleId] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const allPosts = async () => {
      try {
        const response = await $api.get('/posts');
        if (response.data) {
          setPosts(response.data.posts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    allPosts();
  }, []);

  const deletePost = async (id) => {
    const accToken = localStorage.getItem('token');
    try {
      const response = await $api.delete(`/posts/${id}`, {
        headers: {
          Authorization: accToken,
        },
      });
      if (response.data) {
        setMsg(response.data.message);
        const newArr = posts.filter(
          (item) => item._id !== response.data.deletedPost._id
        );
        setPosts(newArr);
        setTimeout(() => {
          onCloseMsg();
        }, 1500);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      console.log(error);
    }
  };

  const openEditor = (id) => {
    setIsOpen(!isOpen);
    setArticleId(id);
  };

  const closeEditor = () => {
    setIsOpen(false);
  };

  function onCloseMsg() {
    setMsg('');
  }

  return (
    <div className="container">
      {isOpen && (
        <Editor active={true} closeModal={closeEditor} id={articleId} />
      )}
      {msg && <Message message={msg} onClose={onCloseMsg} />}
      <div className={cls.home}>
        <Title className={cls.title}>Unusual blog</Title>
        <div className={cls.articles}>
          {posts.map((post, index) => (
            <Article
              key={index}
              title={post.title}
              description={post.description}
              createdAt={moment(post.createdAT).format('LLL')}
              id={post._id}
              onDeletePost={deletePost}
              onOpenEditor={openEditor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
