import React from 'react';
import {Menu,Form,Container,Message} from 'semantic-ui-react';
import firebase from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';

/*Signin()為將註冊、登入畫面刻出的function*/
function Signin(){
      const navigate = useNavigate();

      const[activeItem,setActiveItem] = React.useState('register');
      const[email,setEmail] = React.useState("");
      const[password,setPassword] = React.useState("");
      const[errorMessage,setErrorMessage] = React.useState("");
      const[isLoading,setIsLoading]=React.useState(false);

    /*onSubmit()為讓使用者知道目前在哪部分的操作功能，並且register(註冊)、signin(登入)的功能實作分別對應不同的if statment */
      function onSubmit(){
          setIsLoading(true);
        if (activeItem === 'register') { /*如果是註冊功能*/
            firebase
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .then(() => {
              navigate("/"); /*當註冊完成後,navigate會使畫面倒回首頁*/
              setIsLoading(false);
              })
            .catch((error) => { /*判斷註冊的各種錯誤訊息*/
               switch(error.code) {
                case "auth/email-already-in-use":
                  setErrorMessage("信箱已存在");
                  break;
                case "auth/invalid-email":
                  setErrorMessage("信箱格式不正確");
                  break;
                case "auth/weak-password":
                  setErrorMessage("密碼強度不夠");
                  break;
                default:
               }
               setIsLoading(false);
              });
            
        }else if (activeItem === 'signin') { /*如果是登入功能*/
            firebase
            .auth()
            .signInWithEmailAndPassword(email,password)
            .then(() => {
              navigate("/"); /*當登入完成後,navigate會使畫面倒回首頁*/
              setIsLoading(false);
              })
            .catch((error) => { /*判斷登入的各種錯誤訊息*/
                switch(error.code) {
                 case "auth/invalid-email":
                   setErrorMessage("信箱格式不正確");
                   break;
                 case "auth/user-not-found":
                   setErrorMessage("信箱不存在");
                   break;
                 case "auth/wrong-password":
                   setErrorMessage("密碼錯誤");
                   break;
                 default:
                }
                setIsLoading(false);
            });    
          }
}
    return (
    <Container>
    <Menu width = "2">
      <Menu.Item
      active = {activeItem ==='register'}
      onClick = {() => {
          setErrorMessage("");
        setActiveItem("register");
      }}  
      >
        註冊
      </Menu.Item>
      <Menu.Item
      active = {activeItem ==='signin'}
      onClick = {() => {
          setErrorMessage("");
        setActiveItem("signin")
      }}  
      >
        登入
      </Menu.Item>      
    </Menu>
      <Form onSubmit = {onSubmit}> 
        <Form.Input 
          label="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="請輸入信箱"/>
        <Form.Input 
          label="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="請輸入密碼" 
          type ="password"/>
          
        {errorMessage && <Message negative>{errorMessage}</Message>}

        <Form.Button loading={isLoading}>
          {activeItem ==='register'&&'註冊'}
          {activeItem ==='signin'&&'登入'}   
        </Form.Button>  
      </Form>    
    </Container>
    );
}

export default Signin;