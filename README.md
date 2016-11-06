# Swiss geo tweet - Affluence map and mobility patterns in Switzerland

## Abstract

The aim of this project is to:
- build an affluence map of Switzerland based on various social network sources (geo-located tweets and possibly instagram posts at the moment)
- infer mobility patterns from it and try to detect from regular events (ex: people living in the Vaud canton but working in the Geneva canton) to major events (ex: Paleo Festival, Geneva auto showroom)

Using this timeline map, people will have the ability to get an affluence visualization other the time (months, days, hours) and space (main axes, cantons, cities, places). From there, they can filter the map and display the locations they want to visit according if it's crowded or not at that time of the year/day.

## Data Description

Our main source of data will be Twitter and Instagram posts.

There's already a dataset composed of tweets in Switzerland from 2012. The [Twitter API overview](https://dev.twitter.com/overview/api) gives informations about what fields can be fetched from tweets

We don't already have a dataset containing Instagram posts in Switzerland and it is part of our project to see if we can get this data. The [Instagram API endpoints](https://www.instagram.com/developer/endpoints/) gives informations about what can be fetched from Instagram posts.
We can use [Instagram API Location](https://www.instagram.com/developer/endpoints/locations/) to get either the posts coming from a certain location or the id that is given to a location.

## Feasibility and Risks
As we don't have a dataset with Instagram posts in Switzerland, we will need to find a way to get all this data for some months or years if possible. That will be one of the difficulties of the project.
It is still something feasible. We indeed can perform some Instagram Mining using the specific library: python-instagram (https://github.com/facebookarchive/python-instagram).

On the Twitter data side, as previously said, we already have a tweets dataset. We thus need to extract from these the relevant informations which are mainly the event hashtags, user id and localizations. One difficulty is that not all tweets were produced by a device enabling geo-location. This will highly decrease the size of our data.
In addition, once our data characteristics will be extracted from the tweets, one difficulty will be to infer on the user's type of locations (workplace/home or in-between point). We then will need to identify hashtags of events from the others. It will also be interesting to do some analysis on the selected tweets's texts in order to have an idea about an event's characteristics for instance.

If our Instagram dataset is enough substantial, a difficult step will be its merge with the Tweet dataset in order to obtain harmonized data.

Finally, we will need to create an interactive map to visualize our population flows over time , the tweet's data as well as the identification of a given event and its description/analysis.

## Deliverables

As previously explained, the final goal of this project is to deliver this interactive visualization of the population movements in Switzerland and its neighbor areas through time while giving some additional informations on key population gatherings such as events and others. We can also imagine that this map can be given with clean and explicit data tables which will be easily queryable for further applications.

## Timeplan
