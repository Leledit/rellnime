<h1 align="center">ReelNime</h1>

![Linguagem mais usada](https://img.shields.io/github/languages/top/Leledit/rellnime)
![Numero de lingaugens usadas](https://img.shields.io/github/languages/count/Leledit/rellnime)
![Lincense](https://img.shields.io/github/license/Leledit/rellnime)
![Tamanho do projeto](https://img.shields.io/github/languages/code-size/Leledit/rellnime)

# Project description

This project consists of a website that offers access to a catalog of anime and films. Previously, I used to keep track of the anime and films I was watching by writing down notes in a notebook, recording their names and descriptions. At a certain point, I realized that it would be advantageous to develop a system to manage this information, which gave rise to the idea for this project.

In addition to solving this control issue, another big motivation behind this project was the opportunity to improve my skills with Next.js. I was interested in exploring version 14 of this library, which was recently released. This project also marks my debut in creating websites, containing tests.

# Starting the project

To start the project, follow the steps below:

- Open a terminal in the project folder.

- Start the project with the command:

        npm install

- Start the project with the command:

        npm run dev

- Now you can open your browser and access the following URL:

        http://localhost:3000

Make sure all dependencies are installed correctly before starting the project.

# Environment variables

An environment variables file must be created, containing the following variables:

    URL_API_BASE=http://localhost:8080/api/v1

# API execution

This project depends on an API that shares the same name and is hosted in the following repository:

    https://github.com/Leledit/Api_ReelNime

To use this project, you need to follow the steps below:

- Clone the above project and start running it.
- Configure a MongoDB database.
- Populate the database with the data contained in the API 'Bd' folder.
- It is essential to guarantee the execution of the project, as its use directly depends on this stage.

# main features of the project

The project offers the following functionalities:

- Registration of anime and films.
- Registration of genres.
- Adding or removing genres from a title.
- Title exclusion.
- Title update.
- Listing by category.
- Listing by genre.
- Title preview.
- Creation of user account.
- User profile.

Note: whenever "title" is mentioned, it refers to anime/movies

# Project Architecture

The folder structure adopted by the project was as follows:

Public:

- css: .css files used in different parts of the project.
- images: Images used in the project, organized by category.
  src/app:

- \_adapter: Here are all external interactions, that is, calls to the API. These calls are grouped into subfolders by categories.
- \_components: All components used in the application are stored here and are divided into three categories (adm/general/user), related to the location where they are applied.
- \_interface: All interfaces used in the project are stored here.
- \_ui: Application icons are kept here.
- \_utils: The utility functions used in the project are stored here.
- admin: Pages that make up the administrative area of the project.
- authentication: Pages related to application authentication.
- home: Pages available to users.
