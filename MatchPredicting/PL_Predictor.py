## Erik Cupsa 
## PL Predictor using scikit-learn to predict from the matches.csv stat sheet containing data from all matches from 2022-2020

import pandas as pd 
matches = pd.read_csv("matches.csv", index_col = 0)

##converting all objects to int or float to be processed by the machine learning software
matches["date"] = pd.to_datetime(matches["date"])
matches["h/a"] = matches["venue"].astype("category").cat.codes ## converting venue to a home (1) or away (0) number
matches["opp"] = matches["opponent"].astype("category").cat.codes ## converting opponents to a number
matches["hour"] = matches["time"].str.replace(":.+", "", regex=True).astype("int") ## converting hours to number in case a team plays better at a certain time
matches["day"] = matches["date"].dt.dayofweek ## converting day of week of game to a number

matches["target"] = (matches["result"] == "W").astype("int") ## setting a win to the value 1

from sklearn.ensemble import RandomForestClassifier ##importing machine learning for non linear data

rf = RandomForestClassifier(n_estimators = 100, min_samples_split=10, random_state=1)
train = matches[matches["date"] < '2022-01-01'] 
test = matches[matches["date"] > '2022-01-01']
predictors = ["h/a", "opp", "hour", "day"]
rf.fit(train[predictors], train["target"])
RandomForestClassifier(min_samples_split = 10, n_estimators = 100, random_state = 1)
preds = rf.predict(test[predictors]) ##making prediction

from sklearn.metrics import accuracy_score
acc = accuracy_score(test["target"], preds) ## testing accuracy
acc
combined = pd.DataFrame(dict(actual=test["target"], prediction=preds))
pd.crosstab(index=combined["actual"], columns=combined["prediction"])

from sklearn.metrics import precision_score
precision_score(test["target"], preds)

grouped_matches = matches.groupby("team") 
group = grouped_matches.get_group("Manchester United").sort_values("date")
 
def rolling_averages(group, cols, new_cols): ## function to take into consideration form of a team
    group = group.sort_values("date") ## sorting games by date 
    rolling_stats = group[cols].rolling(3, closed='left').mean()
    group[new_cols] = rolling_stats
    group = group.dropna(subset=new_cols) ##droping missing values and replacing with empty
    return group 

cols = ["gf", "ga", "sh", "sot", "dist", "fk", "pk", "pkatt"] 
new_cols = [f"{c}_rolling" for c in cols] ## creating new columns with rolling average values 

rolling_averages(group, cols, new_cols) ## calling function and generating average of last 3 games

matches_rolling = matches.groupby("team").apply(lambda x: rolling_averages(x, cols, new_cols))
matches_rolling = matches_rolling.droplevel('team') ## dropping extra index level

matches_rolling.index = range(matches_rolling.shape[0]) ## adding new index
matches_rolling
def make_predictions(data, predictors): ## making the predictions
    train = data[data["date"] < '2022-01-01'] 
    test = data[data["date"] > '2022-01-01']
    rf.fit(train[predictors], train["target"])
    preds = rf.predict(test[predictors]) ##making prediction
    combined = pd.DataFrame(dict(actual=test["target"], prediction=preds), index=test.index)
    precision = precision_score(test["target"], preds)
    return combined, precision ## returning the values for the prediction

combined, precision = make_predictions(matches_rolling, predictors + new_cols)

precision

combined 

combined = combined.merge(matches_rolling[["date", "team", "opponent", "result"]], left_index = True, right_index = True)
combined

class MissingDict(dict): ## creating a class that inherits from the dictionary class
    __missing__ = lambda self, key: key ## in case a team name is missing

map_values = {
    "Brighton and Hove Albion": "Brighton",
    "Manchester United": "Manchester Utd",
    "Tottenham Hotspur": "Tottenham", 
    "West Ham United": "West Ham", 
    "Wolverhampton Wanderers": "Wolves"
}
mapping = MissingDict(**map_values)
mapping["West Ham United"]

combined["new_team"] = combined["team"].map(mapping)
combined

merged = combined.merge(combined, left_on=["date", "new_team"], right_on=["date", "opponent"]) ## finding both the home and away team predictions and merging them 
merged


## project inspired by dataquest tutorial 
