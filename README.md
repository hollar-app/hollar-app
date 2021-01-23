# Hollar Core
## Overview
This is my current favorite tech stack for building serverless React apps.
* ⚛️ [**Next.js**](https://nextjs.org/docs) — A React framework with file-based page routing, server-side rendering, and serverless API routes built in (works very similarly to standard React/CRA).
* 🔥️ [**Firebase**](https://firebase.google.com/docs/web/setup) — A backend platform with robust, easy-to-use APIs for authentication, databases, file storage, and more.
* 🎨️ [**Chakra UI**](https://chakra-ui.com/docs/getting-started) — A React component library with pre-built components and prop-based styling.
## Getting Started
* Create a `.env` file and copy in the contents of `example.env`
* [Register your app](https://firebase.google.com/docs/web/setup?authuser=1#register-app) with your Firebase project and fill in `.env` with the provided values
* Install dependencies by running `yarn install`
* Run the development server by running `yarn dev`


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Using Firebase

In order to access the initialized `Firebase` app, import the `fb` class from `/util/firebaseConfig`
```javascript
import fb from "../util/firebaseConfig";

var firestore = fb.firestore()
var auth = fb.auth()
```

***Note***: Remember to use `fb` and not just `firebase`. The `fb` class refers to the initialized `Firebase` app.

Before:
```javascript
// From the docs
firebase.firestore().collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
```

After:
```javascript
// From the docs
fb.firestore().collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
```
## Accessing the current Firebase session

To access information such as the current user's authentication state or their profile, simple access the `session` object through `SessionContext`

From any component:
* Import `SessionContext` from `/util/SessionContext.ks`
* Import `useContext` from `react`
* Access the `session` object through the `useContext()` hook
```javascript
const session = useContext(SessionContext)
// or
const {status, user} = useContext(SessionContext)
```

- **status**: Changes between 'LOADING', 'AUTHENTICATED', and 'ANON' depending on the authentication state
- **user**: The current [Firebase User](https://firebase.google.com/docs/reference/js/firebase.User?authuser=1#properties_1) (is `undefined` if there's no user logged in)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
