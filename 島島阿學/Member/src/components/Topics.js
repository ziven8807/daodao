import React from 'react';
import 'firebase/compat/firestore';
import {List} from 'semantic-ui-react';
import firebase from '../utils/firebase';


function Topics() {
    const[topics,setTopics]= React.useState([]);
    React.useEffect(() => {
      firebase
        .firestore()
        .collection("topics")
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((doc) => {
              return doc.data();
            
          });
        setTopics(data);
       });
    }, []);
    return (
        <List amimated selection>
            {topics.map((topics) =>  {
            return <List.Item> {topics.name} </List.Item>;
            })}
        </List>
    );
}

export default Topics;