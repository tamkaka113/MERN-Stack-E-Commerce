# Features

Full featured shopping cart
Product reviews and rating
Top products carousel
Product pagination
Product search feature
User profile with orders
Admin product management
Admin user management
Admin Order details page
Mark orders as delivered option
Checkout process (shipping, payment method, etc)
PayPal / credit card integration
Database seeder (products & users)

## Usage

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

## Env Variables

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
PAYPAL_CLIENT_ID = your paypal client id
JWT_SECRET =aNdRgUkXp2s5u8x/A?D(G+KbPeShVmY
JWT_LIFETIME=30d
CLOUD_NAME= Cloudinary Name
CLOUD_API_KEY= Cloudinary Key
CLOUD_API_SECRET=Cloudinary Secret

## Install Dependencies (frontend & backend)

npm install
cd frontend
npm install

## Run

# Run frontend (:3000) & backend (:5000)

npm run dev

# Run backend only

npm run server

## Build & Deploy

# Create frontend prod build

cd frontend
npm run build

## Seed Database

# Import data

npm run data:import

# Destroy data

npm run data:destroy

## Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456
