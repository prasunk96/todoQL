import {h, Component} from 'preact';
import style from './style';
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

const List = () => (
    <Query query={GET_TODOS}>
        {({loading, error, data}) => {
            if(loading) return <p>Loading...</p>
            if(error) return <p>Error</p>

            console.log(data.todos);
            return(
                <ul class={style.todolist}>
                    {
                        data.todos.map((todo) => (
                            <li>
                                {todo.content}
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
                                    <button class="btn btn-danger" onClick={e => {
                                        removeTodo({variables: {id: todo.id}});
                                    }}>
                                    Remove</button>
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