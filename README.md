
# Solvd Final Project Team 2

A brief description of what this project does and who it's for

## Description
The Solvd Laba Final Project Shop Page is a dynamic and responsive e-commerce platform designed to showcase and sell unique clothing items. The page is built with a focus on providing a seamless shopping experience, incorporating modern design principles and user-friendly navigation.

## Features
- Sign-in: This page allows users to log in to their accounts. It should include email and password input fields with validation, a "forgot password" link to redirect to the Forgot Password page, a "sign up" link to redirect to the Sign Up page, and a "remember me" checkbox for user convenience. Possible error states include when a user registers but doesn't confirm their email and when the entered email or password is incorrect.

- Sign up: This page allows new users to create an account. It should include input fields for name, email, password, and a confirmation field for password with validation. Possible error states include when the email already exists in the database. This page should also include a "log in" link to redirect to the Sign-in page.

- Forgot password: This page allows users to reset their password if they have forgotten it. It should include an email input field with validation and a "back to log in" link to redirect to the Sign-in page.

- Reset password: This page allows users to reset their password after clicking on a reset password link in their email. It should include input fields for a new password and a confirmation field for the password with validation. It should also include a "back to log in" link to redirect to the Sign-in page.

- Error 404: This page should display when the user tries to access a page that doesn't exist.

- Error 500: This page should display when there is an error with the server.

- My products: This page allows users to view and manage their own products. It should display all products associated with the user's account and allow for editing and deleting of products.
Settings: This page lets users view and edit their account settings. It should include input fields for name, email, phone number, and avatar. 
Add product: This page allows users to add a new product to their account. It should include input fields for product name, description, price, and an upload field for an image.


- Products page: This page displays all available products. It should include search functionality. Clicking on a product should redirect to a product detail page.

- Single Product page: The Single Product page is a detailed view of a specific product in the shoe shop. It provides comprehensive information about the product, allowing users to make an informed decision. (NOT FINISHED BY DESIGNER).

- Bag: This page displays the user's shopping bag and allows for updating quantities and removing products. It should also display the total price of all items in the bag.

## Installation instrucctions
1- Clone this repo:
   ```sh
   git clone https://github.com/FacuReartes/react-laba-final-project-team-2.git
   ```

2- Open the terminal and run the command:
  ```sh
  cd react-laba-final-project-team-2/
  ```
3- Finally run:
  ```sh
  npm install
  npm run dev
  ```

O simply click the link below to visit the app:
<a href="" target="_blank">Visit app</a>

## Technologies
- NextJS - App router
- Typescript
- MUI
- React Query
- NextAuth

## Team
- Lucas Montecino
- Facundo Reartes
- Marcos Cirilo Abreu Da Silva
- Emilio Pino
- Daniel Gonzalez



