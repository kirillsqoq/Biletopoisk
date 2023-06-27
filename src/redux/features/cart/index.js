import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	total: 0,
	searchstr: "",
	genre: "Не выбран",
	cinema: "Не выбран",
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		increment: (state, { payload }) => {
			const count = state[payload] || 0;
			if (count < 30) {
				state.total = state.total + 1;
				state[payload] = count + 1;
			}
		},
		decrement: (state, { payload }) => {
			const count = state[payload];

			if (!count) {
				return;
			}

			if (count === 1) {
				state.total = state.total - 1;

				delete state[payload];
				return;
			}
			state.total = state.total - 1;
			state[payload] = count - 1;
		},
		reset: (state, { payload }) => {
			state.total = state.total - state[payload];
			state[payload] = 0;
		},
		setSearch: (state, { payload }) => {
			state.searchstr = payload;
		},
		searchReset: (state) => {
			state.searchstr = "";
			state.genre = "Не выбран";
		},
		setGenre: (state, { payload }) => {
			state.genre = payload;
		},
		setCinema: (state, { payload }) => {
			state.cinema = payload;
		},
	},
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
