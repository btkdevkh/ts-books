import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { IBook } from '../../models/Book'

type MyProps = {
  book: IBook,
  handleCancel: () => void,
  handleSubmitForm: (book: IBook) => void
}

interface MyState {
  book: IBook
}

export default class FormUpdate extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)

    this.state = {
      book: {
        id: this.props.book.id,
        title: this.props.book.title,
        author: this.props.book.author,
        pages: this.props.book.pages
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {        
    this.setState({
      book: {
        ...this.state.book,
        [e.target.name]: e.target.value
      }
    })
  }

  handleUpdate() {    
    this.props.handleSubmitForm(this.state.book)
    this.props.handleCancel()
  }

  render() {
    const { title, author, pages } = this.state.book
    const { book, handleCancel } = this.props

    return (
      <>
        <td>{book.id}</td>
        <td>
          <div>
            <Form.Control 
              name='title'
              type="text" 
              placeholder="Titre" 
              value={title}
              onChange={this.handleChange}
            />
          </div>
        </td>
        <td>
          <div>
            <Form.Control 
              name='author'
              type="text" 
              placeholder="Auteur" 
              value={author}
              onChange={this.handleChange}
            />
          </div>
        </td>
        <td>
          <div>
            <Form.Control 
              name='pages'
              type="text" 
              placeholder="Nombre de pages" 
              value={pages}
              onChange={this.handleChange}
            />
          </div>
        </td>
        <td>
          <Button 
            type='submit'
            className='bg-primary border-0' 
            onClick={this.handleUpdate}
          >
            Valider
          </Button>
        </td>
        <td>
          <Button 
            className='bg-danger border-0' 
            onClick={handleCancel}
          >
            Annuler
          </Button>
        </td>
      </>
    )
  }
}
