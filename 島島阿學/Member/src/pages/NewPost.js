import {Container,Header,Form,Image,Button} from 'semantic-ui-react';
import React from 'react';
import 'firebase/firestore';
import firebase from '../utils/firebase';



function NewPost() {
     const[title,setTitle] = React.useState('');
     const[content,setContent] = React.useState('');
     const[topics,setTopics] = React.useState('[]');
     const[topicName,setTopicName] = React.useState("");
     const[file,setFile] = React.useState(null);

     React.useEffect(() => {
        let data_test 
        firebase
          .firestore()
          .collection("topics")
          .get()
          .then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map((doc) => {
                data = doc.data()
                console.log("Name:",data)
                return doc.data();
                
            });
            setTopics(data_test);
         });
      }, []);

    
      const options = topics.map (item => {
        return {
                  text: item.name,
                  value: item.name,
              };
      })
    
      
        
     const previweUrl = file ? URL.createObjectURL(file): "http://react.semantic-ui.com/images/wireframe/image.png"

     return (
        <Container>
            <Header>發表文章</Header>
            <Form>
                <Image
                  src = {previweUrl}
                  size = "small"
                  floated = "left"
                />
                <Button basic as = "label" htmlFor = "post-image">
                上傳文章圖片    
                </Button> 
                <Form.Input
                   type = "file"
                   id = "post-image"
                   style = {{display:'none'}}
                   onChange = {(e) => setFile(e.target.files[0])}
                />

                <Form.Input
                   placeholder = "輸入文章標題"
                   value = {title}
                   onChange = {(e) => setTitle(e.target.value)}
                />
                <Form.TextArea
                   placeholder = "輸入文章內容"
                   value = {content}
                   onChange = {(e) => setContent(e.target.value)}
                />
                <Form.Dropdown
                   placeholder = "選擇文章主題"
                   options = {options}
                   selection 
                   value = {topicName}
                   onChange = {(e, {value}) => setTopicName(value)}
                />   
                <Form.Button>送出</Form.Button>
            </Form>
        </Container>
     );
    
}

export default NewPost;