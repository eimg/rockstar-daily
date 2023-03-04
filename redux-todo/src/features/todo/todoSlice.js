import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
	name: "todo",
	initialState: [
		{ id: 1, subject: "Milk", done: false },
		{ id: 2, subject: "Bread", done: true },
		{ id: 3, subject: "Butter", done: false },
	],
	reducers: {
		add: (state, action) =>
			[action.payload, ...state],
		del: (state, action) =>
			state.filter(item => item.id !== action.payload),
		toggle: (state, action) => {
			state.map(item => {
				if (item.id === action.payload) item.done = !item.done;
				return item;
			});
		}
	},
});

export const selectTasks = state => state.todo.filter(item => item.done === false);
export const selectDone = state => state.todo.filter(item => item.done === true);
export const lastId = state => state.todo[state.todo.length - 1].id;

export const { add, del, toggle } = todoSlice.actions;
export default todoSlice.reducer;
