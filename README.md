## Application Maintanence Instructions

Due to things being changed on a yearly basis for this application there are some minor updates that need to take place with the application each year. Most of the necessary updates are assigned to variables inside the ./src/utils/constants.js file.

Below you will find a brief description of each variable and what it controls

# To update session start, short answer questions, the list of senators, forms, or essay questions:

1. Inside the folder structure for the application navigate to the following and open the file:
   - ./src/utils/constants.js
2. Here is a list of the variables and what they manage:
   - sessionStart = the date during which session starts. This will need to be updated yearly.
   - extrasFormURL = the form URL for the extracurricular's form. If this is ever updated, you'll need to paste the new URL here.
   - endorsementsFormURL = the form URL for the endorsements form. If this is ever updated, you'll need to paste the new URL here.
   - dueDate = the date in which the application closes for the year. You must copy the same format: "October 17, 2022 at 5:00 PM EST"
   - essayTopics = an array that takes two essay topics seperated by a comma. The topics must be in either backticks or quotation marks and in between brackets.
   - shortAnswerTopics = an array that takes short answer topics. The topics must be in either backticks or quotation marks and in between brackets.
   - districtArray = if a senator changes, you must edit this array to keep it current, this should only be relevant after election years.
3. Edit the information as needed, then run yarn build once the necessary edits are completed.
4. Transfer the contents of the "build" folder onto our servers inside /var/www/...

## React-Boilerplate Readme

## Custom Details

This project is created as a v2 of the page application.

Things to update yearly are all inside the ./utils/constants file

## React Documentation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
