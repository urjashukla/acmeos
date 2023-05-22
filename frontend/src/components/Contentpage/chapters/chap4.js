// Process Synchronization
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../css/chap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Content from "../../../util/Content";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import procesyn from "./../../../images/contentpage/procesyn.png";
import semaphore from "./../../../images/contentpage/semaphore.png";
import snippet1 from "./../../../images/contentpage/snippet1.png";
import snippet2 from "./../../../images/contentpage/snippet2.png";
import snippet3 from "./../../../images/contentpage/snippet3.png";
import snippet4 from "./../../../images/contentpage/snippet4.png";
import snippet5 from "./../../../images/contentpage/snippet5.png";
import snippet6 from "./../../../images/contentpage/snippet6.png";
import snippet7 from "./../../../images/contentpage/snippet7.png";

const Chap4 = () => {
  const id = "c4";
  const uname = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [selected, setSelected] = useState("");
  const [done, setDone] = useState(
    new URLSearchParams(useLocation().search).get("completed")
  );

  let bookmarked;
  if (uname) {
    bookmarked = JSON.parse(localStorage.getItem("bookmarks")).find(
      (chap) => chap.chapterid === id
    );
  }
  useEffect(() => {
    if (bookmarked === undefined) {
      setSelected("fa fa-bookmark-o");
    } else {
      setSelected("fa fa-bookmark");
    }
  }, []);

  const toggleSelected = () => {
    let options = {
      username: uname.username,
      chapid: id,
    };
    if (selected === "fa fa-bookmark") {
      // Remove bookmark
      setSelected("fa fa-bookmark-o");
      bookmarked = JSON.parse(localStorage.getItem("bookmarks")).find(
        (chap) => chap.chapterid === id
      );
      axios
        .delete("http://localhost:9000/bookmark/" + `${bookmarked.bookmarksid}`)
        .then((res) => {
          let bomks = JSON.parse(localStorage.getItem("bookmarks"));
          bomks.pop(); // As newly added bookmark would be at the end of array
          localStorage.setItem("bookmarks", JSON.stringify(bomks));
        })
        .catch((error) => {
          console.log("Axios remove bookmark Error");
          console.log(error);
        });
    } else {
      // Add bookmark
      setSelected("fa fa-bookmark");
      axios
        .post("http://localhost:9000/bookmark", options)
        .then((res) => {
          Content.getBookmarkID(id);
        })
        .catch((error) => {
          console.log("Axios Error");
          console.log(error);
        });
    }
  };
  return (
    <Container className="p-4 content">
      <Row>
        <Col xs={11}>
          <h1>Process Synchronization</h1>
        </Col>
        <Col xs={1}>
          {uname === null ? (
            <></>
          ) : (
            <i
              className={selected}
              aria-hidden="true"
              onClick={toggleSelected}
              style={{ cursor: "pointer", fontSize: "xx-large" }}
            ></i>
          )}
        </Col>
      </Row>
      <p>
        <dfn>Process synchronization</dfn> is basically a way to coordinate
        processes that use shared resources or data. Its main purpose is to
        share resources without any interference using mutual exclusion.
      </p>
      <center>
        <img
          src={procesyn}
          alt='Process Synchronization'
          style={{ padding: "50px", width: "80%", height: "10%" }}
        />
      </center>
      <h4>The Critical-Section Problem</h4>
      <p>
        The important feature of the system is that, when one process is
        executing in its critical section, no other process is allowed to
        execute in its critical section. That is, no two processes are executing
        in their critical sections at the same time. The
        <dfn>critical-section problem</dfn> is to design a protocol that the
        processes can use to cooperate. Each process must request permission to
        enter its critical section. The section of code implementing this
        request is the entry section. The critical section may be followed by an
        exit section. The remaining code is the remainder section.
      </p>
      <p>
        A solution to the critical-section problem must satisfy the following
        three requirements:
      </p>
      <ol>
        <li>
          <code>Mutual exclusion</code>: If process Pi is executing in its
          critical section, then no other processes can be executing in their
          critical sections.
        </li>
        <li>
          <code>Progress</code>: If no process is executing in its critical
          section and some processes wish to enter their critical sections, then
          only those processes that are not executing in their remainder
          sections can participate in deciding which will enter its critical
          section next, and this selection cannot be postponed indefinitely.
        </li>
        <li>
          <code>Bounded waiting</code>: There exists a bound, or limit, on the
          number of times that other processes are allowed to enter their
          critical sections after a process has made a request to enter its
          critical section and before that request is granted.
        </li>
      </ol>
      <h4>IPC</h4>
      <p>
        <dfn>Inter-process communication</dfn> (IPC) is a mechanism that allows
        processes to communicate with each other and synchronize their actions.
      </p>
      <h4>Semaphores</h4>
      <p>
        Semaphore was proposed by Dijkstra in 1965 which is a very significant
        technique to manage concurrent processes by using a simple integer
        value, which is known as a semaphore.
      </p>
      <p>
        <dfn>Semaphore</dfn> is simply an integer variable that is shared
        between threads. This variable is used to solve the critical section
        problem and to achieve process synchronization in the multiprocessing
        environment.
      </p>
      <center>
        <img
          src={semaphore}
          alt='Semaphore'
          style={{ padding: "50px", width: "80%", height: "10%" }}
        />
      </center>
      <p>
        A semaphore S is an integer variable that, apart from initialization, is
        accessed only through two standard atomic operations:
        <code>wait()</code> and
        <code>signal()</code>. The wait() operation was originally termed P
        (from the Dutch proberen, “to test”); signal() was originally called V
        (from verhogen, “to increment”).
      </p>
      <p>The definition of wait() is as follows:</p>
      <center>
        <img
          src={snippet1}
          alt='Wait function'
          style={{ padding: "50px", width: "45%", height: "10%" }}
        />
      </center>

      <p>The definition of signal() is as follows:</p>
      <center>
        <img
          src={snippet2}
          alt='Signal function'
          style={{ padding: "50px", width: "38%", height: "10%" }}
        />
      </center>
      <h3>
        <u>Classic Synchronization Problems</u>
      </h3>
      <h4>Dining Philosopher:</h4>
      <center>
        <img
          src={snippet3}
          alt='Dining Philosopher'
          style={{ padding: "50px", width: "50%", height: "10%" }}
        />
      </center>
      <div className="terminal space shadow">
        <div className="top">
          <div className="btns">
            <span className="circle red"></span>
            <span className="circle yellow"></span>
            <span className="circle green"></span>
          </div>
          <div className="title">Dining Philosopher</div>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/OgQkQNMJD6A"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p>
        Semaphores can result in deadlock due to programming errors. Some ways
        to avoid deadlock are:
      </p>
      <ol>
        <li>Don't allow all philosophers to sit and eat/think at once.</li>
        <li>Pick up both chopsticks in a critical section.</li>
        <li>Alternate choice of first chopstick.</li>
      </ol>
      <h4>Producer Consumer:</h4>
      <div className="terminal space shadow">
        <div className="top">
          <div className="btns">
            <span className="circle red"></span>
            <span className="circle yellow"></span>
            <span className="circle green"></span>
          </div>
          <div className="title">Producer Consumer</div>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/W_jW4GnvCBw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p>
        The producer consumer problem is a synchronization problem. There is a
        fixed size buffer and the producer produces items and enters them into
        the buffer. The consumer removes the items from the buffer and consumes
        them.
      </p>
      <p>
        A producer should not produce items into the buffer when the consumer is
        consuming an item from the buffer and vice versa. So the buffer should
        only be accessed by the producer or consumer at a time.
      </p>
      <h5>Producer Process</h5>
      <p>The code that defines the producer process is given below,</p>
      <center>
        <img
          src={snippet4}
          alt='Producer process'
          style={{ padding: "50px", width: "45%", height: "10%" }}
        />
      </center>
      <p>
        In the above code, mutex, empty and full are semaphores. Here mutex is
        initialized to 1, empty is initialized to n (maximum size of the buffer)
        and full is initialized to 0.
      </p>
      <p>
        The mutex semaphore ensures mutual exclusion. The empty and full
        semaphores count the number of empty and full spaces in the buffer.
      </p>
      <p>
        After the item is produced, wait operation is carried out on empty. This
        indicates that the empty space in the buffer has decreased by 1. Then
        wait operation is carried out on mutex so that consumer process cannot
        interfere.
      </p>
      <p>
        After the item is put in the buffer, signal operation is carried out on
        mutex and full. The former indicates that consumer process can now act
        and the latter shows that the buffer is full by 1.
      </p>
      <h5>Consumer Process</h5>
      <p>The code that defines the consumer process is given below,</p>
      <center>
        <img
          src={snippet5}
          alt='Consumer process'
          style={{ padding: "50px", width: "45%", height: "10%" }}
        />
      </center>
      <p>
        The wait operation is carried out on full. This indicates that items in
        the buffer have decreased by 1. Then wait operation is carried out on
        mutex so that producer process cannot interfere.
      </p>
      <p>
        Then the item is removed from buffer. After that, signal operation is
        carried out on mutex and empty. The former indicates that consumer
        process can now act and the latter shows that the empty space in the
        buffer has increased by 1.
      </p>
      <h4>Reader Writer:</h4>
      <div className="terminal space shadow">
        <div className="top">
          <div className="btns">
            <span className="circle red"></span>
            <span className="circle yellow"></span>
            <span className="circle green"></span>
          </div>
          <div className="title">Reader Writer</div>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/X9dyoOEoZKs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <h5>Reader Process</h5>
      <p>The code that defines the reader process is given below,</p>
      <center>
        <img
          src={snippet6}
          alt='Reader process'
          style={{ padding: "50px", width: "45%", height: "10%" }}
        />
      </center>
      <p>
        In the above code, mutex and wrt are semaphores that are initialized to
        1. Also, rc is a variable that is initialized to 0. The mutex semaphore
        ensures mutual exclusion and wrt handles the writing mechanism and is
        common to the reader and writer process code.
      </p>
      <p>
        The variable rc denotes the number of readers accessing the object. As
        soon as rc becomes 1, wait operation is used on wrt. This means that a
        writer cannot access the object anymore. After the read operation is
        done, rc is decremented. When re becomes 0, signal operation is used on
        wrt. So a writer can access the object now.
      </p>
      <h5>Writer Process</h5>
      <p>The code that defines the writer process is given below,</p>
      <center>
        <img
          src={snippet7}
          alt='Writer process'
          style={{ padding: "50px", width: "45%", height: "10%" }}
        />
      </center>
      <p>
        If a writer wants to access the object, wait operation is performed on
        wrt. After that no other writer can access the object. When a writer is
        done writing into the object, signal operation is performed on wrt.
      </p>
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

export default Chap4;
