import { ref, computed, watch } from 'vue';

export function useOrders(store) {
  
  const sortKey = ref(null);
  const sortDirection = ref(1);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);

  const filteredOrders = computed(() => store.filteredOrders);

  const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value));

  const sortedOrders = computed(() => {
    let sorted = [...filteredOrders.value];
    if (sortKey.value) {
      sorted.sort((a, b) => {
        const valueA = a[sortKey.value];
        const valueB = b[sortKey.value];
        if (sortKey.value === 'amount') {
          return sortDirection.value * (valueA - valueB);
        }
        return sortDirection.value * (valueA?.localeCompare(valueB) || 0);
      });
    }
    return sorted;
  });

  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return sortedOrders.value.slice(start, end);
  });

  const orderSearchQuery = computed({
    get: () => store.orderSearchQuery,
    set: (value) => store.updateOrderSearchQuery(value),
  });

  const customerSearchQuery = computed({
    get: () => store.customerSearchQuery,
    set: (value) => store.updateCustomerSearchQuery(value),
  });

  watch(filteredOrders, (newOrders) => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value || 1;
    }
  });

  const toggleCompletion = (orderId) => {
    store.toggleCompletion(orderId);
  };

  const sort = (key) => {
    if (sortKey.value === key) {
      sortDirection.value *= -1;
    } else {
      sortKey.value = key;
      sortDirection.value = 1;
    }
  };

  const getStatusClass = (status) => {
    const classes = {
      'Refunded': 'bg-red-50 text-red-700 border-red-200',
      'Part Refund': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'FULFILLED': 'bg-green-50 text-green-700 border-green-200',
      'VERIFIED': 'bg-blue-50 text-blue-700 border-blue-200',
      'UNVERIFIED': 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return classes[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const validateAndUpdateOrderSearch = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    if (value !== numericValue) {
      event.target.value = orderSearchQuery.value || '';
    }
    orderSearchQuery.value = numericValue;
  };

  const updateCustomerSearchQuery = (event) => {
    customerSearchQuery.value = event.target.value;
  };

  return {
    sortKey,
    sortDirection,
    currentPage,
    itemsPerPage,
    filteredOrders,
    totalPages,
    paginatedOrders,
    sortedOrders,
    orderSearchQuery,
    customerSearchQuery,
    toggleCompletion,
    sort,
    getStatusClass,
    validateAndUpdateOrderSearch,
    updateCustomerSearchQuery,
  };
}