# E-Commerce Platform



This is a frontend e-commerce web app built with React, TypeScript, and Vite. It uses Tailwind CSS for styling and Framer Motion for smooth animations.



## Features



- **Cart System**: Built with React Context API. You can add/remove items and change quantities. It uses `localStorage` so your cart doesn't empty when you refresh the page.

- **Product Listing & Filtering**: Fetches products from the EscuelaJS Fake Store API. You can filter by category, price, and title.

- **Categories**: Browse products through the "Trending Categories" section or expand to see "All Categories".

- **Related Products**: The product detail page shows similar items based on the current category.

- **State Management**: Uses Redux Toolkit to cache data and handle API states.

- **Mobile Friendly**: Fully responsive design. On mobile, there's a handy floating filter button that opens a full-screen menu.

- **Animations**: Added some nice touches with Framer Motion, like page transitions, a sliding cart drawer, and image carousels when you hover over categories.



## Tech Stack

- React 19 & TypeScript

- Vite

- Tailwind CSS v4

- Redux Toolkit & Context API

- React Router DOM

- Framer Motion

- Cypress for E2E testing



---



## Setup Instructions



Make sure you have Node.js and npm installed.



**1. Clone the repo**

```bash

git clone https://github.com/sharma171/Ecommerce-platform.git

cd Ecommerce-platform/ecommerce-app

```



**2. Install dependencies**

```bash

npm install

```



**3. Start the dev server**

```bash

npm run dev

```

Then open `http://localhost:5173` in your browser.



---



## Testing



I've set up Cypress to handle basic end-to-end testing (like checking if the cart opens and products load). 



Make sure your local dev server (`npm run dev`) is running first.



To open the Cypress UI and watch the tests run:

```bash

npm run cypress:open

```



To run the tests in the terminal without the UI:

```bash

npm run cypress:run

```



---



## Build for Production

To create an optimized production build:

```bash

npm run build

```

The compiled files will be saved in the `dist/` folder.