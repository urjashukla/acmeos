//DISK SCHEDULING
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
import clook from './../../../images/contentpage/C-LOOK.JPG';
import look from './../../../images/contentpage/LOOK.JPG';
import scan from './../../../images/contentpage/SCAN.JPG';
import cscan from './../../../images/contentpage/C-SCAN.JPG';

const Chap7 = () => {
  const id = 'c7';
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
          <h1>Disk Scheduling</h1>
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
        Disk scheduling is done by operating systems to schedule I/O requests arriving for the disk.{' '}
        <br />
        Disk scheduling is important because:
      </p>
      <ul>
        <li>
          {' '}
          Multiple I/O requests may arrive by different processes and only one I/O request can be
          served at a time by the disk controller. Thus other I/O requests need to wait in the
          waiting queue and need to be scheduled.{' '}
        </li>

        <li>
          Hard drives are one of the slowest parts of the computer system and thus need to be
          accessed in an efficient manner.
        </li>
      </ul>

      <h2>First Come First Serve (FCFS)</h2>

      <li>Jobs are executed on first come, first serve basis.</li>
      <li>It is a non-preemptive, pre-emptive scheduling algorithm.</li>
      <li>Easy to understand and implement.</li>
      <li>Its implementation is based on FIFO queue.</li>
      <li>Poor in performance as average wait time is high.</li>

      <p>
        Turn Around Time= Completion Time – Arrival Time
        <br />
        Waiting Time= TAT – Burst Time
      </p>

      <div class="table-responsive-md">
        <table class="table difftbl">
          <tr>
            <th>Process No.</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Completion Time</th>
            <th>Turn Around Time</th>
            <th>Waiting Time</th>
            <th>Round Time</th>
          </tr>
          <tr>
            <th>P0</th>
            <th>0</th>
            <th>2</th>
            <th>2</th>
            <th>2</th>
            <th>0</th>
            <th>0</th>
          </tr>
          <tr>
            <th>P1</th>
            <th>1</th>
            <th>2</th>
            <th>4</th>
            <th>3</th>
            <th>1</th>
            <th>1</th>
          </tr>
          <tr>
            <th>P2</th>
            <th>5</th>
            <th>3</th>
            <th>8</th>
            <th>3</th>
            <th>0</th>
            <th>0</th>
          </tr>
          <tr>
            <th>P3</th>
            <th>6</th>
            <th>4</th>
            <th>12</th>
            <th>6</th>
            <th>2</th>
            <th>2</th>
          </tr>
        </table>
      </div>
      <p>Queue: </p>
      <div class="table-responsive-md">
        <table class="table difftbl">
          <tr>
            <th>P0</th>
            <th>P1</th>
            <th>P2</th>
            <th>P3</th>
          </tr>
        </table>
      </div>
      <p>wait time of each process is as follows − Average Wait Time: (0+1+0+2) / 4 = 0.75</p>

      <h2>Shortest Job Next (SJN)</h2>

      <ul>
        <li>This is also known as shortest job first, or SJF</li>
        <li>This is a non-preemptive, pre-emptive scheduling algorithm.</li>
        <li>Best approach to minimize waiting time.</li>
        <li>Easy to implement in Batch systems where required CPU time is known in advance.</li>
        <li>
          Impossible to implement in interactive systems where required CPU time is not known.
        </li>
        <li>The processer should know in advance how much time process will take.</li>
      </ul>
      <p>Given: Table of processes, and their Arrival time, Execution time</p>

      <div class="table-responsive-md">
        <table class="table difftbl">
          <tr>
            <th>Process No.</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Completion Time</th>
            <th>Turn Around Time</th>
            <th>Waiting Time</th>
            <th>Round Time</th>
          </tr>
          <tr>
            <th>P0</th>
            <th>1</th>
            <th>3</th>
            <th>6</th>
            <th>5</th>
            <th>2</th>
            <th>2</th>
          </tr>
          <tr>
            <th>P1</th>
            <th>2</th>
            <th>4</th>
            <th>10</th>
            <th>8</th>
            <th>4</th>
            <th>4</th>
          </tr>
          <tr>
            <th>P2</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>2</th>
            <th>0</th>
            <th>0</th>
          </tr>
          <tr>
            <th>P3</th>
            <th>4</th>
            <th>4</th>
            <th>14</th>
            <th>10</th>
            <th>6</th>
            <th>6</th>
          </tr>
        </table>
      </div>
      <p>Queue: </p>
      <div class="table-responsive-md">
        <table class="table difftbl">
          <tr>
            <th>P2</th>
            <th>P0</th>
            <th>P1</th>
            <th>P3</th>
          </tr>
        </table>
      </div>
      <p>
        Waiting time of each process is as follows − Average Wait Time: (2+ 4 + 0 + 4)/4 =12 / 4 = 3
      </p>

      <h2>SCAN (Elevator) algorithm </h2>

      <ul>
        <li>
          Let Request array represents an array storing indexes of tracks that have been requested
          in ascending order of their time of arrival. ‘head’ is the position of disk head.
        </li>
        <li>Let direction represents whether the head is moving towards left or right.</li>
        <li>In the direction in which head is moving service all tracks one by one.</li>
        <li>Calculate the absolute distance of the track from the head.</li>
        <li>Increment the total seek count with this distance.</li>
        <li>Currently serviced track position now becomes the new head position.</li>
        <li>Go to step 3 until we reach at one of the ends of the disk.</li>
        <li>
          If we reach at the end of the disk reverse the direction and go to step 2 until all tracks
          in request array have not been serviced.
        </li>
      </ul>
      <p>
        Request Queue contains: <br />
        {`{82, 170, 43, 140, 24, 16, 190}`} <br />
        Current position of head= 50 <br />
        Direction: Right
      </p>
      <img src={scan} alt="Request queue" class="img-fluid" />
      <p>
        here total seek count is calculated as: <br />
        = (199-50)+(199-16) <br />= 332
      </p>

      <h2> C-SCAN (Circular Elevator) algorithm </h2>

      <ul>
        <li>
          Let Request array represents an array storing indexes of tracks that have been requested
          in ascending order of their time of arrival. ‘head’ is the position of disk head.
        </li>
        <li>The head services only in the right direction from 0 to the size of the disk.</li>
        <li>While moving in the left direction do not service any of the tracks.</li>
        <li>When we reach the beginning(left end) reverse the direction.</li>
        <li>While moving in the right direction it services all tracks one by one.</li>
        <li>
          While moving in the right direction calculate the absolute distance of the track from the
          head.
        </li>
        <li>Increment the total seek count with this distance.</li>
        <li>Currently serviced track position now becomes the new head position.</li>
        <li>Go to step 6 until we reach the right end of the disk.</li>
        <li>
          If we reach the right end of the disk reverse the direction and go to step 3 until all
          tracks in the request array have not been serviced.
        </li>
      </ul>

      <p>
        Request Queue contains: <br />
        {`{82, 170, 43, 140, 24, 16, 190}`} <br />
        Current position of head= 50 <br />
        Direction: Right
      </p>
      <img src={cscan} alt="Request queue" class="img-fluid" />
      <p>
        here total seek count is calculated as: <br />
        = (199-50)+(199-0)+(43-0) <br />= 391
      </p>

      <h2> LOOK Disk Scheduling algorithm </h2>

      <ul>
        <li>
          Let Request array represents an array storing indexes of tracks that have been requested
          in ascending order of their time of arrival. ‘head’ is the position of disk head.
        </li>
        <li>
          The initial direction in which head is moving is given and it services in the same
          direction.
        </li>
        <li>The head services all the requests one by one in the direction head is moving.</li>
        <li>
          The head continues to move in the same direction until all the request in this direction
          are finished.
        </li>
        <li>
          While moving in this direction calculate the absolute distance of the track from the head.
        </li>
        <li>Increment the total seek count with this distance.</li>
        <li>Currently serviced track position now becomes the new head position.</li>
        <li>Go to step 5 until we reach at last request in this direction.</li>
        <li>
          If we reach where no requests are needed to be serviced in this direction reverse the
          direction and go to step 3 until all tracks in request array have not been serviced.
        </li>
      </ul>

      <p>
        Request Queue contains: <br />
        {`{82, 170, 43, 140, 24, 16, 190}`} <br />
        Current position of head= 50 <br />
        Direction: Right
      </p>
      <img src={look} alt="Request queue" class="img-fluid" />
      <p>
        here total seek count is calculated as: <br />
        = (190-50)+(190-16) <br />= 314
      </p>
      <h2> C-LOOK Circular Disk Scheduling algorithm </h2>

      <ul>
        <li>
          Let Request array represents an array storing indexes of the tracks that have been
          requested in ascending order of their time of arrival and head is the position of the disk
          head.
        </li>
        <li>
          The initial direction in which the head is moving is given and it services in the same
          direction.
        </li>
        <li>The head services all the requests one by one in the direction it is moving.</li>
        <li>
          The head continues to move in the same direction until all the requests in this direction
          have been serviced.
        </li>
        <li>
          While moving in this direction, calculate the absolute distance of the tracks from the
          head.
        </li>
        <li>Increment the total seek count with this distance.</li>
        <li>Currently serviced track position now becomes the new head position.</li>
        <li>Go to step 5 until we reach the last request in this direction.</li>
        <li>
          If we reach the last request in the current direction then reverse the direction and move
          the head in this direction until we reach the last request that is needed to be serviced
          in this direction without servicing the intermediate requests.
        </li>
        <li>
          Reverse the direction and go to step 3 until all the requests have not been serviced.
        </li>
      </ul>

      <p>
        Request Queue contains: <br />
        {`{82, 170, 43, 140, 24, 16, 190}`} <br />
        Current position of head= 50 <br />
        Direction: Right
      </p>
      <img src={clook} alt="Request queue" class="img-fluid" />
      <p>
        here total seek count is calculated as: <br />
        = (190-50)+(190-16)+(43-16) <br />= 341
      </p>
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

export default Chap7;
