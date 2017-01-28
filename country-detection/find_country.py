import copyshapes
import countries
import pandas as pd

copyshapes.filter_file(lambda x: x.GetField('REGION') == 150,'TM_WORLD_BORDERS/TM_WORLD_BORDERS-0.3.shp', 'EUROPE.shp')
def in_switzerland(row):
    longitude = row['longitude']
    latitude = row['latitude']
    cc = countries.CountryChecker('TM_WORLD_BORDERS/TM_WORLD_BORDERS-0.3.shp')
    country = cc.getCountry(countries.Point(latitude, longitude)).iso
    return country
 
tweets = pd.read_csv("../twitter-swisscom/twex_event_before_country.csv", sep=',', encoding='utf-8')
tweets['country'] = tweets.apply(in_switzerland, axis=1)
tweets.to_csv("../twitter-swisscom/twex_event_country.csv", sep=',', encoding='utf-8', index=False)