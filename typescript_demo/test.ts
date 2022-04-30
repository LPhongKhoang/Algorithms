// npm install -g ts-node typescript '@types/node'
// ts-node test.ts

enum DefaultReportHeaderTopics {
  OVERVIEW = 'Overview',
  INSPECTION_HISTORY_AND_STATUS = 'Inspection history and status',
}

console.log(Object.values(DefaultReportHeaderTopics));

const vessel = {
  x: {owners: ['1', '2', '3']},
  // x: null
}

for(let i = 0; i < vessel.x?.owners.length; i++) {
  console.log("item PK", vessel.x?.owners[i]);
}