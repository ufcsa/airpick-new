CSA Airpick was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Airpick
A platform for new international students and volunteers, providing free local airport pickup service and temporary lodging service before moving into dorm.

## Project Structure
Airpick's frontend and backend are separated. Frontend uses React.js, backend uses Nodejs. Frontend communicates with backend through RESTful APIs and JSON.  
```
|-----client/           #client side     
|-----public/           #public resources for frontend   
|-----server/           #server side   
|-----build/            #built version of frontend app for production   
|-----config/           #configs for frontend app   
|-----scripts/          #npm scripts, comes with CRA   
|-----server.js         #entry of backend service   
|-----package.json      #dependency   
|-----package-lock.json #dependency with version and integrity checking  
|-----Dockerfile        #docker for deploy  
```
