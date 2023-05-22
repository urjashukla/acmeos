import axios from 'axios';

class Content {

    static uname = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    static getBookmarkID(ID){
        //getbookmarkid
        axios
          .get('http://localhost:9000/bookmark/getid', {
            params: {
              username: this.uname.username,
              chapid: ID,
            },
          })
          .then((res) => {
            let addbookmark = JSON.parse(localStorage.getItem('bookmarks'));
            addbookmark.push(res.data.result[0]);
            localStorage.setItem('bookmarks', JSON.stringify(addbookmark));
          })
          .catch((error) => {
            console.log('Axios Error ', error);
          });
      };

    static changeStatus(ID){
      let options = {
        username: this.uname.username,
        chapid: ID
      }
      axios
          .patch('http://localhost:9000/inprogress/', options)
          .then((res) => {
            console.log("res::",res);
          })
          .catch((error) => {
            console.log('Axios Error ', error);
          });
    }

}

export default Content;