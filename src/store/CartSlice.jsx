import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const calculateTotals = (state) => {
  state.totalQuantity = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  state.totalAmount = state.items.reduce(
    (sum, item) =>
      sum + Number(item.cost ?? item.price ?? 0) * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const plant = action.payload;
      const existing = state.items.find(
        (item) => item.id === plant.id
      );
      const cost = Number(plant.cost ?? plant.price ?? 0);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          cost,
          price: cost,
          quantity: 1,
        });
      }

      calculateTotals(state);
    },

    removeItem(state, action) {
      const identifier =
        typeof action.payload === "object"
          ? action.payload.id ?? action.payload.name
          : action.payload;

      state.items = state.items.filter(
        (item) =>
          item.id !== identifier && item.name !== identifier
      );

      calculateTotals(state);
    },

    updateQuantity(state, action) {
      const { id, name, quantity } = action.payload;

      const item = state.items.find((plant) =>
        id !== undefined ? plant.id === id : plant.name === name
      );

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (plant) => plant.name !== item.name
        );
      } else {
        item.quantity = quantity;
      }

      calculateTotals(state);
    },

    // Compatibility with existing code
    addToCart(state, action) {
      const plant = action.payload;
      const cost = Number(plant.cost ?? plant.price ?? 0);
      const existing = state.items.find(
        (item) => item.id === plant.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          cost,
          price: cost,
          quantity: 1,
        });
      }

      calculateTotals(state);
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      calculateTotals(state);
    },

    increaseQuantity(state, action) {
      const item = state.items.find(
        (plant) => plant.id === action.payload
      );
      if (item) item.quantity += 1;
      calculateTotals(state);
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(
        (plant) => plant.id === action.payload
      );

      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter(
            (plant) => plant.id !== item.id
          );
        } else {
          item.quantity -= 1;
        }
      }

      calculateTotals(state);
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  cartSlice.actions;

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
