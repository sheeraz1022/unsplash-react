import React, { useEffect, useState } from "react";
import { baseURL, h as header } from "../service/token";
import "../App.css";
import ImageItem from "./ImageItem";
import { Container, Row, Col } from 'react-bootstrap';

let timeout;

function App() {

  const [images, setImages] = useState([]);
  const page = React.useRef(1);
  const dataLoading = React.useRef(false);
  

  useEffect(() => {
    async function loadData() {
      dataLoading.current = true;
      const uri = `${baseURL}/photos/?per_page=20&page=${page.current}`;

      const req = new Request(uri, {
        method: "GET",
        headers: header,
        mode: "cors",
      });
      const res = await fetch(req);
      const data = await res.json();
      setImages((prev) => [...prev, ...data]);
      dataLoading.current = false;
    }

    loadData();
    const listener = (e) => {
      if (
        document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.scrollHeight - window.innerHeight / 2 &&
        !dataLoading.current
      ) {
        console.log(page.current);
        console.log("called loadData");

        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        timeout = setTimeout(() => {
          page.current += 1;
          loadData();
          console.log(dataLoading.current);
          console.log("calling uri", page.current);
        }, 100);
      }
    };
    window.addEventListener("scroll", listener);
    console.log("once");
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);



  return (
    <div>
      <h1>Home</h1>
      <Container fluid>
       <Row>
       {images.map((imgs) => (
              <Col><ImageItem key={imgs.id} imgs={imgs}/></Col>
            
            ))}
       </Row>
        </Container>
    </div>
  );
}

export default App;
