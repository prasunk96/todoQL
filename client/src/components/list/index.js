import {h, Component} from 'preact';
import style from '../../style';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const GET_TODOS = gql`
    query {
        todos{
            id
            content
            isChecked
        }
    }
`;

const REMOVE_TODO = gql`
mutation RemoveTodo($id:String!) {
    removeTodo(id:$id) {
        id
        content
        isChecked
    }
}
`;

const UPDATE_TODO = gql`
mutation UpdateTodo($id:String!, $content: String!, $isChecked: Boolean!) {
    updateTodo(id:$id, content: $content, isChecked: $isChecked) {
        id
        content
        isChecked
    }
}
`

const List = () => (
    <Query query={GET_TODOS}>
        {({loading, error, data}) => {
            if(loading) return <p>Loading...</p>
            if(error) return <p>Error</p>

            console.log(data.todos);
            return(
                <ul class="list-group list-group-flush todolist">
                    {
                        data.todos.map((todo) => (
                            <li class="li-style">
                                <Mutation 
                                    mutation={UPDATE_TODO}
                                    update={(cache, {data: {updateTodo}}) => {
                                        const {todos} = cache.readQuery({query: GET_TODOS});

                                        cache.writeQuery({
                                            query: GET_TODOS,
                                            data: {todos: todos}
                                        });
                                    }}
                                >
                                {(updateTodo,{data}) => (
                                    <input type="checkbox" class="checkbox" onClick={e=> {
                                        updateTodo({variables: {id: todo.id, content: todo.content, isChecked: (todo.isChecked)?false:true}})
                                    }} checked={todo.isChecked}/>
                                )}
                                </Mutation>
                                {
                                    (todo.isChecked===true)?<span class="li-text checked">{todo.content}</span>:<span class="li-text">{todo.content}</span>
                                }
                                <Mutation 
                                    mutation={REMOVE_TODO}
                                    update={(cache, {data: {removeTodo}})=> {
                                        const {todos} = cache.readQuery({query: GET_TODOS}); 

                                        cache.writeQuery({
                                            query: GET_TODOS,
                                            data: { todos: todos.filter(e => e.id !== todo.id)}
                                        });
                                    }}
                                >
                                    {(removeTodo,{data}) => (
                                        <button class="btn btn-danger li-btn" onClick={e => {
                                            removeTodo({variables: {id: todo.id}});
                                        }}>
                                        <span>X</span></button>
                                    )}
                                </Mutation>
                            </li>
                        )
                    )
                }
            </ul> 
        );
    }}
</Query>
)

export default List;


// refetchQueries: [{ query: GET_TODOS }]