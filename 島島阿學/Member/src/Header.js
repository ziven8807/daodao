import React from 'react';
import {Menu,Search} from 'semantic-ui-react';
import {Link} from 'react-router-dom'; /*讓標題名稱、登入註冊、搜尋的樣式能夠進入各別的網址 */
import firebase from './utils/firebase';

function Header() {
     const[user,setUser] = React.useState(null)
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    },[]);
    return (
        <Menu>
         <Menu.Item as={Link} to="/">
            島島阿學
        </Menu.Item>
         <Menu.Item>
            <Search/>
         </Menu.Item>
         <Menu.Menu position="right">
            {user ? (
            <>
               <Menu.Item as={Link} to="/new-post">
                發表文章
               </Menu.Item>
               <Menu.Item as={Link} to="/my">
                會員
               </Menu.Item>
               <Menu.Item onClick ={() =>firebase.auth().signOut()}>
                登出
               </Menu.Item>
               </>
            ):(
               <Menu.Item as={Link} to="/signin"> 
                註冊/登入 
               </Menu.Item>
            )}
        </Menu.Menu>      
        </Menu>
    );
}

export default Header;