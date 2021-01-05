# Bubble Ball: How the Pandemic Affected NBA & WNBA Performance
[Deployed here](https://tylerspck.github.io/Bubble_ball)
## Object 
How important are live fans for a win? We wanted to know how professional sports have fared in this new empty-stadium world. 
Since the NBA/WNBA had nearly-complete seasons compared to other pro-sports, we analyzed those leagues' performances before and during the Covid-19 pandemic in order to see how player performance was impacted without fans, i.e. "in the bubble." 
We trained two models (Random Forest and Sequential with hidden layers) on pre-COVID player stats to predict the outcome of the game: win or loss. This is the "performance with fans" baseline. Then we ran the fanless player game stats into the trained model to quantify the impact of missing fans on our predictions. We pulled player stats per game from 2015 through 2020 via the SportRadar API, first Schedule per year then looping through the games to get Game Summary per player stats.
## Machine Learning Results
### Deep Learning Models
* Random Forest gets us to 69% accuracy predicting win/loss based on per player game stats - not bad! Unsurprisingly, Points, Rebounds, Shooting Percentage, and Assists have the greatest impact.
* Sequential comes in at 60% accuracy (and up to 68% accuracy in epoch 100.)
### Pre-Covid Trained Models vs. Fan-less Data
* Playing without fans drops our Random Forrest prediction by 15% (down to 54% vs fan data prediction of 69%)
* Playing without fans drops our Sequential prediction by 8% (down to 52% from 60%)
## Data Sources 
* SportRadar API
* Basketball-Reference.com
## Visualizations 
* Bar chart racers for player point totals in NBA, WNBA
* Linear regression charts for each player pre-Covid and during Covid (using D3, Plotly)
* Tableau charts showing statistical data for each player
* HTML site displaying all of the information. 
## Tech Environment 
D3, Plotly,  HTML5, Looping API calling, Bootstrap, Slack, Zoom, GitHub, VSCode, TensorFlow, SDKLearn 


Message Sarah Grant














Deployed here: https://tylerspck.github.io/Bubble_ball
