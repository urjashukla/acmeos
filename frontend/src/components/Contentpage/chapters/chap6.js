// Memory management
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
import flow from './../../../images/contentpage/flow.png';
import mem from './../../../images/contentpage/mem.png';
import f from './../../../images/contentpage/f.jpg';

const Chap6 = () => {
  const id = 'c6';
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
          <h1>Memory Management</h1>
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
        Memory is the important part of the computer that is used to store the data. Its management
        is critical to the computer system because the amount of main memory available in a computer
        system is very limited. At any time, many processes are competing for it. Moreover, to
        increase performance, several processes are executed simultaneously. For this, we must keep
        several processes in the main memory, so it is even more important to manage them
        effectively.
      </p>
      <h4>Memory management plays several roles in a computer system.</h4>
      <p>Following are the important roles in a computer system:</p>

      <ul>
        <li>
          {' '}
          Memory manager is used to keep track of the status of memory locations, whether it is free
          or allocated. It addresses primary memory by providing abstractions so that software
          perceives a large memory is allocated to it.
        </li>
        <li>
          Memory manager permits computers with a small amount of main memory to execute programs
          larger than the size or amount of available memory. It does this by moving information
          back and forth between primary memory and secondary memory by using the concept of
          swapping.
        </li>
        <li>
          The memory manager is responsible for protecting the memory allocated to each process from
          being corrupted by another process. If this is not ensured, then the system may exhibit
          unpredictable behavior.{' '}
        </li>
        <li>
          {' '}
          emory managers should enable sharing of memory space between processes. Thus, two programs
          can reside at the same memory location although at different times.
        </li>
      </ul>
      <h4>Memory management Techniques:</h4>
      <p>The Memory management Techniques can be classified into following main categories:</p>
      <ul>
        <li>Contiguous memory management schemes</li>
        <li>Non-Contiguous memory management schemes</li>
      </ul>
      <img
        src={flow}
        alt="Memory management scheme classification"
        style={{ padding: '50px', width: '100%', height: '500px' }}
      />
      <h4>Fragmentation</h4>
      <p>
        As processes are loaded and removed from memory, the free memory space is broken into little
        pieces. It happens after sometimes that processes cannot be allocated to memory blocks
        considering their small size and memory blocks remains unused. This problem is known as
        Fragmentation.
      </p>
      <p>
        <b>Fragmentation is of two types −</b>
      </p>
      <ol type="1">
        <li>
          External fragmentation- Total memory space is enough to satisfy a request or to reside a
          process in it, but it is not contiguous, so it cannot be used.
        </li>
        <li>
          Internal fragmentation Memory block assigned to process is bigger. Some portion of memory
          is left unused, as it cannot be used by another process.
        </li>
      </ol>
      <p>
        The following diagram shows how fragmentation can cause waste of memory and a compaction
        technique can be used to create more free memory out of fragmented memory −
      </p>
      <img
        src={f}
        alt="Compaction technique"
        style={{ padding: '50px', width: '100%', height: '400px' }}
      />
      <p>
        External fragmentation can be reduced by compaction or shuffle memory contents to place all
        free memory together in one large block. To make compaction feasible, relocation should be
        dynamic.
      </p>
      <p>
        The internal fragmentation can be reduced by effectively assigning the smallest partition
        but large enough for the process.
      </p>
      <h4>Paging</h4>
      <p>
        Paging is a storage mechanism that allows OS to retrieve processes from the secondary
        storage into the main memory in the form of pages. In the Paging method, the main memory is
        divided into small fixed-size blocks of physical memory, which is called frames. The size of
        a frame should be kept the same as that of a page to have maximum utilization of the main
        memory and to avoid external fragmentation. Paging is used for faster access to data, and it
        is a logical concept.
      </p>
      <h4>Example of Paging</h4>
      <p>
        For example, if the main memory size is 16 KB and Frame size is 1 KB. Here, the main memory
        will be divided into the collection of 16 frames of 1 KB each.
      </p>
      <p>
        There are 4 separate processes in the system that is A1, A2, A3, and A4 of 4 KB each. Here,
        all the processes are divided into pages of 1 KB each so that operating system can store one
        page in one frame.
      </p>
      <p>
        At the beginning of the process, all the frames remain empty so that all the pages of the
        processes will get stored in a contiguous way.
      </p>
      <img src={mem} alt="Paging" style={{ padding: '50px', width: '100%', height: '500px' }} />
      <p>
        In this example you can see that A2 and A4 are moved to the waiting state after some time.
        Therefore, eight frames become empty, and so other pages can be loaded in that empty blocks.
        The process A5 of size 8 pages (8 KB) are waiting in the ready queue.
      </p>
      <h4>Advantages of Paging</h4>
      <ul>
        <li>Easy to use memory management algorithm</li>
        <li> No need for external Fragmentation</li>
        <li> Swapping is easy between equal-sized pages and page frames.</li>
      </ul>
      <h4>Disadvantages of Paging</h4>
      <ul>
        <li>May cause Internal fragmentation</li>
        <li>Page tables consume additonal memory.</li>
        <li> Multi-level paging may lead to memory reference overhead.</li>
      </ul>
      <h4>Page Replacement Algorithms</h4>
      <p>
        The page replacement algorithm decides which memory page is to be replaced. The process of
        replacement is sometimes called swap out or write to disk. Page replacement is done when the
        requested page is not found in the main memory (page fault.
      </p>
      <h4>Types of Page Replacement Algorithms</h4>
      <p>
        There are various page replacement algorithms. Each algorithm has a different method by
        which the pages can be replaced.
      </p>
      <ol type="1">
        <li>
          <b> Optimal Page Replacement algorithm →</b> this algorithms replaces the page which will
          not be referred for so long in future. Although it can not be practically implementable
          but it can be used as a benchmark. Other algorithms are compared to this in terms of
          optimality.
        </li>
        <li>
          <b> Least recent used (LRU) page replacement algorithm → </b>this algorithm replaces the
          page which has not been referred for a long time. This algorithm is just opposite to the
          optimal page replacement algorithm. In this, we look at the past instead of staring at
          future.
        </li>
        <li>
          <b> FIFO → </b>in this algorithm, a queue is maintained. The page which is assigned the
          frame first will be replaced first. In other words, the page which resides at the rare end
          of the queue will be replaced on the every page fault
        </li>
      </ol>
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

export default Chap6;
