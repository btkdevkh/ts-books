import { Component } from 'react';
import { Container, Button } from 'react-bootstrap'
import HeadingH1 from './components/HeadingH1'
import Books from './containers/books/Books'

interface MyState {
  isOpen: boolean
}

class App extends Component {
  state: MyState = {
    isOpen: false
  }

  handleClick() {    
    this.setState((o: MyState) => {
      return { isOpen: !o.isOpen }
    })
  }

  handleClose() {
    this.setState({ isOpen: false })
  }

  render() {
    return (
      <div className='App'>
        <Container className='mx-auto'>
          <HeadingH1>TypeScript Simple CRUD Books Project</HeadingH1>
          <Books 
            isOpen={this.state.isOpen} 
            handleClose={this.handleClose.bind(this)} 
          />
          <Button 
            onClick={this.handleClick.bind(this)}
            className={`${!this.state.isOpen ? 'bg-success' : 'bg-danger w-50'} border-0`}
          >
            {!this.state.isOpen ? 'Ajouter d\'un livre' : 'Fermer le formulaire'}
          </Button>
        </Container>
      </div>
    );
  }
}

export default App;
