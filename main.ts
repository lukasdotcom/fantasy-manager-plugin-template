import Main from "./plugin/index";
// You can edit this dictionary with any settings that you want.
const config = {};
async function main() {
  const result = await Main(config, {
    players: [],
    clubs: [],
    timestamp: 0,
    transferOpen: true,
  });
  console.log(result);
}

main();
