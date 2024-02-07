import { faMultiply } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MessageStatus = ({ body }) =>
{
    if (body.status)
        return (<div className='attribute'>Status: {body.status}</div>)

    return (<></>);
}

const MessageCode = ({ body }) =>
{
    if (body.code)
        return (<div className='attribute'>Code: {body.code}</div>)

    return (<></>);
}

const MessageBody = ({ body }) =>
{
    if (body)
    {
        if (body.message)
            return (<pre className='info'>{body.message}</pre>)
        else if (body.msg)
            return (<pre className='info'>{body.msg}</pre>)
        else
            return (<div className='info'>Unknown Error</div>)
    }
    else
        return (<div className='info'>Undefined Error</div>);
}

const MessageDetail = ({ body }) =>
{
    return (<div className='msg-detail'>{JSON.stringify(body, null, 2)}</div>);
}

export const ErrorModal = ({ show, title, body, handleClose }) =>
{
    const [showDetail, setShowDetail] = useState(false);

    const ShowDetailToggle = () =>
    {
        setShowDetail(!showDetail);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header id='error-modal-header' closeButton>
            <Modal.Title id='error-modal-title'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body id='error-modal-body'>
                <MessageStatus body={body} />
                <MessageCode body={body} />
                <MessageBody body={body} />
                { showDetail ? <MessageDetail body={body}/> : "" }
            </Modal.Body>
            <Modal.Footer id='error-modal-footer' className='d-flex'>
                <Button className='btn-sm me-auto' variant="light" onClick={ShowDetailToggle}>
                    Detail
                </Button>
                <Button className='btn-sm ms-1' variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ErrorModal;