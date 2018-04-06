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
]

module.exports = {
  campgrounds: [
    {id: 0, name: "Salmon Creek 0", activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: 0, lon: 0, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [{id: 0, author: 'Test', time: '12:24', text: 'test comment', rating: 2}, {id: 1, author: 'Test 2', time: '12:24', text: 'test comment 2', rating: 4}], image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"},
    {id: 1, name: "Salmon Creek 1", activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890000', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: 10, lon: 10, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {id: 2, name: "Salmon Creek 2", activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -100, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {id: 3, name: "Salmon Creek 3", activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -100, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {id: 4, name: "Salmon Creek 4", activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -80, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {id: 5, name: "Salmon Creek 5", activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -70, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {id: 6, name: "Salmon Salmon 6", activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -129, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {id: 7, name: "Salmon Creek 7", activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -129, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/558454/pexels-photo-558454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {id: 8, name: "Salmon Creek 8", activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -15 , lon: 30, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/176381/pexels-photo-176381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {id: 9, name: "Salmon Creek 9", activities: [activities[4], activities[7], activities[2]], email: 'test@test.com', phone: '123 456 7890', sites: 200, hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'}, paymentMethods: ['interac', 'cash'], prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'}, address: "48033 370 Ave E, Okotoks, AB  T1S 1B5", lat: -129, lon: 50, description: 'Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.', comments: [], image: "https://images.pexels.com/photos/116104/pexels-photo-116104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  ],
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
      /*
        CONSTANTS
      */
      this.provinces = {'AB': 'Alberta', 'BC': 'British Columbia'}
      this.punctuation = ['!', '.', ';', '’s', ',']
      this.badWords = commonWords.map(val => val.word).concat(['near', 'within', 'kms']);
      this.sanitize = (word) => {
        // strip empty spaces
        word = word.replace(/^\s+|\s+$/g, '');
        // remove punctuation
        this.punctuation.forEach(val => word = word.replace(val, ''));
        return word;
      }

      /*
        SEARCH INDEX
      */
      this.invertedIndex = {}

      this.buildSearchIndex(campgrounds);
    }

    buildSearchIndex(campgrounds) {
      campgrounds.forEach((cg, idx) => {
        //we build an index like this: {'keyword': [empty, empty, [{type: 'activity', importance: 50}, {type: 'description', importance: 4}], empty]}
        const categoryDict = {
          'name': {data: cg.name.split(' '), func: parseName},
          'paymentMethods': {data: cg.paymentMethods, func: parsePaymentMethods},
          'activities': {data: cg.activities.map(val => val.name), func: parseActivities},
          'address': {data: cg.address.split(' ').filter(val => (val.length > 3 || val in this.provinces) && (!val.match(/^\d*$/) || this.badWords.indexOf(val.toLowerCase()) !== -1)).map(val => val in this.provinces ? this.provinces[val] : val), func: parseAddress},
          'description': {data: cg.description.split(' ').filter(val => val.length > 2 && this.badWords.indexOf(val.toLowerCase()) === -1), func: parseDescription}
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

        for (var category in categoryDict) {
          categoryDict[category].data.forEach(val => {
            val = this.sanitize(val);
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

    doSearch(query) {
      console.log(query);
    }


  }
}
