import {h, Component} from 'preact';
import style from './style';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';

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
mutation RemoveTodo($id: Int!) {
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

            console.log(data.todos)

            return(
                <ul class={style.todolist}>
                    {
                        data.todos.map((todo) => (
                            <li>
                                {todo.content}

                                <Mutation 
                                    muation={REMOVE_TODO}
                                    update={(cache, {data: {removeTodo}})=> {
                                        const results = cache.readQuery({query: GET_TODOS});

                                        console.log(removeTodo);
                                        console.log(results);

                                        cache.writeQuery({
                                            query: GET_TODOS,
                                            data: { todos: removeTodo}
                                        });
                                    }}
                                >
                                {(removeTodo, {data}) => (
                                    <button onClick={e => {
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