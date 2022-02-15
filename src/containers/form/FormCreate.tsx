import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { IBook } from '../../models/Book'

type MyProps = {
  handleSubmitForm: (book: IBook) => void
}

interface MyState {
  book: IBook
}

export default class FormCreate extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)

    this.state = {
      book: {
        title: '',
        author: '',
        pages: 0
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {    
    this.setState({
      book: {
        ...this.state.book,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!this.state.book.title) return
    if(!this.state.book.author) return

    this.props.handleSubmitForm(this.state.book)

    this.setState({
      book: {
        title: '',
        author: '',
        pages: 0
      }
    })
  }

  render() {
    const { title, author, pages } = this.state.book

    return (
      <div className='mb-2 w-50'>
        <h2 className='mb-3'>Ajouter d'un livre</h2>

        <form onSubmit={this.handleSubmit}>
          <div className='mb-3'>
            <Form.Control 
              name='title'
              type="text" 
              placeholder="Titre obligatoire" 
              value={title}
              onChange={this.handleChange}
            />
          </div>
          <div className='mb-3'>
            <Form.Control 
              name='author'
              type="text" 
              placeholder="Autheur obligatoire" 
              value={author}
              onChange={this.handleChange}
            />
          </div>
          <div className='mb-3'>
            <Form.Control 
              name='pages'
              type="number" 
              placeholder="Nombre de pages" 
              value={pages}
              onChange={this.handleChange}
            />
          </div>
          <Button 
            className='w-100 bg-success' 
            type="submit"
          >
            Valider
          </Button>
        </form>
      </div>
    )
  }
}
