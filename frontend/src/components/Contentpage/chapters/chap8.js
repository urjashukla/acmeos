// UNIX commands
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

const Chap8 = () => {
  const id = 'c8';
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
          <h1>UNIX Commands</h1>
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
      <h2>Files and Directories</h2>

      <div class="table-responsive-md">
        <table class="table difftbl">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Command &amp; Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>cat : Displays File Contents</th>
            </tr>
            <tr>
              <th>2</th>
              <th>cd : Changes Directory to dirname</th>
            </tr>
            <tr>
              <th>3</th>
              <th>chgrp : Changes file group</th>
            </tr>
            <tr>
              <th>4</th>
              <th>chmod : Changes permissions</th>
            </tr>
            <tr>
              <th>5</th>
              <th>cp : Copies source file into destination</th>
            </tr>
            <tr>
              <th>6</th>
              <th>file : Determines file type</th>
            </tr>
            <tr>
              <th>7</th>
              <th>find : Finds files</th>
            </tr>
            <tr>
              <th>8</th>
              <th>grep : Searches files for regular expressions</th>
            </tr>
            <tr>
              <th>9</th>
              <th>head : Displays first few lines of a file</th>
            </tr>
            <tr>
              <th>10</th>
              <th>ln : Creates softlink on oldname</th>
            </tr>
            <tr>
              <th>11</th>
              <th>ls : Displays information about file type</th>
            </tr>
            <tr>
              <th>12</th>
              <th>mkdir : Creates a new directory dirname</th>
            </tr>
            <tr>
              <th>13</th>
              <th>more : Displays data in paginated form</th>
            </tr>
            <tr>
              <th>14</th>
              <th>mv : Moves (Renames) an oldname to newname</th>
            </tr>
            <tr>
              <th>15</th>
              <th>pwd : Prints current working directory</th>
            </tr>
            <tr>
              <th>16</th>
              <th>rm : Removes (Deletes) filename</th>
            </tr>
            <tr>
              <th>17</th>
              <th>rmdir : Deletes an existing directory provided it is empty</th>
            </tr>
            <tr>
              <th>18</th>
              <th>tail : Prints last few lines in a file</th>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Manipulating Data</h2>

      <div class="table-responsive-md">
        <table class="table difftbl">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Command &amp; Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>awk : Pattern scanning and processing language</th>
            </tr>
            <tr>
              <th>2</th>
              <th>cmp : Compares the contents of two files</th>
            </tr>
            <tr>
              <th>3</th>
              <th>comm : Compares sorted data</th>
            </tr>
            <tr>
              <th>4</th>
              <th>cut : Cuts out selected fields of each line of a file</th>
            </tr>
            <tr>
              <th>5</th>
              <th>diff : Differential file comparator</th>
            </tr>
            <tr>
              <th>6</th>
              <th>expand : Expands tabs to spaces</th>
            </tr>
            <tr>
              <th>7</th>
              <th>join : Joins files on some common field</th>
            </tr>
            <tr>
              <th>8</th>
              <th>perl : Data manipulation language</th>
            </tr>
            <tr>
              <th>9</th>
              <th>sed : Stream text editor</th>
            </tr>
            <tr>
              <th>10</th>
              <th>sort : Sorts file data</th>
            </tr>
            <tr>
              <th>11</th>
              <th>split : Splits file into smaller files</th>
            </tr>
            <tr>
              <th>12</th>
              <th>tr : Translates characters</th>
            </tr>
            <tr>
              <th>13</th>
              <th>uniq : Reports repeated lines in a file</th>
            </tr>
            <tr>
              <th>14</th>
              <th>wc : Counts words, lines, and characters</th>
            </tr>
            <tr>
              <th>15</th>
              <th>vi : Opens vi text editor</th>
            </tr>
            <tr>
              <th>16</th>
              <th>vim : Opens vim text editor</th>
            </tr>
            <tr>
              <th>17</th>
              <th>fmt : Simple text formatter</th>
            </tr>
            <tr>
              <th>18</th>
              <th>spell : Checks text for spelling error</th>
            </tr>
            <tr>
              <th>19</th>
              <th>ispell : Checks text for spelling error</th>
            </tr>
            <tr>
              <th>20</th>
              <th>emacs : GNU project Emacs</th>
            </tr>
            <tr>
              <th>21</th>
              <th>ex, edit : Line editor</th>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Compressed Files</h2>

      <div class="table-responsive-md">
        <table class="table difftbl">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Command &amp; Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>compress : Compresses files</th>
            </tr>
            <tr>
              <th>2</th>
              <th>gunzip : Helps uncompress gzipped files</th>
            </tr>
            <tr>
              <th>3</th>
              <th>gzip : GNU alternative compression method</th>
            </tr>
            <tr>
              <th>4</th>
              <th>uncompress : Helps uncompress files</th>
            </tr>
            <tr>
              <th>5</th>
              <th>unzip : List, test and extract compressed files in a ZIP archive</th>
            </tr>
            <tr>
              <th>6</th>
              <th>zcat : Cat a compressed file</th>
            </tr>
            <tr>
              <th>7</th>
              <th>zcmp : Compares compressed files</th>
            </tr>
            <tr>
              <th>8</th>
              <th>zdiff : Compares compressed files</th>
            </tr>
            <tr>
              <th>9</th>
              <th>zmore : File perusal filter for crt viewing of compressed text</th>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Getting Information</h2>

      <div class="table-responsive-md">
        <table class="table difftbl">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Command &amp; Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>apropos : Locates commands by keyword lookup</th>
            </tr>
            <tr>
              <th>2</th>
              <th>info : Displays command information pages online</th>
            </tr>
            <tr>
              <th>3</th>
              <th>man : Displays manual pages online</th>
            </tr>
            <tr>
              <th>4</th>
              <th>whatis : Searches the whatis database for complete words</th>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Network Communication</h2>

      <div class="table-responsive-md">
        <table class="table difftbl">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Command &amp; Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>ftp : File transfer program</th>
            </tr>
            <tr>
              <th>2</th>
              <th>rcp : Remote file copy</th>
            </tr>
            <tr>
              <th>3</th>
              <th>rlogin : Remote login to a Unix host</th>
            </tr>
            <tr>
              <th>4</th>
              <th>rsh : Remote shell</th>
            </tr>
            <tr>
              <th>5</th>
              <th>tftp : Trivial file transfer program</th>
            </tr>
            <tr>
              <th>6</th>
              <th>telnet : Makes terminal connection to another host</th>
            </tr>
            <tr>
              <th>7</th>
              <th>ssh : Secures shell terminal or command connection</th>
            </tr>
            <tr>
              <th>8</th>
              <th>scp : Secures shell remote file copy</th>
            </tr>
            <tr>
              <th>9</th>
              <th>sftp : Secures shell file transfer program</th>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Message between Userss</h2>

      <div class="table-responsive-md">
        <table class="table difftbl">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Command &amp; Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>evolution : GUI mail handling tool on Linux</th>
            </tr>
            <tr>
              <th>2</th>
              <th>mail : Simple send or read mail program</th>
            </tr>
            <tr>
              <th>3</th>
              <th>mesg : Permits or denies messages</th>
            </tr>
            <tr>
              <th>4</th>
              <th>parcel : Sends files to another user</th>
            </tr>
            <tr>
              <th>5</th>
              <th>pine : Vdu-based mail utility</th>
            </tr>
            <tr>
              <th>6</th>
              <th>talk : Talks to another user</th>
            </tr>
            <tr>
              <th>7</th>
              <th>write : Writes message to another user</th>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Programming Utilities</h2>

      <div class="table-responsive-md">
        <table class="table difftbl">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Command &amp; Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>dbx : Sun debugger</th>
            </tr>
            <tr>
              <th>2</th>
              <th>gdb : GNU debugger</th>
            </tr>
            <tr>
              <th>3</th>
              <th>make : Maintains program groups and compile programs</th>
            </tr>
            <tr>
              <th>4</th>
              <th>nm : Prints program's name list</th>
            </tr>
            <tr>
              <th>5</th>
              <th>size : Prints program's sizes</th>
            </tr>
            <tr>
              <th>6</th>
              <th>strip : Removes symbol table and relocation bits</th>
            </tr>
            <tr>
              <th>7</th>
              <th>cb : C program beautifier</th>
            </tr>
            <tr>
              <th>8</th>
              <th>cc : ANSI C compiler for Suns SPARC systems</th>
            </tr>
            <tr>
              <th>9</th>
              <th>ctrace : C program debugger</th>
            </tr>
            <tr>
              <th>10</th>
              <th>gcc : GNU ANSI C Compiler</th>
            </tr>
            <tr>
              <th>11</th>
              <th>indent : Indent and format C program source</th>
            </tr>
            <tr>
              <th>12</th>
              <th>bc : Interactive arithmetic language processor</th>
            </tr>
            <tr>
              <th>13</th>
              <th>gcl : GNU Common Lisp</th>
            </tr>
            <tr>
              <th>14</th>
              <th>perl : General purpose language</th>
            </tr>
            <tr>
              <th>15</th>
              <th>php : Web page embedded language</th>
            </tr>
            <tr>
              <th>16</th>
              <th>py : Python language interpreter</th>
            </tr>
            <tr>
              <th>17</th>
              <th>asp : Web page embedded language</th>
            </tr>
            <tr>
              <th>18</th>
              <th>CC : C++ compiler for Suns SPARC systems</th>
            </tr>
            <tr>
              <th>19</th>
              <th>g++ : GNU C++ Compiler</th>
            </tr>
            <tr>
              <th>20</th>
              <th>javac : JAVA compiler</th>
            </tr>
            <tr>
              <th>21</th>
              <th>appletvieweir : JAVA applet viewer</th>
            </tr>
            <tr>
              <th>22</th>
              <th>netbeans : Java integrated development environment on Linux</th>
            </tr>
            <tr>
              <th>23</th>
              <th>sqlplus : Runs the Oracle SQL interpreter</th>
            </tr>
            <tr>
              <th>24</th>
              <th>sqlldr : Runs the Oracle SQL data loader</th>
            </tr>
            <tr>
              <th>25</th>
              <th>mysql : Runs the mysql SQL interpreter</th>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Misc Commands</h2>

      <div class="table-responsive-md">
        <table class="table difftbl">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Command &amp; Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>chfn : Changes your finger information</th>
            </tr>
            <tr>
              <th>2</th>
              <th>chgrp : Changes the group ownership of a file</th>
            </tr>
            <tr>
              <th>3</th>
              <th>chown : Changes owner</th>
            </tr>
            <tr>
              <th>4</th>
              <th>date : Prints the date</th>
            </tr>
            <tr>
              <th>5</th>
              <th>determin : Automatically finds terminal type</th>
            </tr>
            <tr>
              <th>6</th>
              <th>du : Prints amount of disk usage</th>
            </tr>
            <tr>
              <th>7</th>
              <th>echo : Echo arguments to the standard options</th>
            </tr>
            <tr>
              <th>8</th>
              <th>exit : Quits the system</th>
            </tr>
            <tr>
              <th>9</th>
              <th>finger : Prints information about logged-in users</th>
            </tr>
            <tr>
              <th>10</th>
              <th>groupadd : Creates a user group</th>
            </tr>
            <tr>
              <th>11</th>
              <th>groups : Show group memberships</th>
            </tr>
            <tr>
              <th>12</th>
              <th>homequota : Shows quota and file usage</th>
            </tr>
            <tr>
              <th>13</th>
              <th>iostat : Reports I/O statistics</th>
            </tr>
            <tr>
              <th>14</th>
              <th>kill : Sends a signal to a process</th>
            </tr>
            <tr>
              <th>15</th>
              <th>last : Shows last logins of users</th>
            </tr>
            <tr>
              <th>16</th>
              <th>logout : Logs off Unix</th>
            </tr>
            <tr>
              <th>17</th>
              <th>lun : Lists user names or login ID</th>
            </tr>
            <tr>
              <th>18</th>
              <th>netstat : Shows network status</th>
            </tr>
            <tr>
              <th>19</th>
              <th>passwd : Changes user password</th>
            </tr>
            <tr>
              <th>20</th>
              <th>passwd : Changes user login password</th>
            </tr>
            <tr>
              <th>21</th>
              <th>printenv : Displays value of a shell variable</th>
            </tr>
            <tr>
              <th>22</th>
              <th>ps : Displays the status of current processes</th>
            </tr>
            <tr>
              <th>23</th>
              <th>ps : Prints process status statistics</th>
            </tr>
            <tr>
              <th>24</th>
              <th>quota -v : Displays disk usage and limits</th>
            </tr>
            <tr>
              <th>25</th>
              <th>reset : Resets terminal mode</th>
            </tr>
            <tr>
              <th>26</th>
              <th>script : Keeps script of terminal session</th>
            </tr>
            <tr>
              <th>27</th>
              <th>script : Saves the output of a command or process</th>
            </tr>
            <tr>
              <th>28</th>
              <th>setenv : Sets environment variables</th>
            </tr>
            <tr>
              <th>29</th>
              <th>stty : Sets terminal options</th>
            </tr>
            <tr>
              <th>30</th>
              <th>time : Helps time a command</th>
            </tr>
            <tr>
              <th>31</th>
              <th>top : Displays all system processes</th>
            </tr>
            <tr>
              <th>32</th>
              <th>tset : Sets terminal mode</th>
            </tr>
            <tr>
              <th>33</th>
              <th>tty : Prints current terminal name</th>
            </tr>
            <tr>
              <th>34</th>
              <th>umask : Show the permissions that are given to view files by default</th>
            </tr>
            <tr>
              <th>35</th>
              <th>uname : Displays name of the current system</th>
            </tr>
            <tr>
              <th>36</th>
              <th>uptime : Gets the system up time</th>
            </tr>
            <tr>
              <th>37</th>
              <th>useradd : Creates a user account</th>
            </tr>
            <tr>
              <th>38</th>
              <th>users : Prints names of logged in users</th>
            </tr>
            <tr>
              <th>39</th>
              <th>vmstat : Reports virtual memory statistics</th>
            </tr>
            <tr>
              <th>40</th>
              <th>w : Shows what logged in users are doing</th>
            </tr>
            <tr>
              <th>41</th>
              <th>who : Lists logged in users</th>
            </tr>
            <tr>
              <th>42</th>
              <th>touch : Updates access and modification time of a file</th>
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

export default Chap8;
