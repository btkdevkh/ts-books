import { Component, Fragment } from 'react'
import { Table } from 'react-bootstrap'
import { Book, IBook } from '../../models/Book'
import BookItem from '../book/BookItem'
import FormCreate from '../form/FormCreate'
import FormUpdate from '../form/FormUpdate'
import AlertMsg from '../../components/AlertMsg'
import DropConfirm from '../../components/DropConfirm'
import { bookDatas } from '../../data/books'

type Props = {
  isOpen: boolean,
  handleClose: () => void
}

interface Mystate {
  books: IBook[];
  book: IBook | null;
  lastId: number;
  bookId: number;
  alert: { classe: string, msg: string };
  showModal: boolean;
}

export default class Books extends Component<Props, Mystate> {  
  state: Mystate = {
    books: [],
    book: null,
    lastId: 3,
    bookId: 0,
    alert: { classe: '', msg: '' },
    showModal: false
  }

  handleDelete(id: number) {   
    // SOLUTION 1
    // let bookTab: IBook[] = [...this.state.books]    
    // for(let i = 0; i < bookTab.length; i++) {
    //   if(id === bookTab[i].id) {        
    //     bookTab.splice(i, 1)             
    //   }
    // }
    // this.setState({ books: bookTab }) 

    // SOLUTION 2
    // let foundIdx = this.state.books.findIndex(b => b.id === id)
    // const newBooks = [...this.state.books]
    // newBooks.splice(foundIdx, 1)
    // this.setState({ books: newBooks })

    // SOLUTION 3
    const newBooks = this.state.books.filter(b => b.id !== id)
    this.setState({ books: newBooks })

    this.setState({ alert: {classe: 'danger', msg: 'Suppression effectuée' }})
    this.handleCloseAlert()
  }

  handleSubmitForm(book: IBook) {    
    // Add
    if(!book.id) {
      this.setState(oldState => {
        return { 
          books: [...oldState.books, {id: oldState.lastId + 1, ...book}],
          lastId: oldState.lastId + 1
        }
      })

      this.props.handleClose()
      this.setState({ alert: {classe: 'success', msg: 'L\'ajout effectué' }})
      this.handleCloseAlert()

    // Update
    } else {
      const foundIdx = this.state.books.findIndex(b => b.id === book.id)

      // SOLUTION 1
      // const newBookList = [...this.state.books]
      // newBookList[foundIdx] = book
      // console.log(newBookList[foundIdx]);
      // this.setState({ books: newBookList })

      // SOLUTION 2
      this.setState(o => {
        const newBookList = [...o.books]
        newBookList[foundIdx] = book
        return {
          books: newBookList
        }
      })

      this.setState({ book: null })
      this.setState({ alert: {classe: 'warning', msg: 'Modification effectuée' }})
      this.handleCloseAlert()
    }
  }

  handleCloseAlert() {
    window.setTimeout(() => {
      this.setState({ alert: {classe: '', msg: '' }})
    }, 3000)
  }

  componentDidMount() {    
    bookDatas
      .then((res: any) => res.map((book: any) => Book.hydrateData(book)))
      .then(books => this.setState({ books: books }))
      .catch(err => console.log("Could not get the datas", err))
  }

  render() {
    const { books, book, bookId, alert, showModal } = this.state;
    const { isOpen } = this.props;
    
    return (
      <div>
        { alert.classe.length > 0 && <AlertMsg variant={alert.classe}>{alert.msg}</AlertMsg> }

        { 
          books &&
          books.length > 0 && (
            <Table striped bordered hover variant='success'>
              <thead>
                <tr className='text-center align-middle'>
                  <th>#</th>
                  <th>Titre</th>
                  <th>Auteur</th>
                  <th>Pages</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                { books.map(b => (
                  <Fragment key={b.id}>
                    {
                      b.id === bookId ? (
                        <tr>
                          <FormUpdate 
                            book={b} 
                            handleCancel={() => this.setState({ bookId: 0 })}
                            handleSubmitForm={this.handleSubmitForm.bind(this)}
                          />
                        </tr>
                      ) : (
                        <tr className='text-center  align-middle'>
                          <BookItem 
                            book={b}
                            handleDelete={() => {
                              this.setState({ book: b })
                              this.setState({ showModal: true })
                            }}
                            handleUpdate={() => {
                              this.setState({ bookId: b.id as number })
                            }}
                          />
                        </tr>
                      )
                    }
                  </Fragment>
                ))}
              </tbody>
            </Table>
          )
        }

        { isOpen && ( <FormCreate handleSubmitForm={this.handleSubmitForm.bind(this)} /> ) }

        {
          showModal && (
            <DropConfirm
              book={book}
              show={showModal}
              onHide={() => {
                this.setState({ showModal: false })
              }}
              handleDelete={() => {
                this.handleDelete(book?.id as number)
                this.setState({ showModal: false })
              }}
            />
          )
        }
      </div>
    )
  }
}
