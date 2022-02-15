import {Modal, Button} from 'react-bootstrap'
import { IBook } from '../models/Book'

interface Props {
  book: IBook | null
  show: boolean
  onHide: () => void
  handleDelete: () => void
}

export default function DropConfirm(props: Props) {
  const {show, book, onHide, handleDelete } = props
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {book && book.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Voulez-vous supprimer ce livre : {book && book.title} ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={handleDelete}>Oui</Button>
        <Button variant='danger' onClick={onHide}>Non</Button>
      </Modal.Footer>
    </Modal>
  )
}
