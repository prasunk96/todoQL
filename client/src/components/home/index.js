import {h, Component} from 'preact';
import style from './style';
import List from '../list';
import ListHeader from '../listHeader';
import { Mutation } from 'react-apollo';

class Home extends Component {
    render() {
        return (
            <div class={style.home}>
                <h1>Todo List</h1>
                <ListHeader />
                <List />
                </div>
        ) 
    }
}

export default Home