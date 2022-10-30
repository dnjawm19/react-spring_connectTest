import React, {useState} from "react";
import axios from 'axios';
import { setCookie, getCookie, delCookie } from "./cookie/cookie";

const App = () => {
  const [data,setData] = useState(null);
  const [data2,setData2] = useState([]);
  const [accountSignup,setAccountSignup] = useState(null);
  const [accountLogin,setAccountLogin] = useState(null);
  const [post,setPost] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileRes, setSelectedFileRes] = useState(null);


  const onClickGetPost = async () => {
    try{
      const response = await axios.get(
        'http://localhost:8080/api/showpost/recruittrue',
      );
      setData(response.data);
    }catch(e){
      console.log(e);
    }
  };

  const onClickGetPost2 = async () => {
    try{
      const response = await axios.get(
        'http://localhost:8080/api/showpost/recruittrue',
      );
      setData2(response.data);
    }catch(e){
      console.log(e);
    }
  };

  const onClickSignup = async () => {
    try{
      const response = await axios.post(
        'http://localhost:8080/api/member/signup', {
          "userid" : "211",
          "nickname": "정수123",
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
        'http://localhost:8080/api/member/login', {
          "userid" : "211",
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

  const handleSubmit = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    const headers = {
      'Content-Type' : 'application/json',
      'Access_Token' : getCookie('Access_Token')
    }
    try{
      const response = await axios.post(
        'http://localhost:8080/api/gamepost',
        formData,{
        headers: {
        'Access_Token' : getCookie('Access_Token'),
        'Content-Type' : 'multipart/form-data'
      }}
        );
        console.log(response.data);
    }catch(e){
      console.log(headers);
      console.log(e);
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }
  

  return (
    <div>
      <div>
      <div>
        <button onClick={onClickGetPost}>전체 게시글 조회</button>
      </div>
      {data && <textarea rows={20} value={JSON.stringify(data, null, 2)}readOnly={true}/>}
      </div>
      <div>
        <button onClick={onClickGetPost2}>전체 게시글 조회2</button>
        {data2.map((post) => (
          <div key={post.id}>
            <div>postId={post.id}</div>
            <div>postTitle={post.title}</div>
            <div>postUserEmail={post.userEmail}</div>
            <div>postContent={post.contents}</div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={onClickSignup}>회원가입</button>
        <div>{accountSignup && <textarea rows={4} value={JSON.stringify(accountSignup, null, 2)}readOnly={true}/>}</div>
      </div>
      <div>
        <button onClick={onClickLogin}>로그인</button>
        <div>{accountLogin && <textarea rows={4} value={JSON.stringify(accountLogin, null, 2)}readOnly={true}/>}</div>
      </div>
      <div>
        <button onClick={onClickLogout}>로그아웃</button>
      </div>
      {/* <div>
        <button onClick={onClickPost}>게시글 작성</button>
        <div>{post && <textarea rows={4} value={JSON.stringify(post, null, 2)}readOnly={true}/>}</div>
      </div> */}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect}/>
        <input type="submit" value="Upload File"/>
      </form>
    </div>
  )
}

export default App;