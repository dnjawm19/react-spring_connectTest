import React, {useState} from "react";
import axios from 'axios';
import { setCookie, getCookie, delCookie } from "./cookie/cookie";
import styled from "styled-components";

const App = () => {
  const [data,setData] = useState(null);
  const [data2,setData2] = useState([]);
  const [accountSignup,setAccountSignup] = useState(null);
  const [accountLogin,setAccountLogin] = useState(null);
  const [post,setPost] = useState(null);


  const onClickGetPost = async () => {
    try{
      const response = await axios.get(
        'http://localhost:8080/api/post',{
          headers: {
            'Content-Type' : 'application/json',
            'Access_Token' : getCookie('Access_Token')
          }
        }
      );
      setData(response.data);
    }catch(e){
      console.log(e);
    }
  };

  const onClickGetPost2 = async () => {
    try{
      const response = await axios.get(
        'http://localhost:8080/api/post',{
          headers: {
            'Content-Type' : 'application/json',
            'Access_Token' : getCookie('Access_Token')
          }
        }
      );
      setData2(response.data);
    }catch(e){
      console.log(e);
    }
  };

  const onClickSignup = async () => {
    try{
      const response = await axios.post(
        'http://localhost:8080/auth/signup', {
          "userName" : "211",
          "nickName": "정수123",
          "password": "asd"
        }
      );
      setAccountSignup(response.data);
    }catch(e){
      console.log(e);
    }
  };

  const onClickLogin = async () => {
    try{
      const response = await axios.post(
        'http://localhost:8080/auth/login', {
          "userName" : "211",
          "password": "asd",
        },
      );
      setAccountLogin(response.data);
      const token = {
        'Content-Type' : 'application/json',
        'Access_Token' : setCookie('Access_Token',response.headers.access_token)
      }
    }catch(e){
      console.log(e);
    }
  };

  const onClickLogout = () => {
    delCookie('Access_Token');
    alert('로그아웃 성공');
  }

  // const onClickPost = async () => {
  //   const headers = {
  //     'Content-Type' : 'application/json',
  //     'Access_Token' : getCookie('Access_Token')
  //   }
  //   try{
  //     const response = await axios.post(
  //       'http://localhost:8080/api/gamepost', {
  //         "title": "제목1",
  //         "userEmail": "dnjawm1995dddsd@naver.com",
  //         "contents": "내용1",
  //         "nickname": "닉네임1"
  //       },headers
  //     );
  //     setPost(response.data);
  //   }catch(e){
  //     console.log(e);
  //   }
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const content = "내용";
    const formData = new FormData(e.currentTarget);
    const files = e.currentTarget.files;
    formData.append('content', content);
    for (let i = 0; i < files?.length; i++) {
      formData.append('files', files[i]);
    }
    try{
      const response = await axios.post(
        'http://localhost:8080/api/post',
        formData,
        {
          headers: {
          'Access_Token' : getCookie('Access_Token'),
          'Content-Type' : 'multipart/form-data'
        }}
        );
        console.log(response.data);
    }catch(e){
      console.log(e);
    }
  }

  const onClickLike = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(
        'http://localhost:8080/api/post/like',
        e.currentTarget.value,
        {
          headers: {
          'Access_Token' : getCookie('Access_Token'),
          'Content-Type' : 'application/json'
        }}
        );
        console.log(response.data);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <div>
      <div>
      <div>
        <button onClick={onClickGetPost}>전체 게시글 조회</button>
      </div>
      <br/>
      {data && <textarea rows={20} value={JSON.stringify(data, null, 2)}readOnly={true}/>}
      </div>
      <br/>
      <div>
        <button onClick={onClickGetPost2}>전체 게시글 조회2</button>
        <br/>
        {data2.map((post) => (
          <div key={post.id}>
            <div>postId = {post.postId}</div>
            <div>postContent = {post.content}</div>
            <div>{post.imgUrl.map((url) => (
              <div>imgUrl={url}</div>   //키값이 없어서 불안정함 내일 백엔드에서 url을 post에 연관관계 지어서 안정적으로 만들어야 할거같음
            ))}</div>
            {post.likeCheck ? <LikeButton onClick={onClickLike} value={post.postId}>좋아요</LikeButton> :
            <LikeButton onClick={onClickLike} value={post.postId}>좋아요취소</LikeButton>}
            <br/>
            <br/>
          </div>
        ))}
      </div>
      <div>
        <button onClick={onClickSignup}>회원가입</button>
        <br/>
        <br/>
        <div>{accountSignup && <textarea rows={4} value={JSON.stringify(accountSignup, null, 2)}readOnly={true}/>}</div>
      </div>
      <br/>
      <div>
        <button onClick={onClickLogin}>로그인</button>
        <br/>
        <br/>
        <div>{accountLogin && <textarea rows={4} value={JSON.stringify(accountLogin, null, 2)}readOnly={true}/>}</div>
      </div>
      <br/>
      <div>
        <button onClick={onClickLogout}>로그아웃</button>
      </div>
      <br/>
      {/* <div>
        <button onClick={onClickPost}>게시글 작성</button>
        <div>{post && <textarea rows={4} value={JSON.stringify(post, null, 2)}readOnly={true}/>}</div>
      </div> */}
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" multiple/>
        <input type="file" name="file" multiple/>
        <input type="submit" value="Upload File"/>
      </form>
    </div>
  )
}

const LikeButton = styled.button`
  
`

export default App;