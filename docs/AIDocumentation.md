# Prompts

1st Prompt : 
-> Initiate a basic backend file structure for express.js 
context : I wanted  AI to do initial stuff for me so that i dont have to manually create basic backend folders . 
change : It initiated a file directory and wrote basic index.js code for backend . 


2nd prompt : 
-> Analyze My user model and shipments model inside Models folder and check for any error. 
context : I wanted  to check that my data models are fine and my data model definition is correct. 
changes : It checked and found everything fine .

3rd prompt : 
->Analyze authcontroller functions inside controller folder and suggest improvements for performance, security, and scalability.
context : Wanted to check for errors and edge cases . 
changes : suggested some edge cases checks for database queries . 

4th prompt : 
->Analyze shipmentController functions inside controller folder and suggest improvements for performance, security, and scalability.
context : Wanted to check for errors and edge cases . 
changes : suggested some edge cases checks for database queries . 

5th prompt : 
->Generate a landing page in react containing signIn and signUp buttons and having links to signIn and signUp pages . 
context : wanted AI to build a visually impressive landing page . 
change : it worked well and was visually decent for me . 


6th prompt : 
->Generate a responsive SignUp React component with username,email, password, and confirm password fields, form validation and error messages . 
context : I needed a user-friendly, secure, and accessible SignUp form for registering new users, including password validation and real-time error feedback.
change : page was visually good and backend integration with controllers also worked well.

7th prompt : 
->Generate a responsive SignIn React component with email and password fields, form validation, error handling . 
context : I need a secure and user-friendly login form for existing users to access their dashboard. 
change : page was visually good and backend integration with controllers also worked well.

8th prompt : 
->I want to create a dashboard page in React for my shipment tracker app. The page should display a grid of shipment cards showing shipmentId, status, weight, distance, and shippingCost.Each shipment should have a status color indicator (like green for delivered, yellow for pending). Please provide a responsive, clean layout with proper error handling and a loading state while fetching data from the backend API.
context : I wanted a decent dashboard page to load my ship cards as AI can do designing task in a better way and in less time. 
changes : It gave me a good dashboard design but code not clean so i updated it and created a new component for each shipcard . 

9th prompt :  
->I’m building a shipment card UI for my dashboard. It should display shipment details like ID, status, weight, distance, and cost. Status should have different colors. Users should be able to edit or delete shipments, and the card should handle loading and error states gracefully.
context : I wanted a visually good shipment card to render on dashboard .
changes : Card given was visually impressive but it had problems with update edit and delete operations that i have to manually debug and change . (In that process too I have used AI to detect silly errors and bugs) . 

10th prompt : 
->Suggest changes for backend and frontend for implementing pagination of 8 cards per page . 
context : wanted AI to paginate as this is a standard task that can be handled easily by AI . 
changes : it changed my getshipment controller function and implemented frontend changes in dashboard and it worked completely fine . 

11th prompt : 
-> Create a logout button and implement the functions necessary for logging out functionality. 
context : wanted AI to simply add a logout  feature 
changes : function and button were successfully implemented for frontend as well as backend .