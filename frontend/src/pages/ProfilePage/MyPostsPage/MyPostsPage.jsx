import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { $api } from '../../../api';
import { Article } from '../../../components/Article/Article';
import { Title } from '../../../components/Title/Title';
import cls from './MyPosts.module.scss';

export const MyPostsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [personalPosts, setPersonalPosts] = useState([]);

  useEffect(() => {
    const getPersonalPosts = async () => {
      try {
        const res = await $api.get(`/posts/${user._id}`);
        if (res.data) {
          setPersonalPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPersonalPosts();
  }, [user]);

  return (
    <div className="container">
      <div className={cls.personalPosts}>
        <Title className={cls.title}>My personal posts</Title>
        <div className={cls.posts}>
          {personalPosts.map((post, index) => (
            <Article
              key={index}
              title={post.title}
              description={post.description}
              createdAt={moment(post.createdAT).format('LLL')}
              id={post._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
