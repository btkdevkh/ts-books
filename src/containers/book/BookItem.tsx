import { IBook } from '../../models/Book'
import { Button } from 'react-bootstrap'

type Props = {
  book: IBook,
  handleDelete: () => void,
  handleUpdate: () => void,
}

export default function BookItem({book, handleDelete, handleUpdate}: Props) {
  
  return (
    <>
      <td>{book.id}</td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.pages}</td>
      <td>
        <Button 
          className='bg-warning border-0' 
          onClick={handleUpdate}
        >
          <i className="bi bi-pencil"></i>
        </Button>
      </td>
      <td>
        <Button 
          className='bg-danger border-0' 
          onClick={handleDelete}
        >
          <i className="bi bi-trash3"></i>
        </Button>
      </td>
    </>
  )
}
