export default function TaskList({ items, remove, toggle }) {
    return (
        <ul>
            {items.map((item) => {
                return (
                    <li key={item.id} style={{
						color: item.done ? "grey" : "black"
					}}>
                        <button onClick={() => remove(item.id)}>Del</button>
                        <button onClick={() => toggle(item.id)}>
                            {item.done ? "Undo" : "Done"}
                        </button>
                        {item.subject}
                    </li>
                );
            })}
        </ul>
    );
}
