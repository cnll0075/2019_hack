# 2019_hack

Sampling method:

Using data from Intersection Traffic Counts 2010 to 2017, we sampled 1000 trips (starting-ending coordinate pairs) according to their peak traffic volume (such that busy intersections have a higher probability of being included in the samples), and through analyzing the overlap of these trips, our simulation showed that on average, about 5-8% of trips could be shared by at least 2 users.

In stage I of our app, starting from only traffic pattern, but no individual user data, we built our car sharer recommendation system by creating a heuristic based linear score system. The scores are determined by distance of starting and end points, the amount of overlaps in trips, and differences in trip start time. In this first stage, the impression and user engagement data will be saved for creating better/smarter algorithms for sharing recommendation.

In stage II, based on user engagement data collected in stage 1, we will have user preference ground truth data which can be used as labelled data in supervised learning algorithms. Namely, we will use deep learning based LearningToRank (LtR) algorithm to better find correct match for users and identify important (hidden) features that affect user's rider choice. The algorithm will generalize user preferences and optimize the top matchers for each user.

In stage III, we will leverage on the large scale of collected data to help decision makers to improve public transportation planning，such as developing new bus routes to complement with/facilitate ride sharers for highly shared routes, and optimizing traffic light schedule for heavily overlapped routes. Big data insights for decision making



