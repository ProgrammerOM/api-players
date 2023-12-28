const Players = require("../Model/Players");

async function PlayersOnline() {
  try {
    let PlayersOnlineAdd = Math.floor(Math.random() * 10 + 1);
    let PlayersOnlineReduce = Math.floor(Math.random() * 5 + 1);
    let playersonline = await Players.findOne({ title: "ผู้เล่นประจำวัน" });
    console.log(`PlayersOnline ${playersonline}`);
    if (playersonline != null) {
      setInterval(async () => {
        playersonline.numbers += PlayersOnlineAdd;
        await Players.findOneAndUpdate(
          { title: "ผู้เล่นประจำวัน" },
          { numbers: playersonline.numbers }
        );
        playersonline.numbers -= PlayersOnlineReduce;
        await Players.findOneAndUpdate(
          { title: "ผู้เล่นประจำวัน" },
          { numbers: playersonline.numbers }
        );
      }, 5000);
    } else {
      await Players.findOneAndUpdate(
        { title: "ผู้เล่นประจำวัน" },
        { numbers: 20000 },
        {
          new: true,
          upsert: true,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = PlayersOnline;
