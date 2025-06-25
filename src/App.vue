<template>
  <div class="flex h-screen bg-gray-50 font-sans">

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">

      <!-- Main Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Custom styles for smoothness */
.router-link-active {
  @apply bg-blue-100 text-blue-700;
}
</style>