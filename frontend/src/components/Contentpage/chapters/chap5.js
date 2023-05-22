// Deadlock
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../css/chap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Content from '../../../util/Content';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import mutualexc from './../../../images/contentpage/mutualexc.png';
import holdwait from './../../../images/contentpage/holdwait.png';
import nopreemption from './../../../images/contentpage/nopreemption.png';
import circularwait from './../../../images/contentpage/circularwait.png';
import vertices from './../../../images/contentpage/vertices.png';
import edges from './../../../images/contentpage/edges.png';

const Chap5 = () => {
  const id = 'c5';
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
          <h1>Deadlock</h1>
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
        <dfn>Deadlock</dfn> is a situation where a set of processes are blocked because each process
        is holding a resource and waiting for another resource acquired by some other process.
      </p>

      <p>
        Let’s take an example when two trains are coming toward each other on the same track and
        there is only one track, none of the trains can move once they are in front of each other. A
        similar situation occurs in operating systems when there are two or more processes that hold
        some resources and wait for resources held by others.
      </p>
      <div className="terminal space shadow">
        <div className="top">
          <div className="btns">
            <span className="circle red"></span>
            <span className="circle yellow"></span>
            <span className="circle green"></span>
          </div>
          <div className="title">What is Deadlock?</div>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/eLytaqFkZoI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <h4>Deadlock Detection</h4>
      <ol>
        <li>
          <dfn>If resources have a single instance</dfn> - In this case for Deadlock detection, we
          can run an algorithm to check for the cycle in the Resource Allocation Graph. The presence
          of a cycle in the graph is a sufficient condition for deadlock.
        </li>
        <li>
          <dfn>If there are multiple instances of resources</dfn> - Detection of the cycle is
          necessary but not sufficient condition for deadlock detection, in this case, the system
          may or may not be in deadlock varies according to different situations.
        </li>
      </ol>
      <h4>Deadlock Prevention</h4>
      <h5>Mutual Exclusion</h5>
      <p>There should be a resource that can only be held by one process at a time.</p>
      <center>
        <img
          src={mutualexc}
          alt="Mutual Exclusion"
          style={{ padding: '50px', width: '80%', height: '10%' }}
        />
      </center>
      <h5>Hold and Wait</h5>
      <p>
        A process can hold multiple resources and still request more resources from other processes
        which are holding them. In the diagram given below, Process 2 holds Resource 2 and Resource
        3 and is requesting the Resource 1 which is held by Process 1.
      </p>
      <center>
        <img
          src={holdwait}
          alt="Hold and Wait"
          style={{ padding: '50px', width: '80%', height: '10%' }}
        />
      </center>
      <h5>No Preemption</h5>
      <p>
        A resource cannot be preempted from a process by force. A process can only release a
        resource voluntarily. In the diagram below, Process 2 cannot preempt Resource 1 from Process
        1. It will only be released when Process 1 relinquishes it voluntarily after its execution
        is complete.
      </p>
      <center>
        <img
          src={nopreemption}
          alt="No Preemption"
          style={{ padding: '50px', width: '80%', height: '10%' }}
        />
      </center>
      <h5>Circular Wait</h5>
      <p>
        A process is waiting for the resource held by the second process, which is waiting for the
        resource held by the third process and so on, till the last process is waiting for a
        resource held by the first process. This forms a circular chain. For example: Process 1 is
        allocated Resource2 and it is requesting Resource 1. Similarly, Process 2 is allocated
        Resource 1 and it is requesting Resource 2. This forms a circular wait loop.
      </p>
      <center>
        <img
          src={circularwait}
          alt="Circular Wait"
          style={{ padding: '50px', width: '80%', height: '10%' }}
        />
      </center>
      <h4>Deadlock Avoidance</h4>
      <p>Deadlock avoidance can be done with Banker’s Algorithm.</p>
      <h4>Banker’s Algorithm</h4>
      <p>
        Bankers’s Algorithm is resource allocation and deadlock avoidance algorithm which test all
        the request made by processes for resources, it checks for the safe state, if after granting
        request system remains in the safe state it allows the request and if there is no safe state
        it doesn’t allow the request made by the process.
      </p>
      <h4>Why Banker’s algorithm is named so?</h4>
      <p>
        Banker’s algorithm is named so because it is used in banking system to check whether loan
        can be sanctioned to a person or not. Suppose there are n number of account holders in a
        bank and the total sum of their money is S. If a person applies for a loan then the bank
        first subtracts the loan amount from the total money that bank has and if the remaining
        amount is greater than S then only the loan is sanctioned.
      </p>
      <p>
        In other words, the bank would never allocate its money in such a way that it can no longer
        satisfy the needs of all its customers. The bank would try to be in safe state always.
      </p>
      <h5>Inputs to Banker’s Algorithm: </h5>
      <ol>
        <li>Max need of resources by each process.</li>
        <li>Currently, allocated resources by each process</li>
        <li>Max free available resources in the system</li>
      </ol>
      <h5>The request will only be granted under the below condition:</h5>
      <ol>
        <li>If the request made by the process is less than equal to max need to that process.</li>
        <li>
          If the request made by the process is less than equal to the freely available resource in
          the system.
        </li>
      </ol>
      <p>Some data structures that are used to implement the banker's algorithm are:</p>

      <h6>
        1. <code>Available</code> :
      </h6>
      <p>
        It is an array of length <code>m</code>. It represents the number of available resources of
        each type. If <code>Available[j] = k</code>, then there are <code>k</code> instances
        available, of resource type <code>Rj</code>.
      </p>
      <h6>
        2. <code>Max</code> :
      </h6>
      <p>
        It is an <code>n x m</code> matrix which represents the maximum number of instances of each
        resource that a process can request. If <code>Max[i][j] = k</code>, then the process{' '}
        <code>Pi</code> can request atmost <code>k</code> instances of resource type <code>Rj</code>
        .
      </p>
      <h6>
        3. <code>Allocation</code> :
      </h6>
      <p>
        It is an <code>n x m</code> matrix which represents the number of resources of each type
        currently allocated to each process. If <code>Allocation[i][j] = k</code>, then process
        <code>Pi</code> is currently allocated <code>k</code> instances of resource type{' '}
        <code>Rj</code>.
      </p>
      <h6>
        4. <code>Need</code> :
      </h6>
      <p>
        It is a two-dimensional array. It is an <code>n x m</code> matrix which indicates the
        remaining resource needs of each process. If <code>Need[i][j] = k</code>, then process{' '}
        <code>Pi</code> may need
        <code>k</code> more instances of resource type <code>Rj</code> to complete its task.
        <code>Need[i][j] = Max[i][j] - Allocation [i][j]</code>
      </p>
      <h4>Resource Allocation Graph (RAG)</h4>
      <p>
        As Banker’s algorithm using some kind of table like allocation, request, available all that
        thing to understand what is the state of the system. Similarly, if you want to understand
        the state of the system instead of using those table, actually tables are very easy to
        represent and understand it, but then still you could even represent the same information in
        the graph. That graph is called <dfn>Resource Allocation Graph (RAG)</dfn>.
      </p>
      <p>
        So, resource allocation graph is explained to us what is the state of the system in terms of{' '}
        <code>processes and resources</code>. Like how many resources are available, how many are
        allocated and what is the request of each process. Everything can be represented in terms of
        the diagram.
      </p>
      <center>
        <img
          src={vertices}
          alt="RAG vertices"
          style={{ padding: '50px', width: '80%', height: '10%' }}
        />
      </center>

      <p>Now coming to the edges of RAG. There are two types of edges in RAG –</p>
      <center>
        <img src={edges} alt="RAG edges" style={{ padding: '50px', width: '80%', height: '10%' }} />
      </center>
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

export default Chap5;
