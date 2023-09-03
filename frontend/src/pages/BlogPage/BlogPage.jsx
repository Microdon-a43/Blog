import React from 'react';
import cls from './Blog.module.scss';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Title } from '../../components/Title/Title';
import like from '../../assets/postsImages/like.svg';
import view from '../../assets/postsImages/views.svg';
import avatar from '../../assets/postsImages/avatar.svg';
import moment from 'moment';
import { $api } from '../../api';
import { Message } from '../../components/Modal/Message';

export const BlogPage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/post/${params.id}`
        );
        if (response.data) {
          setData([response.data.post]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getArticle();
  }, []);

  const likeOrUnlikePost = async () => {
    const accToken = localStorage.getItem('token');
    try {
      const res = await $api.patch(
        `/post/${params.id}`,
        {
          likes: [params.id],
        },
        {
          headers: {
            Authorization: accToken,
          },
        }
      );
      if (res.data) {
        res.data.message === 'Like' ? setIsLiked(true) : setIsLiked(false);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const getLikeState = async () => {
      const accToken = localStorage.getItem('token');
      try {
        const res = await $api.get(`/likedPost/${params.id}`, {
          headers: {
            Authorization: accToken,
          },
        });
        if (res.data) {
          console.log(res.data.liked);
          if (res.data.liked === true) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLikeState();
  }, []);

  function onCloseMsg() {
    setMsg('');
  }

  return (
    <div className="container">
      {data.map((post) => (
        <div className={cls.wrapper}>
          <div className={cls.img_Wrap}>
            <img
              className={cls.image}
              src={`http://localhost:5000${post.picture}`}
              alt="img"
            />
            <div className={cls.likeBtn} onClick={likeOrUnlikePost}>
              {isLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="red"
                >
                  <circle cx="17.5" cy="17.5" r="17.5" fill="white" />
                  <path
                    d="M13.8749 10.75C11.0905 10.75 8.83325 13.0072 8.83325 15.7917C8.83325 20.8333 14.7916 25.4167 17.9999 26.4828C21.2083 25.4167 27.1666 20.8333 27.1666 15.7917C27.1666 13.0072 24.9093 10.75 22.1249 10.75C20.4198 10.75 18.9123 11.5965 17.9999 12.8922C17.0875 11.5965 15.5801 10.75 13.8749 10.75Z"
                    stroke="#454545"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                >
                  <circle cx="17.5" cy="17.5" r="17.5" fill="white" />
                  <path
                    d="M13.8749 10.75C11.0905 10.75 8.83325 13.0072 8.83325 15.7917C8.83325 20.8333 14.7916 25.4167 17.9999 26.4828C21.2083 25.4167 27.1666 20.8333 27.1666 15.7917C27.1666 13.0072 24.9093 10.75 22.1249 10.75C20.4198 10.75 18.9123 11.5965 17.9999 12.8922C17.0875 11.5965 15.5801 10.75 13.8749 10.75Z"
                    stroke="#454545"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className={cls.content}>
            <Message message={msg} onClose={onCloseMsg} />
            <div className={cls.main}>
              <Title className={cls.title}>{post.title}</Title>
              <span>{moment(post.createdAT).format('LLL')}</span>
              <span className={cls.category}>{post.category}</span>
              <p className={cls.text}>{post.description}</p>
            </div>
            <div className={cls.blogInfo}>
              <div className={cls.author}>
                <img
                  className={cls.avatar}
                  width={35}
                  height={35}
                  src={avatar}
                  alt="avatar"
                />
                <span>{post.author}</span>
              </div>
              <div className={cls.likesAndViews}>
                <div className={cls.likes}>
                  <img src={like} alt="like" />
                  <span>{post.likes.length}</span>
                </div>
                <div className={cls.views}>
                  <img src={view} alt="view" />
                  <span>{post.views}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
