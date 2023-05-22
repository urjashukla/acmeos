// Process Vs Thread
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../css/chap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Content from '../../../util/Content';
import { useLocation } from 'react-router-dom';

const Chap2 = () => {
  const id = 'c2';
  const uname = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [selected, setSelected] = useState('');
  const [done, setDone] = useState(new URLSearchParams(useLocation().search).get('completed'));

  let bookmarked;
  if (uname) {
    bookmarked = JSON.parse(localStorage.getItem('bookmarks')).find(
      (chap) => chap.chapterid === id
    );
  }

  useEffect(() => {
    if (bookmarked === undefined) {
      setSelected('fa fa-bookmark-o');
    } else {
      setSelected('fa fa-bookmark');
    }
  }, []);

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
          Content.getBookmarkID(id);
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
          <h1>Process vs Thread</h1>
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
      <p>
        Both processes and threads are related to each other and very much similar, hence create
        confusion to understand the differences between both of them. The process and thread are an
        independent sequence of execution, but both are differentiated in a way that processes
        execute in different memory spaces, whereas threads of the same process execute in shared
        memory space.
      </p>
      <h4>What is process?</h4>
      <p>
        Process is an instance of a program that is being executed. The implementation of process
        lies in PCB (Process Control Block). Processes that stay in the background to handle some
        activity such as email, Web pages, news, printing, and so on are called <code>daemons</code>
        . A parent process can create child process using <code>fork()</code> system call.
      </p>
      <h4>What is thread?</h4>
      <p>
        Threads are located inside the process. They are lighter in weight than processes and are
        easier to create and destroy. Unlike processes, threads share data, code and files among
        each other but contains their own stack, register and counter.
      </p>
      <h4>Similarity between Threads and Processes</h4>
      <ul>
        <li>Only one thread or process is active at a time </li>
        <li>Within process both execute sequential</li>
        <li>Both can create children </li>
      </ul>
      <h4>Difference between Threads and Processes </h4>
      <div className="table-responsive-md">
        <table className="table difftbl">
          <thead>
            <tr>
              <th>Processes</th>
              <th>Threads</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>An executing program is called process</td>
              <td>A thread is a small part of a process.</td>
            </tr>
            <tr>
              <td>Processes are heavy weight</td>
              <td>Threads are light weight</td>
            </tr>
            <tr>
              <td>A process has its own address space, global variables, child processes</td>
              <td>Threads have their own register, stack and counter</td>
            </tr>
            <tr>
              <td>It takes more time for context switching.</td>
              <td>It takes less time for context switching.</td>
            </tr>
            <tr>
              <td>Processes are isolated</td>
              <td>Threads share memory</td>
            </tr>
            <tr>
              <td>You are working on text editor it refers to the execution of a process.</td>
              <td>
                You are printing a file from text editor while working on it that resembles the
                execution of a thread in the process.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {uname === null ? (
        <></>
      ) : done === 'true' ? (
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
      )}
    </Container>
  );
};

export default Chap2;
