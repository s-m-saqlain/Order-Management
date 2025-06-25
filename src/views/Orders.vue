<template>
  <div class="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl space-y-6">
  
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Order Management</h1>
          <p class="text-gray-600 mt-1">Manage and track all your orders in one place</p>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Orders</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ paginatedOrders.length }} / {{ filteredOrders.length }}</p>
            </div>
            <div class="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Icon name="total-orders" class="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Fulfilled</p>
              <p class="text-2xl font-bold text-green-600 mt-1">{{ filteredOrders.filter(o => o.orderStatus === 'FULFILLED').length }}</p>
            </div>
            <div class="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Icon name="fulfilled" class="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Pending</p>
              <p class="text-2xl font-bold text-yellow-600 mt-1">{{ filteredOrders.filter(o => o.orderStatus === 'UNVERIFIED').length }}</p>
            </div>
            <div class="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Icon name="pending" class="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-2xl font-bold text-blue-600 mt-1">{{ filteredOrders.filter(o => o.isCompleted).length }}</p>
            </div>
            <div class="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Icon name="completed" class="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <div class="px-6 py-5 border-b border-gray-200">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 class="text-xl font-semibold text-gray-900">Orders</h2>
            <div class="flex gap-4">
              <div class="relative w-full md:w-72">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="search" class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  v-model.debounce.300ms="orderSearchQuery"
                  type="text"
                  placeholder="Search by Order Number..."
                  class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  @input="validateAndUpdateOrderSearch"
                  pattern="[0-9]*"
                  title="Please enter only numbers"
                />
              </div>
              <div class="relative w-full md:w-72">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="search" class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  v-model.debounce.300ms="customerSearchQuery"
                  type="text"
                  placeholder="Search by Customer Name..."
                  class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  @input="updateCustomerSearchQuery"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th 
                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-200 select-none group" 
                    @click="sort('orderID')"
                  >
                    <div class="flex items-center gap-2">
                      Order #
                      <Icon name="sort" :class="{ 'rotate-180': sortDirection === -1 && sortKey === 'orderID' }" class="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform" />
                    </div>
                  </th>
                  <th 
                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-200 select-none group" 
                    @click="sort('orderStatus')"
                  >
                    <div class="flex items-center gap-2">
                      Status
                      <Icon name="sort" :class="{ 'rotate-180': sortDirection === -1 && sortKey === 'orderStatus' }" class="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform" />
                    </div>
                  </th>
                  <th 
                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-200 select-none group" 
                    @click="sort('customerName')"
                  >
                    <div class="flex items-center gap-2">
                      Customer
                      <Icon name="sort" :class="{ 'rotate-180': sortDirection === -1 && sortKey === 'customerName' }" class="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform" />
                    </div>
                  </th>
                  <th 
                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-200 select-none group" 
                    @click="sort('purDate')"
                  >
                    <div class="flex items-center gap-2">
                      Purchase Date
                      <Icon name="sort" :class="{ 'rotate-180': sortDirection === -1 && sortKey === 'purDate' }" class="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform" />
                    </div>
                  </th>
                  <th 
                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-200 select-none group" 
                    @click="sort('fulfillDate')"
                  >
                    <div class="flex items-center gap-2">
                      Fulfilled Date
                      <Icon name="sort" :class="{ 'rotate-180': sortDirection === -1 && sortKey === 'fulfillDate' }" class="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform" />
                    </div>
                  </th>
                  <th 
                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-200 select-none group" 
                    @click="sort('invoiceStatus')"
                  >
                    <div class="flex items-center gap-2">
                      Invoice Status
                      <Icon name="sort" :class="{ 'rotate-180': sortDirection === -1 && sortKey === 'invoiceStatus' }" class="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform" />
                    </div>
                  </th>
                  <th 
                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-200 select-none group" 
                    @click="sort('amount')"
                  >
                    <div class="flex items-center gap-2">
                      Amount
                      <Icon name="sort" :class="{ 'rotate-180': sortDirection === -1 && sortKey === 'amount' }" class="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform" />
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="order in paginatedOrders" 
                  :key="order.orderID" 
                  class="hover:bg-gray-50 transition duration-200"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-gray-900">{{ order.orderID }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="getStatusClass(order.orderStatus)" 
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                    >
                      {{ order.orderStatus }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span class="text-xs font-medium text-gray-600">{{ order.customerName.charAt(0) }}</span>
                      </div>
                      <div class="text-sm font-medium text-gray-900">{{ order.customerName }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ order.purDate }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ order.fulfillDate }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="order.invoiceStatus === 'VERIFIED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'" 
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                    >
                      {{ order.invoiceStatus }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {{ order.amount }} {{ order.currency }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button
                      @click="toggleCompletion(order.orderID)"
                      :class="order.isCompleted 
                        ? 'bg-green-50 text-green-700 border-green-200 cursor-not-allowed' 
                        : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700'"
                      class="inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      :disabled="order.isCompleted"
                    >
                      <Icon v-if="order.isCompleted" name="check" class="h-3 w-3 mr-1.5" />
                      {{ order.isCompleted ? 'Completed' : 'Mark Complete' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div v-if="filteredOrders.length > itemsPerPage" class="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div class="text-sm text-gray-700">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredOrders.length) }} of {{ filteredOrders.length }} orders
            </div>
            <div class="flex space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition duration-200"
              >
                Previous
              </button>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition duration-200"
              >
                Next
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredOrders.length === 0" class="text-center py-12">
            <Icon name="total-orders" class="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p class="text-gray-500">Try adjusting your search criteria or check back later.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useOrders } from './Orders.js';
import { useOrderStore } from '../store';
import Icon from '../components/icons/Icon.vue';

const store = useOrderStore();
const {
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
} = useOrders(store);
</script>

<style scoped>
@import '../assets/orders.css';
</style>