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

module.exports = {
  quotes: quotes,
  activitySymbols: activitySymbols
}
