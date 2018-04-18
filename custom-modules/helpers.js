var commonWords = require('common-words');

quotes = [
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
]

// Code for working with database
// function remove (arr, str) { if (arr.indexOf(str) > -1) { arr.splice(arr.indexOf(str), 1) } return arr }
// function replace(arr, find, newText) { if (arr.indexOf(find) !== -1) { arr[arr.indexOf(find)] = newText } return arr }
// db.campgrounds.find({activities: 'picnic shelters'}).forEach(val => db.campgrounds.update({"_id": val["_id"]}, {$set: {activities: replace(val.activities, 'picnic shelters', 'picnic tables')}}  ))
// db.campgrounds.find({activities: 'poor'}).forEach(val => db.campgrounds.update({"_id": val["_id"]}, {$set: {activities: remove(val.activities, 'poor')}}))
// db.campgrounds.find({}).forEach(val => val.activities.forEach(item => {if (!x.includes(item)) x.push(item)}))

const activitySymbols = {
  "sports complex": '🏈',
  "flea markets": '🏪',
  "historical sites/museums": '📖',
  "municipal park": '🌳',
  "provincial park": '🌳',
  "sea-doo rental": '🚤',
  "restaurants": '🍔',
  "clubs/bars": '🍹',
  "attractions and services": '💁',
  "hospital" : '🏥',
  "theatres": "🎬",
  "festivals" : '🎉',
  "national park": '🍁',
  "liquor store": '🍸',
  "drugstore/pharmacy" : '💊',
  "racetrack" : '🏁',
  'pull thru sites' : '🚛',
  'full hookup sites' : '🚛',
  'tenting sites' : '🎪',
  'flush toilets' : '🚽',
  'security gate' : '🚪',
  'pets allowed' : '🐕',
  'hot showers' : '🚿',
  'internet access' : '💻',
  'firewood' : '🌳',
  'seasonal sites' : '🌞',
  'restrooms' : '🚻',
  'ice' : '◻️',
  'beach swimming' : '🏊',
  'big rigs welcome' : '🚚',
  'motor boating' : '🚤',
  'hiking trails' : '🗻',
  'dumping station' : '🚮',
  'paddleboat rentals' : '🚣',
  'windsurfing' : '🏄',
  'horseshoes' : '🐎',
  'marina' : '🚢',
  'canoe rentals' : '🚣',
  'soccer field' : '⚽',
  'cycling trails' : '🚴',
  'kayaking' : '🚣',
  'gasoline' : '⛽',
  'paddleboats' : '🚣',
  'laundromat' : '👔',
  'movie rentals' : '🎬',
  'canoeing' : '🚣',
  'water skiing' : '🎿',
  'fishing' : '🎣',
  'basketball court' : '🏀',
  'motorboat rentals' : '🚤',
  'campground photo' : '📷',
  'recreation room' : '🎮',
  'swimming pool' : '🏊',
  'mini-golf' : '⛳',
  'golf course' : '⛳',
  'hot tub' : '🛁',
  'fire pits' : '🔥',
  'restaurant' : '🍴',
  'convenience store' : '🏪',
  '50 amps sites' : '🔌',
  'handicap access' : '♿',
  'dishwashing station' : '🚿',
  'rv supplies' : '🏪',
  'propane gas' : '💨',
  'baseball field' : '⚾️',
  'bicycle rentals' : '🚲',
  'group sites' : '👪',
  'wilderness sites' : '🌻',
  'spa/sauna' : '💆',
  'pool table' : '🎱',
  'video arcade' : '📼',
  'mountain climbing' : '🌄',
  'open all year' : '📅',
  'motocross trails' : '🚲',
  'barbebue rentals' : '🍗',
  'snack bar' : '🍩',
  'horseback riding' : '🏇',
  'tennis court' : '🎾',
  'shuffleboard' : '🔀',
  'go-carts' : '🚗',
  'mobile sewer service' : '🚽',
  'video player rentals' : '📺',
  'driving range' : '⛳',
  'banking machine' : '💵',
  'cable tv hookups' : '📺',
  "golf carts rental" : '⛳',
  'golf cart rentals' : '⛳',
  'summer camp' : '🌞',
  'rvs for rent (on-site)' : '🚐',
  'cabins for rent (on-site)' : '🏠',
  'casino'  : '🎲',
  'children activities': '👶',
  'water park': '⛲',

  'shopping': '*',
  'playground': '*',
  'pavilion': '*',
  'picnic tables': '*',
  'shaded sites': '*',
  'volleyball court': '*'
}

const provinces = {
  'bc': 'british columbia',
  'ab': 'alberta',
  'sk': 'saskatchewan',
  'mb': 'manitoba',
  'on': 'ontario',
  'qc': 'quebec',
  'pe': 'prince edward island',
  'nb': 'new brunswick',
  'ns': 'nova scotia',
  'nl': 'newfoundland',
  'yt': 'yukon territory',
  'nt': 'northwest territories'
}
const provincesReversed = {
  'british columbia' : 'bc',
  'alberta' : 'ab',
  'saskatchewan' : 'sk',
  'manitoba' : 'mb',
  'ontario' : 'on',
  'quebec' : 'qc',
  'prince edward island' : 'pe',
  'new brunswick' : 'nb',
  'nova scotia' : 'ns',
  'newfoundland' : 'nl',
  'yukon territory' : 'yt',
  'northwest territories' : 'nt',
}


class Searcher {
  constructor(campgrounds) {
    /* CONSTANTS and METHODS */
    this.punctuation = ['!', '.', ';', '’s', "'s", ',', '(', ')', '$']
    this.badWords = commonWords.map(val => val.word).concat(['near', 'within', 'kms']);

    /* Make search index */
    this.invertedIndex = {}
    this.buildSearchIndex(campgrounds, 2);
  }

  sanitize(word) {
    // strip empty spaces
    word = word.replace(/^\s+|\s+$/g, '');
    // remove punctuation
    let oldLength;
    do {
      oldLength = word.length;
      this.punctuation.forEach(val => {
        word = word.replace(val, '');
      });
    } while (oldLength !== word.length)
    return word;
  }

  makeExcerptForIndex(rawData, keyWord) {
    // Takes raw data in string format such as address, description, etc. and
    // a keyword (these are keys in teh inverted index) and generates an excerpt
    if (!keyWord) return '';
    // Remove punctiation
    // rawData = this.sanitize(rawData).toLowerCase().split(' ');
    rawData = rawData.toLowerCase().split(' ');

    // Loops through rawData, finding all matches' indices
    let matches = [], startIdx = 0, foundIndex = -1;
    // console.log(keyWord, '\n\n\n\n', rawData);

    do {
      startIdx = matches.length ? matches[matches.length - 1] + 1: 0;
      // console.log('\t\tstarting at', startIdx);
      //matches.reduce((a, v) => a + v + keyWord.length, 0);
      foundIndex = rawData.slice(startIdx).findIndex(v => v.includes(keyWord.toLowerCase()));

      // console.log('\t\t found at', foundIndex);
      if (foundIndex !== -1) matches.push(startIdx + foundIndex)
    } while (foundIndex !== -1);

    const wordsToKeep = Math.min(Math.ceil(12 / matches.length / 2), 3);
    // console.log(matches);
    // return rawData
    return matches.filter((v, i) => {
      return matches[i + 1] > 5 || matches[i + 1] == undefined;
    }).map(v => {
      const startIndex = Math.max(v - 5, 0);
      return `${rawData.slice(startIndex, v + 5).join(' ')}`
    }).join('...')
    // matches.map(idx => {
    //   // find closet 'wordsToKeep' words
    // });
    // const keyWordIndex = rawData.toLowerCase().indexOf(keyWord.toLowerCase());
    //
    // return  rawData.slice(startIndex, matches[0] + 10);
  }

  buildSearchIndex(campgrounds, minimumKeyLength) {
    campgrounds.forEach(cg => {
      //we build an index like this: {'keyword': [empty, empty, [{type: 'activity', importance: 50}, {type: 'description', importance: 4}], empty]}
      cg.description = cg.description || ''
      cg.address = cg.address || ''
      const idx = parseInt(cg.id)

      const categoryDict = {
        'name': {
          data: cg.name.split(' '),
          originalData: cg.name,
          func: function (val) {return Math.floor(val.length / this.data.join('').length * 100)}
        },
        'paymentMethods': {
          data: cg.paymentMethods,
          originalData: cg.paymentMethods.join(' '),
          func: function (val) {return 100}
        },
        'activities': {
          data: cg.activities.map(val => val.name),
          originalData: cg.activities.map(v => v.name).join(' '),
          func: function (val) {return Math.floor(1 / this.data.length * 100)}
        },
        'address': {
          data: cg.address.split(' ').filter(val => (val.length > 3 || val in provinces) && (!val.match(/^\d*$/) || this.badWords.indexOf(val.toLowerCase()) !== -1)).map(val => val in provinces ? provinces[val] : val),
          originalData: cg.address,
          func: function (val) {return Math.floor(val.length / this.data.join('').length * 100)}
        },
        'description': {
          data: cg.description.split(' ').filter(val => val.length >= 4 && this.badWords.indexOf(val.toLowerCase()) === -1),
          originalData: cg.description,
          func: function (val) {return Math.floor(val.length / this.data.length * 100)}
        },
        'province': {
          data: [cg.province],
          originalData: cg.province,
          func: function (val) {return 100}
        }
      }

      // loop through each category, and within each loop thru data
      for (var category in categoryDict) {
        categoryDict[category].data.forEach(val => {
          if (!val || val.length < minimumKeyLength || val.indexOf(' ') !== -1) return;
          val = this.sanitize(val).toLowerCase();
          // see if current value in inverted index
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
            this.invertedIndex[val][idx].push({
              type: category,
              importance: importance,
              name: cg.name,
              excerpt: this.makeExcerptForIndex(categoryDict[category].originalData, val)
            });
          }
        });
      }
    });
  }

  // generateExcerpt(campgroundIndex, matchType, queryString) {
  //   // Use the campground index to access DB
  //   // queryString = what user searched for, campgroundsData is data from campgrounds object
  //   queryString = queryString.toLowerCase()
  //   if (matchType == 'activities') {
  //     var rawString = campgroundsData.map(v => v.name.toLowerCase()).join(' ')
  //   } else if (matchType == 'paymentMethods') {
  //     var rawString = 'Accepts ' + campgroundsData.join(' ');
  //   // }
  //   // else if (matchType == 'address') {
  //   //   // find what the province is
  //   //   rawString = campgroundsData
  //   //   let replaceString;
  //   //   if (queryString.toLowerCase() in this.provinces) replaceString = `${queryString} ${this.provinces[queryString]}`
  //   //   if (queryString.toLowerCase() in this.provincesReversed) replaceString = `${queryString} ${this.provincesReversed[queryString]}`
  //   //   rawString = rawString.replace(queryString, replaceString);
  //   //   console.log(rawString);
  //   } else {
  //     var rawString = campgroundsData;
  //   }
  //
  //   const keepWords = 5;
  //   const splitText = rawString.split(' ');
  //   const findIndex = splitText.findIndex(item => item.toLowerCase().includes(queryString));
  //   // slice it, keeping
  //   const excerpt = splitText.slice(Math.max(findIndex - keepWords, 0), findIndex + keepWords)
  //   if (findIndex > keepWords) excerpt.unshift('...');
  //   if (findIndex < splitText.length - keepWords) excerpt.push('...');
  //   return excerpt.join(' ');
  // }

  doSearch(query) {
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
          //ret[matchingIDAndType].keyword += ' ' + singleWordResults[idx].keyword;
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
    });
  }

  searchOneWord(word) {
    // data that will be returned
    let filteredResults = []

    if (!word) return filteredResults;
    // Loop through pre fabricated index
    for (var searchIndexKeyword in this.invertedIndex) {
      // if item doesn't match then move on
      if (!searchIndexKeyword.toLowerCase().startsWith(word.toLowerCase())) continue;
      // determine percent match (this is multiplied by importance)
      // "importance" - how important that search keyword is to the campground's data
      // "percentMatch" - how strong of a match it is, vs search's query word
      const percentMatch = word.length / searchIndexKeyword.length

      this.invertedIndex[searchIndexKeyword].forEach((val, idx) => {
        // in case there is no value (arrays are camproundID-indexed)
        if (!val) return;
        // the match objects appended with extra data for front end
        val.forEach(match => {
          //generate excerpt of match
          const resultsPercentMatch = Math.round(match.importance * percentMatch);
          // if filteredResults doesnt have id then add it in
          const newResult = {
            type: match.type,
            percentMatch: resultsPercentMatch,
            campgroundName: match.name,
            keyword: searchIndexKeyword,
            excerpt: match.excerpt,
            id: idx
          }
          // Add to results
          filteredResults.push(newResult);
        });
      })
    }
    return filteredResults
  }
}

module.exports = {
  quotes: quotes,
  activitySymbols: activitySymbols,
  searcher: Searcher
}
