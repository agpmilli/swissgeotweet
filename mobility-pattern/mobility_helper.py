import pandas as pd
    
def replaceLatitude(row):
    if pd.isnull(row.latitude):
        return row.placeLatitude
    else:
        return row.latitude

def replaceLongitude(row):
    if pd.isnull(row.longitude):
        return row.placeLongitude
    else:
        return row.longitude

