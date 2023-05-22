// Introduction to OS
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import '../css/chap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Content from '../../../util/Content';


const Chap1 = () => {
  const id = 'c1';
  const uname = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [selected, setSelected] = useState('');
  const [done, setDone] = useState(new URLSearchParams(useLocation().search).get('completed'));

  let bookmarked;
  if(uname){
   bookmarked = JSON.parse(localStorage.getItem('bookmarks')).find(
    (chap) => chap.chapterid === id
  );}
  useEffect(() => {
    if (bookmarked === undefined) {
      setSelected('fa fa-bookmark-o');
    } else {
      setSelected('fa fa-bookmark');
    }
  }, []);

  const getBookmarkID = () => {
    //getbookmarkid
    axios
      .get('http://localhost:9000/bookmark/getid', {
        params: {
          username: uname.username,
          chapid: id,
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

  const toggleSelected = () => {
    let options = {
      username: uname.username,
      chapid: id,
    };
    if (selected === 'fa fa-bookmark') {
      // Remove bookmark
      setSelected('fa fa-bookmark-o');
      bookmarked = JSON.parse(localStorage.getItem('bookmarks')).find(
        (chap) => chap.chapterid === id
      );
      axios
        .delete('http://localhost:9000/bookmark/' + `${bookmarked.bookmarksid}`)
        .then((res) => {
          let bomks = JSON.parse(localStorage.getItem('bookmarks'));
          bomks.pop(); // As newly added bookmark would be at the end of array
          localStorage.setItem('bookmarks', JSON.stringify(bomks));
        })
        .catch((error) => {
          console.log('Axios remove bookmark Error');
          console.log(error);
        });
    } else {
      // Add bookmark
      setSelected('fa fa-bookmark');
      axios
        .post('http://localhost:9000/bookmark', options)
        .then((res) => {
          getBookmarkID();
        })
        .catch((error) => {
          console.log('Axios Error');
          console.log(error);
        });
    }
  };
  return (
    <Container className="p-4 content">
      <Row>
        <Col xs={11}>
          <h1>Introduction to Operating System</h1>
        </Col>
        <Col xs={1}>
          {uname === null ? (
            <></>
          ) : (
            <i
              className={selected}
              aria-hidden="true"
              onClick={toggleSelected}
              style={{ cursor: 'pointer', fontSize: 'xx-large' }}
            ></i>
          )}
        </Col>
      </Row>
      <h2>Definition</h2>
      <p>
        
        An operating system is a program that acts as an interface between the user and the computer hardware and controls the execution of all kinds of programs.

      </p>
      <h4>Functions of Operating system </h4>
      <p>
        Operating system perform following functions: 
      </p>
      <p>
        <b>1.	Convenience:</b>
        An OS makes a computer more convenient to use.
      </p>
      <p>
        <b>2.	Efficiency: </b>
        An OS allows the computer system resources to be used efficiently.
      </p>
      <p>
        <b>3.	Ability to Evolve: </b>
        An OS should be constructed in such a way as to permit the effective development, testing, and introduction of new system functions at the same time without interfering with service.
      </p>
      <p>
        <b>4.	Throughput: </b>
        An OS should be constructed so that It can give maximum throughput (Number of tasks per unit time).
      </p>

      <h2>Major Functionalities of Operating System: </h2>
      <p>
        <b>•	Resource Management:</b>
        When parallel accessing happens in the OS means when multiple users are accessing the system the OS works as Resource Manager, Its responsibility is to provide hardware to the user. It decreases the load in the system.
      </p>
      <p>
        <b>•	Process Management: </b>
        It includes various tasks like scheduling, termination of the process. OS manages various tasks at a time. Here CPU Scheduling happens means all the tasks would be done by the many algorithms that use for scheduling.
      </p>
      <p>
        <b>•	Storage Management: </b>
        The file system mechanism used for the management of the storage. 
      </p>
      <p>
        <b>•	Memory Management: </b>
        Refers to the management of primary memory. The operating system has to keep track, how much memory has been used and by whom. It has to decide which process needs memory space and how much. OS also has to allocate and deallocate the memory space.
      </p>
      <p>
        <b>•	Security/Privacy Management: </b>
        Privacy is also provided by the Operating system by means of passwords so that unauthorized applications can not access programs or data. For example, Windows uses Kerberos authentication to prevent unauthorized access to data.
      </p>
      

      <h2>Types of Operating System</h2>
      <ul>
        <li>	Batch Operating System- Sequence of jobs in a program on a computer without manual interventions. </li>
        <li>	Network operating system- computers running in different operating systems can participate in a common network (It is used for security purposes).</li>
        <li>	Time-sharing operating System- allows many users to share the computer resources. (Max utilization of the resources).</li>
        <li>	Distributed operating System- Manages a group of different computers and makes appear to be a single computer.</li>
        <li>	Real-time operating system meant applications to fix the deadlines</li>
      </ul>

      <h2>Examples of Operating System are</h2>
      <ul>
        <li> Windows </li>
        <li> GNU/Linux  </li>
        <li> macOS </li>
        <li> Android  </li>
        <li> iOS </li>
      </ul>
      
      
      
      {uname === null ? (<></>) : (done === 'true' ? (
        <Button className="btn-success markDone" disabled>
          Done!
        </Button>
      ) : (
        <Button
          className="markDone"
          onClick={() => {
            Content.changeStatus(id);
            setDone('true');
          }}
        >
          Mark As Done
        </Button>
      ))}

    </Container>
  );
};

export default Chap1;
