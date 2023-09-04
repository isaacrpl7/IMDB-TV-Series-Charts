# About the project
This is a project made to visualize TV series episodes data. If you want to compare the ratings of the episodes from your favorite tv shows, you came to the right place! It's possible to see in a graphical way which season is the best, and how user vote count influences on the bayesian averages of the episodes. This bayesian concept comes from the knowledge that if an episode have a big rating (e.g. 9.5/10) but few people voted for this (e.g. only 2 votes), this means that this rating is not accurate, so we can recalculate using a formula what would be a more accurate rating. Test it live [here](https://imdb-tv-series-charts.vercel.app/) (it might be slower than it would be because of the free nature of the deployment server).

![image](https://github.com/isaacrpl7/IMDB-TV-Series-Charts/assets/50757880/dd18ddd4-48a2-43a0-8b28-36be555e1998)

## Running the project
In order to run the project, you have to first access [this](https://github.com/isaacrpl7/IMDBDataScraping) API and manage to run it on your computer.
Using preferably node 18.17.1 (including npm 9.6.7), run:
```
npm start
```
to start a local development server.

## Environment variable
The project requires only one environment variable. Locally, on the root of the project, create a file called _.env_ and set this variable:
```
REACT_APP_IMDB_SCRAPING_API=http://localhost:5000
```
You can change the API port based on your pc configurations.
