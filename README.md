# Rasa Programming Tutorial
<img src="square-logo.svg" width=255 height=255 align="right"> 

This repository contains a collection of tutorials that will help you understand the Rasa framework. Basic concepts of Rasa (e.g., Intent, Entity, Response, Action, Slot, Form) will be explained in a series of examples. Several chatbot interfaces are also included in this repository. Note that all the demos here are built and tested with Rasa 2.5. 


This project is built upon the following repositories:
* https://github.com/RasaHQ/rasa-2.x-form-examples
* https://github.com/scalableminds/chatroom
* https://github.com/vishwaspuri/Interactive-Voice-Response

##	Steps to use

* Before starting the installation process, please ensure that you have conda/virtualenv installed.

* Firstly we install all the dependencies:

  1. Clone the repository

  ```bash
  git clone https://github.com/QingyuGuo/rasa-2.5-tutorial.git
  ```

  2. Change into project directory:

  ```bash
  cd rasa-2.5-tutorial/
  ```

  3. Create python environment

  ```bash
  conda create --name <environment-name> python=3.8 
  ```

  4. Activate environment

  ```bash
  conda activate <environment-name>
  ```

  5. Install dependencies

  ```bash
  pip install -r requirements.txt
  ```

## Rasa Examples

### 0. Initial Project

It helps to understand basic structures of Rasa project.

Code can be found in the `./chatbot/00-rasa-init` folder.

### 1. Custom Actions

It helps to understand custom actions. In this simple bot we show how to get the current time. 

Code can be found in the `./chatbot/01-actions` folder.

### 2. Slots 

It helps to understand slots, the memory of the bot. In this simple bot we show how they work by keeping track of a users name. 

Code can be found in the `./chatbot/02-slots` folder.

### 3. Entities 

It helps to understand how to extract entities from a sentence. In this simple bot we show how to recognize the name of the user from an utterance. 

Code can be found in the `./chatbot/03-entities` folder.


### 4. Forms

If we want to query multiple things from the user, it may be best to use forms instead of custom actions. Luckily for us, we can use our `RulePolicy` to help us out.

Code can be found in the `./chatbot/04-forms` folder. 

### 5. Wellness bot

It will be helpful to understand the concepts we have learned in the above examples. We build a bot to ask users status and goals, and could be further modified for providing activity recommendation.

Code can be found in the `./chatbot/05-wellness-bot` folder. 

## Web Interface

### 1. Chatroom

The project `./UI/chatroom` provides a basic interface for interacting with bots in the webpage, which supports text and voice as input. Please refer to https://github.com/scalableminds/chatroom for more details.

* In your Rasa bot setup, make sure to include the Rasa [REST channel](https://rasa.com/docs/rasa/user-guide/connectors/your-own-website/#rest-channels) in your `credentials.yml` file:
```bash
rest:
  # pass
```

* Install the dependencies for web application
```bash
cd UI/chatroom
# install dependencies if you have not installed
yarn install
``` 

* Usage - You need to open 3 terminal/shell windows:


*Terminal-1*: For Rasa server. Depending on your setup you might need to add CORS headers, e.g. `--cors "*"`.

```bash
# change to chatbot directory (just an example)
cd chatbot/05-wellness-bot
# Run Rasa server
rasa run --credentials ./credentials.yml  --enable-api --auth-token XYZ123 --model ./models --endpoints ./endpoints.yml --cors "*"
```

*Terminal-2*: Run Rasa action server if you need customized actions

```bash
# change to chatbot directory (just an example)
cd chatbot/05-wellness-bot
# Run Rasa action server
rasa run actions
```

*Terminal 3*: For web application
   
```bash
cd UI/chatroom
# run the local host
yarn serve
```
Open `http://localhost:8080/demo.html` in your browser.


### 2. Interactive-Voice-Response
* The original project: https://github.com/vishwaspuri/Interactive-Voice-Response I make slight modifications here.



* Usage - You need to open 3 terminal/shell windows:


*Terminal-1*:  For Rasa server 

```bash
# change to chatbot directory (just an example)
cd chatbot/05-wellness-bot
# run RASA core server
rasa run --enable-api --verbose
```

*Terminal-2*: For  RASA actions server

```bash
# change to chatbot directory (just an example)
cd chatbot/05-wellness-bot
# run RASA actions server
rasa run actions
```

*Terminal-3*:  For web application

```bash
# change directory to webapp
cd UI/Interactive-Voice-Response/backend
# run web application server
uvicorn app:app --reload --port 8000
```


  On successfully running these, commands you will be able to run the chatbot in your browser on the address **localhost:8000**.



## Other Resources

* Rasa official introduction: [Read Docs](https://rasa.com/docs/rasa/2.x/) 
* Rasa 2.x examples: [Learn Rasa programming via simple examples](https://github.com/RasaHQ/rasa-2.x-form-examples)
* Rasa chatbot examples: [Rasa chatbots](https://github.com/RasaHQ)
* If you have questions: [Rasa Community Forum](https://forum.rasa.com/)
