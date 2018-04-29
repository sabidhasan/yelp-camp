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
