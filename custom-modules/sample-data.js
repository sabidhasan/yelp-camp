var commonWords = require('common-words');

activities = [
  {name: 'Canoeing', logo: '🚣'},
  {name: 'Spa / Sauna', logo: '💆'},
  {name: 'Summer camp', logo: '⛺'},
  {name: 'Beach swimming', logo: '🏊'},
  {name: 'Cycling trails', logo: '🚲'},
  {name: 'Fishing', logo: '🐟'},
  {name: 'Hiking trails', logo: '🗻'},
  {name: 'Tennis', logo: '🎾'},
  {name: 'Basketball', logo: '🏀'},
  {name: 'Kids activities', logo: '👶'}
];

campgrounds = [
  {'province': 'New Brunswick', 'lat': 48.0073373, 'name': 'Campbellton RV Camping VR de Campbellton\xa0(campbelltonrv)', 'image': 'https://images.freeimages.com/images/large-previews/19a/tent-1-1552981.jpg', 'lon': -66.6777993,
  'sites': 86, 'email': 'rvcampingrv@campbellton.org', 'hours': {'seasonal': ['May 18', 'October 1'], 'daily': '10\xa0am to 9\xa0pm'}, 'phone': '(506)789-2850',
  'activities': [
    {name: 'phone', logo: "*"},
    {name: 'Full hookup sites', logo: "*"},
    {name: 'Pets allowed', logo: "*"},{name: 'Internet access', logo: "*"},{name: 'Laundromat', logo: "*"},
    {name: 'Seasonal sites', logo: "*"},{name: 'Picnic tables', logo: "*"},{name: 'Propane gas', logo: "*"},
    {name: 'Convenience store', logo: "*"},{name: 'Ice', logo: "*"},{name: 'Restrooms', logo: "*"},
    {name: 'Tenting sites', logo: "*"},{name: 'Fishing', logo: "*"},{name: 'RV supplies', logo: "*"},
    {name: 'Hiking trails', logo: "*"},{name: 'Horseshoes', logo: "*"},{name: 'Canoeing', logo: "*"},
    {name: 'Flush toilets', logo: "*"},{name: 'Kayaking', logo: "*"},{name: 'Motor boating', logo: "*"},
    {name: 'Dumping station', logo: "*"},{name: 'Gasoline', logo: "*"},{name: 'Hot showers', logo: "*"},
    {name: 'Firewood', logo: "*"},{name: 'Dishwashing station', logo: "*"}],
    'paymentMethods': ['interac', 'cash'],
    'comments': [],
  'address': '1 Riverview Drive, Campbellton, NB\xa0 E3N 0E1', 'prices': {'seasonal': null, 'daily': ['38.00', '55.00'], 'weekly': null},
  'region': 'Restigouche', 'type': 'Municipal', 'id': 50,
  'description': 'Campbellton RV Camping is a RV park that is part of the attractions of the Restigouche River Experience Centre located on the outskirts of this majestic river famous for salmon fishing. 86 sites. 3 services. 30 and 50 amps. Pulltrough and regular. 7th night free. 18 seasonal sites available.'},


  {id: 0, name: "Salmon Creek 0", province: 'Alberta', activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: 0, lon: 0, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A tiny town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [{id: 0, author: 'Test', time: '12:24', text: 'test comment', rating: 2}, {id: 1, author: 'Test 2', time: '12:24', text: 'test comment 2', rating: 4}], image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"},
  {id: 1, name: "Black Creek 1", province: 'Alberta Black', activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890000', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: 10, lon: 10, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 2, name: "Salmon Creek 2", province: 'Alberta', activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -100, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 3, name: "Salmon Creek 3", province: 'Alberta', activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -100, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 4, name: "Salmon Creek 4", province: 'Alberta', activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -80, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 5, name: "Salmon Creek 5", province: 'Alberta', activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -70, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 6, name: "Salmon Salmon 6", province: 'Alberta', activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -129, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 7, name: "Salmon Creek 7", province: 'Alberta', activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -129, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/558454/pexels-photo-558454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 8, name: "Salmon Creek 8", province: 'Alberta', activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -15 , lon: 30, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/176381/pexels-photo-176381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 9, name: "Salmon Creek 9", province: 'Alberta', activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -129, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/116104/pexels-photo-116104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
]

module.exports = {
  campgrounds: campgrounds,
  quotes: [
    "Time camping isn’t time spent, it’s invested",
    "Away is a place where it’s not about the money you spend.It’s about the moments you share",
    "Hike more, worry less",
    "Oh darling, let's be adventurers",
    "I felt my lungs inflate with the onrush of scenery. Air, mountains, tree, people. I thought: this is what it is to be happy",
    "Life begins when you start saying 'Yes'",
    "There is no Wi-fi in the forest, but I promise you will find a better connection",
    "I am most alive among tall trees",
    "Camping is “Home”",
    "Wander often, wander always. because not all who wander are lost",
    "Just GO!",
    "Don’t let your dreams be dreams",
    "There’s no place like camp. I wish I could stay forever",
    "I don’t need Therapy. I just need to go camping",
    "Explore.",
    "The Mountains Are Calling And I Must Go",
    "A Bonfire Is Basically Just A Nightclub In The Mountains",
    "Live Laugh Camp",
    "Be Brave Run Free And Stay Wild",
    "Camping is the answer",
    "Collect memories, not things",
    "Life is better in the woods",
    "Cold Air Dark Night Warm Fire Bright Stars",
    "Camp more, worry less",
    "Of all the paths you can take in life, make sure a few of them are dirt",
    "The forest makes your heart gentle",
    "Adopt the pace of nature: her secret is patience",
    "Adventure is waiting",
    "Born to camp",
    "Nothing adventured, nothing attained",
    "The earth has music for those who listen",
    "Wander without a reason or purpose",
    "Live in the sunshine, swim in the sea, drink the wild air",
    "The poetry of the earth is never dead",
    "I took a walk in the woods and came out taller than the trees",
    "Take only memories, leave only footprints",
    "Camping is nature's way of promoting the motel business",
    "A crude meal, no doubt, but the best of all sauces is hunger.",
    "A great many people, and more all the time, live their entire lives without ever once sleeping out under the stars",
    "The stars were better company anyway. They were very beautiful, and they almost never snored.",
    "“Forget not that the earth delights to feel your bare feet and winds long to play with your hair",
    "Nature gives to every time and season some beauties of its own",
    "Choose only one master – Nature",
    "We do not see nature with our eyes, but with our understandings and our hearts"
  ],
  getRandomActivities: function() {
    return [activities[4], activities[7], activities[2]]
  },
  activities: activities,
  searcher: class Searcher {
    constructor(campgrounds) {
      /* CONSTANTS */
      this.provinces = {'ab': 'alberta', 'bc': 'british columbia'}
      this.provincesReversed = {'alberta': 'ab', 'british columbia': 'bc'}
      this.punctuation = ['!', '.', ';', '’s', ',']
      this.badWords = commonWords.map(val => val.word).concat(['near', 'within', 'kms']);
      this.sanitize = (word) => {
        // strip empty spaces
        word = word.replace(/^\s+|\s+$/g, '');
        // remove punctuation
        this.punctuation.forEach(val => word = word.replace(val, ''));
        return word;
      }

      /* SEARCH INDEX */
      this.invertedIndex = {}

      this.buildSearchIndex(campgrounds);
    }

    buildSearchIndex(campgrounds) {
      campgrounds.forEach((cg, idx) => {
        //we build an index like this: {'keyword': [empty, empty, [{type: 'activity', importance: 50}, {type: 'description', importance: 4}], empty]}
        const categoryDict = {
          'name': {
            data: cg.name.split(' '),
            func: parseName
          },
          'paymentMethods': {
            data: cg.paymentMethods,
            func: parsePaymentMethods
          },
          'activities': {
            data: cg.activities.map(val => val.name),
            func: parseActivities
          },
          'address': {
            data: cg.address.split(' ').filter(val => (val.length > 3 || val in this.provinces) && (!val.match(/^\d*$/) || this.badWords.indexOf(val.toLowerCase()) !== -1)).map(val => val in this.provinces ? this.provinces[val] : val),
            func: parseAddress
          },
          'description': {
            data: cg.description.split(' ').filter(val => val.length >= 4 && this.badWords.indexOf(val.toLowerCase()) === -1),
            func: parseDescription
          },
          'province': {
            data: [cg.province],
            func: parseProvince
          }
        }

        function parseName(val) {
          return Math.floor(val.length / categoryDict.name.data.join('').length * 100);
        }
        function parsePaymentMethods(val) {
          return 100;
        }
        function parseActivities(val) {
          return Math.floor(1 / categoryDict.activities.data.length * 100);
        }
        function parseAddress(val) {
          return Math.floor(val.length / categoryDict.address.data.join('').length * 100);
        }
        function parseDescription(val) {
          return Math.floor(val.length / categoryDict.description.data.length * 100);
        }
        function parseProvince(val) {
          return 100;
        }

        for (var category in categoryDict) {
          categoryDict[category].data.forEach(val => {
            val = this.sanitize(val).toLowerCase();
            if (!(val in this.invertedIndex)) {
              this.invertedIndex[val] = [];
            }
            if (!this.invertedIndex[val][idx]) {
              this.invertedIndex[val][idx] = [];
            }
            const importance = categoryDict[category].func(val);

            const index = this.invertedIndex[val][idx].findIndex(elem => elem.type == category);
            if (index !== -1) {
              this.invertedIndex[val][idx][index]['importance'] += importance;
            } else {
              this.invertedIndex[val][idx].push({type: category, importance: importance});
            }
          });
        }
      });
    }

    generateExcerpt(campgroundsData, matchType, queryString) {
      // queryString = what user searched for, campgroundsData is data from campgrounds object
      queryString = queryString.toLowerCase()
      if (matchType == 'activities') {
        var rawString = campgroundsData.map(v => v.name.toLowerCase()).join(' ')
      } else if (matchType == 'paymentMethods') {
        var rawString = 'Accepts ' + campgroundsData.join(' ');
      // }
      // else if (matchType == 'address') {
      //   // find what the province is
      //   rawString = campgroundsData
      //   let replaceString;
      //   if (queryString.toLowerCase() in this.provinces) replaceString = `${queryString} ${this.provinces[queryString]}`
      //   if (queryString.toLowerCase() in this.provincesReversed) replaceString = `${queryString} ${this.provincesReversed[queryString]}`
      //   rawString = rawString.replace(queryString, replaceString);
      //   console.log(rawString);
      } else {
        var rawString = campgroundsData;
      }

      const keepWords = 5;
      const splitText = rawString.split(' ');
      const findIndex = splitText.findIndex(item => item.toLowerCase().includes(queryString));
      // slice it, keeping
      const excerpt = splitText.slice(Math.max(findIndex - keepWords, 0), findIndex + keepWords)
      if (findIndex > keepWords) excerpt.unshift('...');
      if (findIndex < splitText.length - keepWords) excerpt.push('...');
      return excerpt.join(' ');
    }

    doSearch(query) {
      // return this.invertedIndex
      query = query.toLowerCase();
      let ret = []
      //TO--DO: remove duplicates from swearch query as that breaks it

      for (let word of query.split(" ")) {
        // Search for just this word
        const singleWordResults = this.searchOneWord(word);
        //  loop through results and add to ret
        for (let idx in singleWordResults) {
          let matchingIDAndType = ret.findIndex(val => val.type === singleWordResults[idx].type && val.id === singleWordResults[idx].id)
          if (matchingIDAndType !== -1) {
            // update that old item
            ret[matchingIDAndType].percentMatch += singleWordResults[idx].percentMatch;
            ret[matchingIDAndType].keyword += ' ' + singleWordResults[idx].keyword;
          } else {
            ret.push(singleWordResults[idx])
          }
        }
      }
      ret = ret.sort((a, b) => a.percentMatch < b.percentMatch ? 1 : -1);
      // Remove campground duplicates (each CG should only have one search result at most)
      let alreadyIncluded = new Set([]);
      return ret.filter(val => {
        // if ID is not in alreadyIncluded, then add to alreadyIncluded + filter
        if (!alreadyIncluded.has(val.id)) {
          alreadyIncluded.add(val.id);
          return true;
        }
        return false;
      })
      return ret;
    }


    searchOneWord(word) {
      // data that will be returned
      let filteredResults = []

      if (!word) return filteredResults;
      // Loop through pre fabricated index
      for (var searchIndexKeyword in this.invertedIndex) {
        // if item doesn't match then move on
        if (!searchIndexKeyword.toLowerCase().includes(word.toLowerCase())) continue;
        // determine percent match (this is multiplied by importance)
        // "importance" - how important that search keyword is to the campground's data
        // "percentMatch" - how strong of a match it is
        const percentMatch = word.length / searchIndexKeyword.length

        this.invertedIndex[searchIndexKeyword].forEach((val, idx) => {
          // in case there is no value (arrays are camproundID-indexed)
          if (!val) return;
          // the match objects appended with extra data for front end
          val.forEach(match => {
            //generate excerpt of match
            const excerpt = this.generateExcerpt(campgrounds[idx][match.type], match.type, word);
            const resultsPercentMatch = Math.round(match.importance * percentMatch);
            // if filteredResults doesnt have id then add it in
            const newResult = {
              type: match.type,
              percentMatch: resultsPercentMatch,
              campgroundName: campgrounds[idx].name,
              keyword: searchIndexKeyword,
              excerpt: excerpt,
              id: idx
            };

            // Look for campground in existing results
            // const oldResultIndex = filteredResults.findIndex(e => e.id === idx);
            // if (oldResultIndex === -1) {
              // Doesn't exist yet, so insert
              filteredResults.push(newResult);
            // } else if (filteredResults[oldResultIndex].percentMatch < resultsPercentMatch) {
              // old one must be deleted, and new one inserted
              // filteredResults.splice(oldResultIndex, 1, newResult);
            // }
          });
        })
      }
      // return results
      return filteredResults
    }
  }
}
