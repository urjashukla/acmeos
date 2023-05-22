// process scheduling
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../css/chap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Content from '../../../util/Content';
import scheduling from './../../../images/contentpage/scheduling.png';
import fcfs from './../../../images/contentpage/fcfs.png';
import sjfnp from './../../../images/contentpage/sjfnp.jpg';
import srt from './../../../images/contentpage/srt.png';
import rr from './../../../images/contentpage/rr.png';
import prio from './../../../images/contentpage/prio.png';
import rr1 from './../../../images/contentpage/rr1.png';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

const Chap3 = () => {
  const id = 'c3';
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
          <h1>Process Scheduling</h1>
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
      <h3>Process Schedulers in Operating System</h3>
      <p>
        The process scheduling is the activity of the process manager that handles the removal of
        the running process from the CPU and the selection of another process on the basis of a
        particular strategy.
      </p>
      <p>
        Process scheduling is an essential part of a Multiprogramming operating systems. Such
        operating systems allow more than one process to be loaded into the executable memory at a
        time and the loaded process shares the CPU using time multiplexing.
      </p>
      <h4>There are three types of process scheduler. </h4>
      <ol type="1">
        <li>Long Term Scheduler</li>
        <li> Short Term Scheduler</li>
        <li> Medium Term Scheduler</li>
      </ol>
      <h4>Long Term Scheduler</h4>
      <p>
        Long term scheduler is also known as a <code>job scheduler.</code> This scheduler regulates
        the program and select process from the queue and loads them into memory for execution. It
        also regulates the degree of multi-programing.
      </p>
      <p>
        However, the main goal of this type of scheduler is to offer a balanced mix of jobs, like
        Processor, I/O jobs., that allows managing multiprogramming.
      </p>
      <h4>Medium Term Scheduler</h4>
      <p>
        Medium-term scheduling is an important part of <code>swapping.</code> It enables you to
        handle the swapped out-processes. In this scheduler, a running process can become suspended,
        which makes an I/O request.
      </p>
      <p>
        A running process can become suspended if it makes an I/O request. A suspended processes
        can’t make any progress towards completion. In order to remove the process from memory and
        make space for other processes, the suspended process should be moved to secondary storage.
      </p>
      <h4>Short Term Scheduler</h4>
      <p>
        Short term scheduling is also known as <code>CPU scheduler.</code> The main goal of this
        scheduler is to boost the system performance according to set criteria. This helps you to
        select from a group of processes that are ready to execute and allocates CPU to one of them.
        The dispatcher gives control of the CPU to the process selected by the short term scheduler.
      </p>
      <div class="table-responsive-md">
        <table className="table difftbl">
          <thead>
            <tr>
              <th> Long term </th>
              <th>Short Term </th>
              <th>Medium term</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Long term is also known as job scheduler.</td>
              <td>Short term is also known as CPU scheduler.</td>
              <td>Medium term is also called as swapping scheduler.</td>
            </tr>
            <tr>
              <td>It is either absent or minimal in a time sharing system.</td>
              <td>It is insignificant in the time sharing order.</td>
              <td>This scheduler is an element of Time sharing system.</td>
            </tr>
            <tr>
              <td>Speed is less compared to the short term scheduler.</td>
              <td>Speed is the fastest compared to the short term and medium term scheduler.</td>
              <td>It offers medium speed.</td>
            </tr>
            <tr>
              <td>Allow you to select processes from the loads and pool back into the memory</td>
              <td>It only selects processes that is in a ready state of the execution.</td>
              <td>It helps you to send process back to the memory .</td>
            </tr>
            <tr>
              <td>Offers full control.</td>
              <td>Offers less control</td>
              <td>Reduce the level of multiprogramming.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Process Scheduling in Operating System</h3>
      <p>
        Process scheduling is an important part of multiprogramming operating systems. It is the
        process of removing the running task from the processor and selecting another task for
        processing. It schedules a process into different states like ready, waiting, and running.
      </p>
      <h4>Categories of Scheduling in OS</h4>
      <p>There are two categories of scheduling:</p>
      <ol type="1">
        <li>
          Non-preemptive: In non-preemptive, the resource can’t be taken from a process until the
          process completes execution. The switching of resources occurs when the running process
          terminates and moves to a waiting state.
        </li>
        <li>
          {' '}
          Preemptive: In preemptive scheduling, the OS allocates the resources to a process for a
          fixed amount of time. During resource allocation, the process switches from running state
          to ready state or from waiting state to ready state. This switching occurs as the CPU may
          give priority to other processes and replace the process with higher priority with the
          running process.
        </li>
      </ol>
      <img src={scheduling} style={{ padding: '50px', width: '100%', height: '10%' }} />
      <h4>Important CPU scheduling Terminologies</h4>
      <ul>
        <li>
          Burst Time/Execution Time: It is a time required by the process to complete execution. It
          is also called running time.{' '}
        </li>
        <li>Arrival Time: when a process enters in a ready state</li>
        <li>Finish Time: when process complete and exit from a system </li>
        <li>
          {' '}
          Multiprogramming: A number of programs which can be present in memory at the same time.{' '}
        </li>
        <li>Jobs: It is a type of program without any kind of user interaction. </li>
        <li> User: It is a kind of program having user interaction.</li>
        <li>Process: It is the reference that is used for both job and user.</li>
        <li>
          {' '}
          CPU/IO burst cycle: Characterizes process execution, which alternates between CPU and I/O
          activity. CPU times are usually shorter than the time of I/O.
        </li>
        <li>
          {' '}
          The waiting time and Turnaround time are calculated with the help of the following
          formula.
          <br />
          Waiting Time = Turnaround time – Burst Time
          <br />
          Turnaround Time = Completion time – Arrival time
        </li>
        <h4>There are mainly five types of process scheduling algorithms</h4>
        <ol type="1">
          <li>First Come First Serve (FCFS)</li>
          <li>Shortest-Job-First (SJF) Scheduling</li>
          <li>Shortest Remaining Time first</li>
          <li>Priority Scheduling</li>
          <li>Round Robin Scheduling</li>
        </ol>
        <br />
        <h4 style={{ color: 'red' }}>First Come First Serve</h4>
        <p>
          First Come First Serve is the full form of FCFS. It is the easiest and most simple CPU
          scheduling algorithm. In this type of algorithm, the process which requests the CPU gets
          the CPU allocation first. This scheduling method can be managed with a FIFO queue. As the
          process enters the ready queue, its PCB (Process Control Block) is linked with the tail of
          the queue. So, when CPU becomes free, it should be assigned to the process at the
          beginning of the queue.
        </p>
        <h4>Example of FCFS Scheduling</h4>
        <p>
          In the following example, we have 4 processes with process ID P0, P1, P2, and P3. The
          arrival time of P0 is 0, P1 is 1, P2 is 2, and P3 is 3. The arrival time and burst time of
          the processes are given in the following table.
        </p>
      </ul>
      <div class="table-responsive-md">
        <table className="table difftbl">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Arrival time</th>
              <th>Burst time</th>
              <th>Completion time</th>
              <th>Turnaroundtime</th>
              <th>Waiting time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P0</td>
              <td>0</td>
              <td>6</td>
              <td>6</td>
              <td>6</td>
              <td>0</td>
            </tr>
            <tr>
              <td>P1</td>
              <td>1</td>
              <td>8</td>
              <td>14</td>
              <td>13</td>
              <td>5</td>
            </tr>
            <tr>
              <td>P2</td>
              <td>2</td>
              <td>10</td>
              <td>24</td>
              <td>22</td>
              <td>12</td>
            </tr>
            <tr>
              <td>P3</td>
              <td>3</td>
              <td>12</td>
              <td>36</td>
              <td>33</td>
              <td>21</td>
            </tr>
          </tbody>
        </table>
      </div>
      <img alt='First Come First Serve' src={fcfs} style={{ padding: '50px', width: '100%', height: '1%' }} />
      <p>Average Waiting Time = 0+5+12+21/4 = 38/4 = 9.5 ms</p>
      <p>Average Turnaround Time = 6+13+22+33/4 =74/4 = 18.5 ms</p>
      <div className="terminal space shadow">
        <div className="top">
          <div className="btns">
            <span className="circle red"></span>
            <span className="circle yellow"></span>
            <span className="circle green"></span>
          </div>
          <div className="title">First Come First Serve</div>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/s6ASd9cwpN8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <h4 style={{ color: 'red' }}>Shortest job first(non preemptive)</h4>
      <p>
        Shortest Job First is a Preemptive or Non-Preemptive algorithm. In the shortest job first
        algorithm, the job having shortest or less burst time will get the CPU first. It is the best
        approach to minimize the waiting time. It is simple to implement in the batch operating
        system because in this CPU time is known in advance, but it is not used in interactive
        systems, because in interactive systems, CPU time is not known.
      </p>
      <h4>Characteristics of Shortest Job First Scheduling</h4>
      <ul type="none">
        <li>
          1. SJF algorithm is helpful in batch operating where the waiting time for job completion
          is not critical.
        </li>
        <li>
          2. SJF improves the throughput of the process by ensuring that the shorter jobs are
          executed first, thus the possibility of less turnaround time.
        </li>
        <li>
          3. SJF enhances the output of the job by executing the process, which is having the
          shortest burst time.
        </li>
      </ul>
      <h4>Example of Non-Preemptive SJF Scheduling:</h4>
      <p>
        In the following example, we have 4 processes with process Id P0, P1, P2, and P3. The
        arrival time and burst time of the processes are given in the following table.
      </p>
      <div class="table-responsive-md">
        <table className="table difftbl">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Arrival time</th>
              <th>Burst time</th>
              <th>Completion time</th>
              <th>Turnaroundtime</th>
              <th>Waiting time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P0</td>
              <td>8</td>
              <td>5</td>
              <td>21</td>
              <td>8</td>
              <td>16</td>
            </tr>
            <tr>
              <td>P1</td>
              <td>5</td>
              <td>0</td>
              <td>5</td>
              <td>0</td>
              <td>5</td>
            </tr>

            <tr>
              <td>P2</td>
              <td>9</td>
              <td>4</td>
              <td>16</td>
              <td>3</td>
              <td>12</td>
            </tr>
            <tr>
              <td>P3</td>
              <td>2</td>
              <td>10</td>
              <td>24</td>
              <td>22</td>
              <td>12</td>
            </tr>
          </tbody>
        </table>
      </div>
      <img alt='Shortest Job First Non Preemptive' src={sjfnp} style={{ padding: '50px', width: '100%', height: '10%' }} />
      <p>Average waiting time= 2+0+11+4/4 =4.25</p>
      <p>Average turnaround time=10+5+20+6/4 =10.25</p>
      <div className="terminal space shadow">
        <div className="top">
          <div className="btns">
            <span className="circle red"></span>
            <span className="circle yellow"></span>
            <span className="circle green"></span>
          </div>
          <div className="title">SJF Non-preemptive</div>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/6nvRkZSlTgI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <h4 style={{ color: 'red' }}>Shortest Remaining Time (SJF-preemptive)</h4>
      <p>
        The full form of SRT is Shortest remaining time. It is also known as SJF preemptive
        scheduling. In this method, the process will be allocated to the task, which is closest to
        its completion. This method prevents a newer ready state process from holding the completion
        of an older process.
      </p>
      <p>
        In this, jobs are moved into the ready queue when they arrive. Those Processes which have
        less burst time begins its execution first. When the process with less burst time arrives,
        then the current process stops execution, and the process having less burst time is
        allocated with the CPU first.
      </p>
      <h4>Characteristics of SRT scheduling method:</h4>
      <ul>
        <li>
          This method is mostly applied in batch environments where short jobs are required to be
          given preference.
        </li>
        <li>
          This is not an ideal method to implement it in a shared system where the required CPU time
          is unknown.
        </li>
        <li>
          Associate with each process as the length of its next CPU burst. So that operating system
          uses these lengths, which helps to schedule the process with the shortest possible time.
        </li>
      </ul>
      <h4>Example of Preemptive SJF Scheduling:</h4>
      <p>
        In the following example, we have 4 processes with process ID P1, P2, P3, and P4. The
        arrival time and burst time of the processes are given in the following table.
      </p>
      <div class="table-responsive-md">
        <table className="table difftbl">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Arrival time</th>
              <th>Burst time</th>
              <th>Completion time</th>
              <th>Turnaroundtime</th>
              <th>Waiting time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1</td>
              <td>18</td>
              <td>0</td>
              <td>31</td>
              <td>31</td>
              <td>13</td>
            </tr>
            <tr>
              <td>P2</td>
              <td>4</td>
              <td>1</td>
              <td>5</td>
              <td>4</td>
              <td>0</td>
            </tr>
            <tr>
              <td>p3</td>
              <td>7</td>
              <td>2</td>
              <td>14</td>
              <td>12</td>
              <td>5</td>
            </tr>

            <tr>
              <td>P4</td>
              <td>2</td>
              <td>3</td>
              <td>7</td>
              <td>4</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>The GANTT chart of preemptive shortest job first scheduling is:</p>
      <img alt='Shortest Remaining Time' src={srt} style={{ padding: '50px', width: '100%', height: '5%' }} />
      <p>Average waiting time= 13+0+5+2/4 =20</p>
      <p>Average turnaround time= 31+4+12+4/4 =12.75</p>
      <div className="terminal space shadow">
        <div className="top">
          <div className="btns">
            <span className="circle red"></span>
            <span className="circle yellow"></span>
            <span className="circle green"></span>
          </div>
          <div className="title">SJF preemptive</div>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/SkgfGaySxvE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <h4 style={{ color: 'red' }}>Priority Scheduling(non-preemptive)</h4>
      <p>
        Priority Scheduling is a method of scheduling processes that is based on priority. In this
        algorithm, the scheduler selects the tasks to work as per the priority.
      </p>
      <p>
        The processes with higher priority should be carried out first, whereas jobs with equal
        priorities are carried out on a round-robin or FCFS basis. Priority depends upon memory
        requirements, time requirements, etc.
      </p>
      <h4>Characteristics of Priority Scheduling</h4>
      <ul>
        <li> A CPU algorithm that schedules processes based on priority.</li>
        <li> It used in Operating systems for performing batch processes.</li>
        <li>
          {' '}
          If two jobs having the same priority are READY, it works on a FIRST COME, FIRST SERVED
          basis.
        </li>
        <li>
          In priority scheduling, a number is assigned to each process that indicates its priority
          level.
        </li>
        <li> Lower the number, higher is the priority.</li>
        <li>
          In this type of scheduling algorithm, if a newer process arrives, that is having a higher
          priority than the currently running process, then the currently running process is
          preempted.
        </li>
      </ul>
      <h4>Example of Priority Scheduling</h4>
      <p>
        Consider following five processes P1 to P5. Each process has its unique priority, burst
        time, and arrival time.
      </p>
      <div class="table-responsive-md">
        <table className="table difftbl">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Burst time</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1</td>
              <td>21</td>
              <td>2</td>
            </tr>
            <tr>
              <td>P2</td>
              <td>3</td>
              <td>1</td>
            </tr>
            <tr>
              <td>p3</td>
              <td>6</td>
              <td>4</td>
            </tr>

            <tr>
              <td>P4</td>
              <td>2</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>The GANTT chart of priority scheduling is:</p>
      <img alt='Priority Scheduling' src={prio} style={{ padding: '50px', width: '100%', height: '10%' }} />
      <p>The average waiting time will be 0+3+24+26/4</p>
      <p>12.25ms</p>
      <p>
        As you can see in the GANTT chart that the processes are given CPU time just on the basis of
        the prioritiy
      </p>
      <div className="terminal space shadow">
        <div className="top">
          <div className="btns">
            <span className="circle red"></span>
            <span className="circle yellow"></span>
            <span className="circle green"></span>
          </div>
          <div className="title">Priority Scheduling</div>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/gYUqrCnB-6g"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <h4 style={{ color: 'red' }}>Round Robin Scheduling Algorithm</h4>
      <p>
        In Round-robin scheduling, each ready task runs turn by turn only in a cyclic queue for a
        limited time slice. This algorithm also offers starvation free execution of processes. Here
        are the important characteristics of Round-Robin Scheduling:
      </p>

      <ul>
        <li>Round robin is a pre-emptive algorithm</li>
        <li>
          The CPU is shifted to the next process after fixed interval time, which is called time
          quantum/time slice.
        </li>
        <li> The process that is preempted is added to the end of the queue.</li>
        <li> Round robin is a hybrid model which is clock-driven</li>
        <li>
          Time slice should be minimum, which is assigned for a specific task that needs to be
          processed. However, it may differ OS to OS.
        </li>
        <li>
          {' '}
          It is a real time algorithm which responds to the event within a specific time limit.
        </li>
        <li>Round robin is one of the oldest, fairest, and easiest algorithm.</li>
        <li> Widely used scheduling method in traditional OS.</li>
      </ul>
      <img alt='Round Robin' src={rr} style={{ padding: '50px', width: '100%', height: '500px' }} />
      <h2>Let us now cover an example for the same:</h2>
      <p>Assume there are 5 processes with process ID and burst time given below</p>
      <div class="table-responsive-md">
        <table className="table difftbl">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Burst time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1</td>
              <td>6</td>
            </tr>
            <tr>
              <td>P2</td>
              <td>5</td>
            </tr>
            <tr>
              <td>p3</td>
              <td>2</td>
            </tr>

            <tr>
              <td>P4</td>

              <td>3</td>
            </tr>
            <tr>
              <td>7</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5>Time quantum: 2</h5>
      <h5>Assume that all process arrives at 0.</h5>
      <p>Now, we will calculate average waiting time for these processes to complete.</p>
      <h5>Solution –</h5>
      <p>We can represent execution of above processes using GANTT chart as shown below –</p>
      <img alt='Gantt Chart' src={rr1} style={{ padding: '50px', width: '100%', height: '10%' }} />
      <h5>Explanation:</h5>
      <p>
        – First p1 process is picked from the ready queue and executes for 2 per unit time (time
        slice = 2). If arrival time is not available, it behaves like FCFS with time slice.
      </p>
      <p>
        – After P2 is executed for 2 per unit time, P3 is picked up from the ready queue. Since P3
        burst time is 2 so it will finish the process execution at once.
      </p>
      <p>
        – Like P1 and P2 process execution, P4 and p5 will execute 2 time slices and then again it
        will start from P1 same as above.
      </p>
      <p>Waiting time = Turn Around Time – Burst Time</p>
      <p> P1 = 19 – 6 = 13</p>
      <p>P2 = 20 – 5 = 15</p>
      <p>P3 = 6 – 2 = 4</p>
      <p>P4 = 15 – 3 = 12</p>
      <p>P5 = 23 – 7 = 16</p>
      <p>Average waiting time = (13+15+4+12+16) / 5 = 12</p>
      <div className="terminal space shadow">
        <div className="top">
          <div className="btns">
            <span className="circle red"></span>
            <span className="circle yellow"></span>
            <span className="circle green"></span>
          </div>
          <div className="title">Round Robin Scheduling</div>
        </div>
        <div className="video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/UJSs8qxnJ8c"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
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

export default Chap3;
