import React, { useState,useEffect } from 'react';
import './App.css';
import Header from './Header';
import Nav from './Nav';
import Missing from './Missing';
import Home from './Home';
import Footer from './Footer';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import PostPage from './PostPage';
import Post from './Post';
import NewPost from './NewPost';
import { format } from 'date-fns';
import About from './About';
import api from './api/posts';
import EditPost from './EditPost';
import useAxiosFetch from './Hooks/useAxiosFetch';
import { DataProvider } from './context/DataContext';




function App() {
  const [search,setSearch] = useState('');
  const [posts,setPosts] = useState([
 ]);
const [postTitle, setPostTitle] = useState('');
 const [postBody, setPostBody] = useState('');
const [editTitle,setEditTitle] = useState('');
 const [editBody, setEditBody] = useState('');
 const navigate = useNavigate();
  const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts');


const handleEdit = async (id) => {
  const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  const updatedPost = { id, title: editTitle, datetime, body: editBody };
  try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
  } catch (err) {
      console.log(`Error: ${err.message}`);
  }
}
 


const handleDelete = async (id) => {
  try {
    await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
  } catch (err) {
      console.log(`Error: ${err.message}`);
  }
}
useEffect(()=>{
  setPosts(data);
},[data])
  return (
    // <div className="App">
    //   <nav>
    //     <ul>
    //       <li><Link to = "/">Home</Link></li>
    //       <li><Link to = "/Header">Header</Link></li>
    //       <li><Link to = "/Missing">Missing</Link></li>
    //       <li><Link to = "/Postpage">PostPage</Link></li>
          
    //     </ul>
    //   </nav>
    //  <Routes>
    //   <Route path = "/" element = {<Home/>}></Route>
    //   <Route path = "/Header" element = {<Header/>}></Route>
    //   <Route path = "/Missing" element = {<Missing/>}></Route>
    //   <Route path = "/PostPage" element = {<PostPage/>}></Route>
    //   <Route path = "/Post/:id" element = {<Post/>}></Route>
    //   <Route path = "/Post/newPost" element = {<NewPost/>}></Route>
    //  </Routes>
        <>
       <div className="App">
      <DataProvider>
      <Header  title = "Social-Media-App"/>
      <Nav/>
      <Routes>
        <Route path = "/" element = {<Home posts= {posts} setPosts = {setPosts} fetchError={fetchError} isLoading={isLoading}/>}/>
         <Route path = "/Post"  element = {<NewPost posts= {posts} setPosts= {setPosts} setPostBody= {setPostBody}
         setPostTitle = {setPostTitle} postBody = {postBody} postTitle = {postTitle}/>}/>
         <Route path = "/About" element = {<About/>}/>
         <Route path="/edit/:id" element = {<EditPost posts= {posts}  setPosts = {setPosts} handleEdit = {handleEdit} editBody = {editBody}setEditBody={setEditBody} editTitle = {editTitle} setEditTitle = {setEditTitle} />}/>
         <Route path="/Post/:id" element={<PostPage posts = {posts} setPosts = {setPosts}  handleDelete = {handleDelete}/>} />
         <Route path = "*" element = {<Missing/>}/>
      </Routes>
      <Footer />
      </DataProvider>
      </div>
      </>  
    
  );
}

export default App;
