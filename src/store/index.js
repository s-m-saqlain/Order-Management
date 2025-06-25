import { defineStore } from "pinia";
import { orders as initialOrders } from "../data.js";

export const useOrderStore = defineStore("orders", {
  state: () => ({
    orders: initialOrders.map((order) => ({ ...order, isCompleted: false })),
    orderSearchQuery: "",
    customerSearchQuery: "",
  }),
  getters: {
    filteredOrders(state) {
      let filtered = [...state.orders];

      if (state.orderSearchQuery) {
        filtered = filtered.filter((order) =>
          order.orderID.includes(state.orderSearchQuery)
        );
      }
      if (state.customerSearchQuery) {
        filtered = filtered.filter((order) =>
          order.customerName
            .toLowerCase()
            .includes(state.customerSearchQuery.toLowerCase())
        );
      }

      return filtered;
    },
  },
  actions: {
    toggleCompletion(orderId) {
      const order = this.orders.find((o) => o.orderID === orderId);
      if (order) order.isCompleted = !order.isCompleted;
    },
    updateOrderSearchQuery(query) {
      this.orderSearchQuery = query;
    },
    updateCustomerSearchQuery(query) {
      this.customerSearchQuery = query;
    },
  },
});
