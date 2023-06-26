import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	total: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		increment: (state, { payload }) => {
			const count = state[payload] || 0;
			state.total = state.total + 1;
			state[payload] = count + 1;
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
		reset: () => initialState,
	},
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
