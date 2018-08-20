import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Header = () => (
	<header class={style.header}>
		<h1>To-Do App</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
		</nav>
	</header>
);

export default Header;
