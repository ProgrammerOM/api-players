const Players = require("../Model/Players");

async function PlayersOnline() {
  try {
    setInterval(async () => {
      let Playersonline = await Players.findOne({ title: "ผู้เล่นประจำวัน" });
      console.log(`(ผู้เล่นประจำวัน)ค่าปัจจุบัน ${Playersonline}`);
      if (Playersonline != null) {
        function generateRandomIntegerInRange(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        Playersonline.numbers += generateRandomIntegerInRange(5, 15);
        let ShowPlayersOnlineAdd = await Players.findOneAndUpdate(
          { title: "ผู้เล่นประจำวัน" },
          { numbers: Playersonline.numbers }
        );
        console.log(`(ผู้เล่นประจำวัน)เพิ่มค่าขึ้น ${ShowPlayersOnlineAdd}`);
        Playersonline.numbers -= generateRandomIntegerInRange(7, 15);
        let ShowPlayersOnlineReduce = await Players.findOneAndUpdate(
          { title: "ผู้เล่นประจำวัน" },
          { numbers: Playersonline.numbers }
        );
        console.log(`(ผู้เล่นประจำวัน)ลบค่าลง ${ShowPlayersOnlineReduce}`);
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
    }, 50000);
  } catch (error) {
    console.log(error);
  }
}
module.exports = PlayersOnline;
