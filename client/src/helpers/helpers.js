export const formatDate = (date) => {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}

export const searchIcons = {
  'name': '⛺', 'paymentMethods': '💵', 'activities': '🚣', 'address': '📍',
  'description': '📛', 'province': '🌎', 'region': '🗾'
}

export const weatherIcons = {
  'clear-day' : '☀️',
  'clear-night' : '☀️',
  'rain' : '☔️',
  'snow' : '⛄',
  'sleet' : '⛄',
  'wind' : '💨',
  'fog' : '🌁',
  'cloudy' : '☁️',
  'partly-cloudy-day' : '⛅',
  'partly-cloudy-night' : '⛅'
}

export const shortenDescription = (desc) => {
  if (!desc) return ''
  let excerpt = desc.split(' ')
  if (excerpt.length > 20) {
    excerpt = excerpt.slice(0, 20)
    excerpt.push('...')
  }
  return excerpt.join(' ')
}

export const provinces = {
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
  'nt': 'northwest territories',
  'nu': 'nunavut'
}

export const activitySymbols = {
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
