import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom' /*讓標題名稱、登入註冊、搜尋的樣式,在點擊(clink)後能到各自的頁面 */

import Header from './Header';
import Signin from './pages/Signin';
import Posts from './pages/Post';
import NewPost from './pages/NewPost';

function App() {
    return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path='/' element = {<Posts />}/>
          <Route exact path='/signin' element={<Signin />}/>
          <Route exact path='/new-post'element={<NewPost />}/>
          
        </Routes>
      </BrowserRouter>    
    );
}

export default App;