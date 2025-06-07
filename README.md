# How to Create a Plugin

1. Just use this repository as a template and then go into the plugin folder.
2. Install dependencies and run `npm install`
3. Edit Sample.json to your liking.
   - Change the id.
   - Set the version to 1.0.0
   - Change the description to your liking (optional you can remove the entry if you do not want a description).
   - If your plugin needs settings you can put them into input like this:
     - "input": [
       {
       "variant": "string",
       "name": "sample",
       "description": "The input for this will be passed into your function under the settings dictionary with the key 'sample'"
       }
       ]
   - You can then add a min_version key if you require features only available in a certain server version. For the values you can choose go to [Version Changes](#Minimum-Version)
4. Now you can start programming your plugin. Go into the index.ts file and change it so it returns the correct values for your league.
5. When you are done with that run `npm test` and fix all the errors. This will make sure that your code is well written and formatted.
6. You can also test running the plugin with the command `npm start`. This will run the code in main.ts.
7. Now you just publish your github repository and then go to the Sample.json file and copy the link to the raw code. This link should be importable as a plugin.

# How to update Plugin

1. Update all the files that are not in the plugin folder and run `npm install`. This will give you the newest types, settings, and dependencies.
2. Change the files in the plugin folder that you want to change for the update.
3. Now run `npm test` to fix anything new and then you can update the plugin.
4. Update the version number in the Sample.json file.

# Examples

For some examples you can look at the official plugins at [the official repository](https://github.com/Lukasdotcom/fantasy-manager/tree/main/store). This will have all the plugins that are automatically installed.

# Minimum Version

All plugins should work with all versions so you can keep the minimum version to 1.12.0.

## Features

Some features will only do something on certain versions of the server.

1. The home feature will only work on servers running 1.16.0 or later

# Note about total, average, and last_match points

Some of this can not be passed and will be calculated automatically.

1. You can pass all of them and they will all be used
2. You can only pass the last_match and the rest will be automatically calculated
3. You can only pass the total and the rest will be automatically calculated
4. You can pass the average and it will be used instead of being calculated

# Notes about what data is used

While the transfermarket is open all the data is updated except for last_match. Then once the transfermarket closes the club, picture, value, sale price, and position will not be updated anymore during the matchday. Then once the game starts last_match will be updated again, and forecast will stop updating. Then once the game ends all the points will stop updating again unless you set `update_points_after_game_end` to true.
