# Swiss geo tweet - Event detection and mobility patterns in Switzerland

## Abstract

The aim of this project is to:
- build a data set of events in Switzerland based on tweets from 2010 to 2016 (around 15 millions tweets), and maybe instagram posts an transform it into an exploitable data set for visualization (ex: timeline map, etc.)
- detect mobility patterns to analyse users daily work-home travels and details about the average swiss workers movements

With the event visualization, people will have the ability to over a range of dates and see the main events in Swizerland, the related keywords related to them, the number of people who tweeted about them as well as the number of tweets detected.

## Data Description

Our main source of data will be Twitter (and possibly Instagram posts).

There's already a dataset composed of tweets in Switzerland from 2010. The [Twitter API overview](https://dev.twitter.com/overview/api) gives informations about what fields can be fetched from tweets.

We don't already have a dataset containing Instagram posts in Switzerland and it is part of our project to see if we can get one. The [Instagram API endpoints](https://www.instagram.com/developer/endpoints/) gives informations about what can be fetched from Instagram posts (such as the [location](https://www.instagram.com/developer/endpoints/locations/)).

## Feasibility and Risks

This project will require some challenging tasks. First of all, we need to get the corresponding datas. As we don't have it for Instagram posts in Switzerland, we will need to find a way to get it for some months or years if possible. We can perform some Instagram Mining using [python-instagram]( https://github.com/facebookarchive/python-instagram).

For tweets, a dataset is already collected. Hence we have to extract the relevant informations which are mainly the events' hashtags, the localizations and maybe users' ids. One difficulty is that not all tweets were produced by a device enabling geo-location. It may decrease the size of our data.

In addition, once our data characteristics will be extracted from the tweets, one difficulty will be to infer the users' type of locations (workplace/home or in-between point). Then, we will need to identify events' hashtags. As they are not really structured (mispellings, lot of variants for the same event, etc.), it may be difficult to infer the correct context/informations from them. It will also be interesting to do some analysis on the selected tweets's texts in order to have an idea about an event's characteristics for instance.

Once both datasets are collected, we will need to merge them and think about a representation that makes the storage size not to big and that allows us to query the data easily.

One point we can notice is that the data may not be representative of all the population we're interested in (Twitter and Instagram accounts tends to be more popular and used by the new generations). 

## Possible timeplan

The first draft of the timeplan for this project is : 
- 1-2 weeks : research on what have been already done regarding work on mobility 
- 2 weeks : Fetching the data from Instagram for Switzerland and for some periods of time (if possible the same period as we have for the tweets : 2010-2016)
- 4 weeks : Interpreting the given datasets of tweets given.
- 1 week : Filtering the informations needed in these two datasets.
- 2-3 weeks : Thinking about a memory representation that could easily fit our final vizualisation.

## Deliverables

The final goal of this project is to deliver an exploitable data-set (ex: JSON file) of the population movements in Switzerland and its neighbor areas through time while giving some additional informations on key population gatherings such as events and others based on tweets and instagram posts.

The repository is decomposed into three parts:
 - event-detection: processing of the data for the events
 - mobility-pattern: processing of the data for the mobility patterns
 - viz: visualization for both tasks

## Assumptions

Some assumptions were made in order to obtain meaningful results.

#### Event detection

- we took a radius of 3km to cluster tweets based on their locations
- an event is described by its hashtags
- an event has a minimum number of tweets (50) and has been tweeted by at least 20 distinct people
- the ratio #tweets/#people to detect an event is less than 6 (in order to avoid detecting an event spammed by a bot for example)

#### Mobility pattern (detect user workplace)

 - 10+ tweets sent from the same location
 - at least 2 tweets have a 24 hours offset
 - has maximum frequency

## How to run
Clone the repo and open the HTML pages in viz/event/ for the events and viz/mobility for the mobility. There's an issue if you are using Chrome browser (it doesn't let you load the local data files we use for the visualization). Firefox and Safari should work.

#### Event detection
In order to run the event detection

## Posters
<img src="https://cloud.githubusercontent.com/assets/8789206/22499119/27cf9a90-e85d-11e6-9fe9-4f753211306c.jpg" width="49%">
<img src="https://cloud.githubusercontent.com/assets/8789206/22499118/27cef540-e85d-11e6-94ed-3744d3b96fed.jpg" width="49%">
