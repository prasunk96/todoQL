import { h, Component } from 'preact';
import style from './style';
import List from '../list';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TODO = gql`
  mutation AddTodo($content: String!) {
    addTodo(content:$content) {
    id
    content
    isChecked
    }
  }
`;

const GET_TODOS = gql`
  query {
    todos{
      id
      content
      isChecked
    }
  }
`;

class ListHeader extends Component {

    state = {
        todoText: ""
    }

    constructor(props) {
        super(props);

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
    }

    handleOnInputChange(event) {
        this.setState({
            todoText: event.target.value
        })
    }


    render() {

        return (
            <Mutation 
                mutation={ADD_TODO}
                update={(cache, {data: {addTodo}}) => {
                    const results = cache.readQuery({ query: GET_TODOS });

                    // console.log(results);
                    // console.log(addTodo);

                    cache.writeQuery({
                      query: GET_TODOS,
                      data: { todos: addTodo }
                    });
                }}
            >

            {(addTodo, { data }) => (
                <div>
                    <input type="text" value={this.state.todoText} onChange={this.handleOnInputChange}/>
                    
                    <button 
                        onClick={e => {
                          addTodo({ variables: { text: this.state.todoText} });
                          this.setState({todoText: ""});
                        }}
                    >
                        Add
                    </button>
                </div>
            )}
               
            </Mutation>
        )
    }


}

export default ListHeader;