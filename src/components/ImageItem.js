import React, {useState} from 'react'
import {Modal, Button, Image} from 'react-bootstrap';

function ImageItem({imgs}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openLink = (link) => window.open(link);

    return (
        <>
        <div
            onClick={handleShow}
            style={{
                paddingBottom: "20px",
            }}
            >
               <Image src={imgs.urls.thumb}/>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{imgs.alt_descriptions}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image src={imgs.urls.small} alt={imgs.alt_descriptions}  />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => openLink(imgs.links.html)}>
                Open in Unsplash
            </Button>
            <Button variant="primary" onClick={() => openLink(imgs.links.download)}>
                Download Image
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ImageItem
