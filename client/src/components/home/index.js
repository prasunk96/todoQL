import {h, Component} from 'preact';
import style from '../../style';
import List from '../list';
import ListHeader from '../listHeader';
import { Mutation } from 'react-apollo';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
    render() {
        return (
            <div class="row">
                <div class={style.home} class="col-md-4 offset-4 heading">
                    <h1 class="text-heading">TODO <span class="text-heading2">List</span></h1>
                    <ListHeader />
                    <div class="card">
                        <List />
                    </div>
                </div>
            </div>
        ) 
    }
}

export default Home