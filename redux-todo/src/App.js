import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	selectTasks,
	selectDone,
	lastId,
	add,
	del,
	toggle,
} from "./features/todo/todoSlice";

function AddNew() {
	const subject = useRef();
	const id = useSelector(lastId) + 1;
	const dispatch = useDispatch();

	return (
		<form onSubmit={(e) => {
			e.preventDefault();

			dispatch(add({
				id, subject: subject.current.value, done: false
			}));
		}}>
			<input type="text" ref={subject} />
			<button>ADD</button>
		</form>
	);
}

function TodoList() {
	const list = useSelector(selectTasks);
	const dispatch = useDispatch();

	return (
		<ul>
			{ list.map(item => {
				return (
					<li key={item.id}>
						<a
							href="/#"
							onClick={() => {
								dispatch(toggle(item.id));
							}}>
							Check
						</a>
						{item.subject}
						<a
							href="/#"
							onClick={() => {
								dispatch(del(item.id));
							}}>
							Del
						</a>
					</li>
				);
			}) }
		</ul>
	)
}

function DoneList() {
	const list = useSelector(selectDone);
	const dispatch = useDispatch();

	return (
		<ul style={{ color: 'gray', fontSize: '0.8em' }}>
			{list.map(item => {
				return (
					<li key={item.id}>
						<a
							href="/#"
							onClick={() => {
								dispatch(toggle(item.id));
							}}>
							Undo
						</a>
						{item.subject}
						<a
							href="/#"
							onClick={() => {
								dispatch(del(item.id));
							}}>
							Del
						</a>
					</li>
				);
			})}
		</ul>
	);
}

export default function App() {
	return (
		<div>
			<h1>Redux Todo</h1>
			<AddNew />
			<TodoList />
			<DoneList />
		</div>
	);
}
