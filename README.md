Install nodejs
Install nest-cli using "npm install -g @nest/cli" command
Run below commands

npm install
npm run start


Application will be up and running in port 3000 and the base path will be "http://localhost:8080/api/v1/asset/"

Service has only one endpoint which is a Post call


/*
 * Service will be receiving a list of show/asset metadata coming from our CMS system.
 * The data structure is expected as the exampleInputAssetList below.
 *
 * An asset has to have the following mandatory fields:
 * asset.id, asset.title, asset.description, asset.broadcastStartTime asset.duration, asset.image
 *
 * Asset doesn't have to have an match object, but if an asset has a match object,
 * the match object has to have the following mandatory fields:
 * match.id,
 * match.homeTeam.id, match.homeTeam.name, match.homeTeam.image,
 * match.awayTeam.id, match.awayTeam.name, match.awayTeam.image,
 *
 * The service will return the following
 * 1. filter out any asset or match that missing mandatory fields.
 * 2. output asset list should not include any optional fields; NOTE: if an asset has match object,
 *    the output asset list should include the match object unless the match object is missing any mandatory field
 * 3. create broadcastEndTime for each of the asset. It's value should be broadcastStartTime + duration in ISO8601 format
 *    (same format as broadcastStartTime)
 * 4. replace image.domain1.com/cms to cms.domain2.com for all image url
 * 5. sort the output asset list by broadcastStartTime
 */