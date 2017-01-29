import copyshapes
import countries
import pandas as pd

copyshapes.filter_file(lambda x: x.GetField('REGION') == 150,'TM_WORLD_BORDERS/TM_WORLD_BORDERS-0.3.shp', 'EUROPE.shp')
def work_country(row):
    longitudeWork = row['workLong']
    latitudeWork = row['workLat']
    
    cc = countries.CountryChecker('TM_WORLD_BORDERS/TM_WORLD_BORDERS-0.3.shp')
    country = cc.getCountry(countries.Point(latitudeWork, longitudeWork)).iso
    return country
    
def home_country(row):
    longitudeHome = row['homeLong']
    latitudeHome = row['homeLat']
    
    cc = countries.CountryChecker('TM_WORLD_BORDERS/TM_WORLD_BORDERS-0.3.shp')
    country = cc.getCountry(countries.Point(latitudeHome, longitudeHome)).iso
    return country
 
tweets = pd.read_csv("../twitter-swisscom/users.csv", sep=',', encoding='utf-8')
tweets['homeCountry'] = tweets.apply(home_country, axis=1)
tweets['workCountry'] = tweets.apply(work_country, axis=1)
tweets.to_csv("../twitter-swisscom/users_country.csv", sep=',', encoding='utf-8', index=False)