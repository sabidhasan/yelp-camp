const fakeData = {
    // "address": "26309 Hwy 16a, Acheson, AB  T7X 5A6",
    // "name": "Glowing Embers RV Park & Travel Centre",
    // "description": "", "comments": [], "importance": 50,
    // "excerpt": "edmonton", "type": "region", "keyword": "edmonton",
    // percentMatch, percentNormalizedMatch
    // "images": ["https://images.freeimages.com/images/large-previews/19a/tent-1-1552981.jpg"],
    // "wordsMatched": 1,
    // "id": 51,
    "campgroundName": "Glowing Embers RV Park & Travel Centre",
    "activities": [
      "cable tv hookups", "pull thru sites", "full hookup sites",
      "tenting sites", "dumping station", "open all year",
      "flush toilets", "pets allowed", "laundromat"
    ],
    "lat": 53.541219,
    "lon": -113.775276,
  }

export default (query) => {
  return new Promise(resolve => {
    const data = []
    for (var i = 50; i < 75; i++) {
      let regionAndProvince;
      if ((i - 49) % 5 == 0) {
        regionAndProvince = { province: 'Alberta', 'region': 'Edmonton' }
      } else if ((i - 49) % 4 == 0) {
        regionAndProvince = { province: 'Ontario', 'region': 'Thunder Bay' }
      } else if ((i - 49) % 3 == 0) {
        regionAndProvince = { province: 'British Columbia', 'region': 'Kelowna' }
      } else if ((i - 49) % 2 == 0) {
        regionAndProvince = { province: 'Manitoba', 'region': 'North Lake' }
      } else {
        regionAndProvince = { province: 'Quebec', 'region': 'Montreal' }
      }


      data.push({ ...fakeData, id: i, ...regionAndProvince});
    }
    resolve(data)
  })
}
