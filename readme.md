# Surveyed App 
React & NodeJS based app for sending simple surveys and get feedback from users. Before sending surveys user must create account and buy credits. One credit allow user to send one email to many recipients with single polar question.

This is a good start point to build scalable survey application with many features. 

### Checkout demo
Here is a [demo](https://murmuring-waters-13033.herokuapp.com) which presents already implemented features.
Example data to Stripe checkout
```
Email: test@test.pl
Card number: 4242 4242 4242 4242
Card expiration date: 10/20
Card CVC code: 123
```


### How to run it from source code
1. Create credentials for application on [Console Developers Google](https://console.developers.google.com) to get Client ID and Client Secret Token
1. Create MongoDB database on [mLab](https://mlab.com/)
1. Create account on [Stripe](stripe.com) to get keys for payments feature
1. Create account on [SendGrid](sendgrid.com) to get keys for email sending feature
1. Update `.env.development` with your personal keys
1. Create `dev.js` file based on `config.example.js` file
1. Install all dependencies by `npm i` or `yarn` for client side and server side
1. Run `npm run dev` or `yarn run dev` in root directory - for NodeJS server
1. Run `npm start` or `yarn start` in client directory - for React app

### Used technologies
* Node.js
* MongoDB
* React & Redux
* React Create App
* Passport
* Google OAuth
* Stripe
* SendGrid

