import numpy as np
def haversine(lat1, lon1, lat2, lon2):
    # calculate distance between two GPS coordinates
    R = 3958.76 # Earth radius in miles
    dLat, dLon, lat1, lat2 = np.radians(lat2 - lat1), np.radians(lon2 - lon1), np.radians(lat1), np.radians(lat2)
    a =  np.sin(dLat/2) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin(dLon/2) ** 2
    c = 2*np.arcsin(np.sqrt(a))
    return R * c

class trip:
    def __init__(self, lat, lon, time_start):
        self.lat = lat
        self.lon = lon
        self.time_start = time_start

def get_score(my_trip, target, radius = 1, allowed_time_delta = 60):
    start_dist = haversine(my_trip.lat,my_trip.lon,target.lat,target.lon)
    ##user specified filters
    if start_dist > radius:
        return 10000
    end_dist = haversine(my_trip.lat,my_trip.lon,target.lat,target.lon)
    ##user specified filters
    if end_dist > radius:
        return 10000
    time_delta = abs(divmod((my_trip.time_start - target.time_start).total_seconds(), 60)[0])
    ##user specified filters
    if time_delta > allowed_time_delta:
        return 10000
    return start_dist * 100 + end_dist * 100 + time_delta * 3