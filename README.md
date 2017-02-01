# Swiss geo tweet - Affluence map and mobility patterns in Switzerland

## Abstract

The aim of this project is to:
- build a data set of Switzerland based on various social network sources (geo-located tweets and possibly instagram posts at the moment) to compute a flow analysis into an exploitable dataset for visualization (ex: timeline map, etc.)
- infer mobility patterns from it and try to detect from regular events (ex: people living in the Vaud canton but working in the Geneva canton) to major events (ex: Paleo Festival, Geneva auto showroom)

With the visualization, people will have the ability to get an affluence overview in time (months, days, hours) and space (main axes, cantons, cities, places). From there, they can filter the map and display the locations they want to visit according if it's crowded or not at that time of the year/day.

## Data Description

Our main source of data will be Twitter (and possibly Instagram posts).

There's already a dataset composed of tweets in Switzerland from 2012. The [Twitter API overview](https://dev.twitter.com/overview/api) gives informations about what fields can be fetched from tweets.

We don't already have a dataset containing Instagram posts in Switzerland and it is part of our project to see if we can get one. The [Instagram API endpoints](https://www.instagram.com/developer/endpoints/) gives informations about what can be fetched from Instagram posts (such as the [location](https://www.instagram.com/developer/endpoints/locations/)).

## Feasibility and Risks

This project will require some challenging tasks. First of all, we need to get the corresponding datas. As we don't have it for Instagram posts in Switzerland, we will need to find a way to get it for some months or years if possible. We can perform some Instagram Mining using [python-instagram]( https://github.com/facebookarchive/python-instagram).

For tweets, a dataset is already collected. Hence we have to extract the relevant informations which are mainly the events' hashtags, the localizations and maybe users' ids. One difficulty is that not all tweets were produced by a device enabling geo-location. It may decrease the size of our data.

In addition, once our data characteristics will be extracted from the tweets, one difficulty will be to infer the users' type of locations (workplace/home or in-between point). Then, we will need to identify events' hashtags. As they are not really structured (mispellings, lot of variants for the same event, etc.), it may be difficult to infer the correct context/informations from them. It will also be interesting to do some analysis on the selected tweets's texts in order to have an idea about an event's characteristics for instance.

Once both datasets are collected, we will need to merge them and think about a representation that makes the storage size not to big and that allows us to query the data easily.

One point we can notice is that the data may not be representative of all the population we're interested in (Twitter and Instagram accounts tends to be more popular and used by the new generations). 

## Deliverables

As previously explained, the final goal of this project is to deliver an exploitable data-set (ex: JSON file) of the population movements in Switzerland and its neighbor areas through time while giving some additional informations on key population gatherings such as events and others based on tweets and instagram posts.

## Possible timeplan

The first draft of the timeplan for this project is : 
- 1-2 weeks : research on what have been already done regarding work on mobility 
- 2 weeks : Fetching the data from Instagram for Switzerland and for some periods of time (if possible the same period as we have for the tweets : 2012-2016)
- 4 weeks : Interpreting the given datasets of tweets given.
- 1 week : Filtering the informations needed in these two datasets.
- 2-3 weeks : Thinking about a memory representation that could easily fit our final vizualisation.


![alt tag](https://raw.github.com/agpmilli/swissgeotweet/master/img/event_detection_poster.jpg)
![alt tag](https://raw.github.com/agpmilli/swissgeotweet/master/img/mobility_pattern_poster.jpg)
