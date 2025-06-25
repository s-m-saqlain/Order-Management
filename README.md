# vue-order-sync

![Vue Order Sync Screenshot](https://order-management-ivory-two.vercel.app/orders)  
*A Vue 3 application for order management, built with the Composition API, Pinia, and Tailwind CSS. This project provides a responsive dashboard to view, filter, sort, and manage orders with pagination and completion toggling, using mock data.*

## Features

- Order dashboard with stats for total, fulfilled, pending, and completed orders.
- Interactive table with sorting, filtering, and pagination (10 orders per page).
- Search by order number (numeric only) and customer name with debounced inputs.
- Toggle order completion with a button (disabled when completed).
- Responsive design optimized for mobile, tablet, and desktop.
- Reusable SVG icon component (`Icon.vue`) and externalized styles (`orders.css`).

## Project Structure

```plaintext
src/
├── assets/
│   ├── orders.css          # Styles for Orders.vue
│   └── tailwind.css        # Tailwind CSS configuration
├── components/
│   └── icons/
│       └── Icon.vue        # Reusable SVG icon component
├── store/
│   └── index.js            # Pinia store for order data
├── views/
│   ├── Orders.vue          # Main order management view
│   └── Orders.js           # Composable logic for Orders.vue
├── App.vue                 # Root component with router-view
├── main.js                 # Entry point for Vue app
├── router/
│   └── index.js            # Vue Router configuration
└── data.js                 # Mock order data
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur).

## Customize Configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## Dependencies

### Runtime
- `vue`: ^3.5.13
- `pinia`: ^2.3.1
- `vue-router`: ^4.5.1
- `vue-debounce`: ^5.0.1
- `lodash`: ^4.17.21 (unused, retained for compatibility)

### Development
- `@vitejs/plugin-vue`: ^5.2.3
- `vite`: ^6.2.4
- `vite-plugin-vue-devtools`: ^7.7.2
- `tailwindcss`: ^3.4.17
- `autoprefixer`: ^10.4.21
- `postcss`: ^8.5.6

## Key Refactorings

- **Composition API**: Converted `Orders.vue` to use `<script setup>` and moved logic to `views/Orders.js`.
- **Logic Separation**: Extracted sorting, pagination, and search logic into `Orders.js` (composable).
- **Styles**: Moved styles to `assets/orders.css` from `Orders.vue`.
- **SVG Icons**: Created `components/icons/Icon.vue` for reusable icons (`total-orders`, `fulfilled`, `pending`, `completed`, `search`, `sort`, `check`).
- **Pinia Store**: Manages order data, search queries, and completion state in `store/index.js`.
- **Debouncing**: Uses `vue-debounce` for input debouncing, eliminating `lodash/debounce`.

## Usage

- Navigate to `/orders` (root `/` redirects).
- Search orders by order number or customer name.
- Sort table columns by clicking headers.
- Paginate using "Previous" and "Next" buttons.
- Mark orders as complete with the action button.

## Notes

- Adjust import paths in `Orders.vue` (e.g., `./Orders.js`, `../assets/orders.css`, `../components/icons/Icon.vue`) if the structure changes.
- `data.js` should contain ~100 orders; extend as needed.
- Tailwind CSS is configured in `assets/tailwind.css`.
- Vite powers fast development and builds.

## Future Improvements

- Add unit tests for `Orders.js` and `Icon.vue`.
- Integrate a backend API for dynamic data.
- Enhance filtering (e.g., by date or status).
- Improve accessibility with ARIA attributes.

## License

For demonstration purposes; no license unless specified by the owner.