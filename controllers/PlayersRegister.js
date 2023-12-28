const Players = require("../Model/Players");

async function PlayersRegister() {
  try {
    let number = 0;
    setInterval(async () => {
      number += 7;
      let adddata = await Players.findOneAndUpdate(
        { title: "ผู้สมัครใช้งานต่อวัน" },
        { numbers: number },
        {
          new: true,
          upsert: true,
        }
      );
      console.log(`บวกค่าเพ่ิมผู้สมัครใช้งานต่อวัน : ${adddata}`);
    }, 10000);
    setInterval(async () => {
      let time = new Date().toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      console.log(time);
      if (time === "00:00:00") {
        let DataPlayersRegister = await Players.findOne({
          title: "ผู้สมัครใช้งานต่อวัน",
        });
        let DataPlayersAll = await Players.findOne({ title: "ผู้เล่นทั้งหมด" });
        console.log(
          `เช็คข้อมูลผู้เล่นทั้งหมดว่ามีอยู่หรือไม่ : ${DataPlayersAll}`
        );
        if (DataPlayersAll != null) {
          DataPlayersAll.numbers += DataPlayersRegister.numbers;
          let PlayersAllAdd = await Players.findOneAndUpdate(
            { title: "ผู้เล่นทั้งหมด" },
            { numbers: DataPlayersAll.numbers },
            {
              new: true,
              upsert: true,
            }
          );
          console.log(
            `ผู้เล่นทั้งหมดบวกเพิ่มจากค่าปัจจุบัน : ${PlayersAllAdd}`
          );
        } else {
          let PlayersAll = await Players.findOneAndUpdate(
            { title: "ผู้เล่นทั้งหมด" },
            { numbers: DataPlayersRegister.numbers },
            {
              new: true,
              upsert: true,
            }
          );
          console.log(`เพิ่มข้อมูลผู้เล่นทั้งหมด: ${PlayersAll}`);
        }

        let data = await Players.findOneAndUpdate(
          { title: "ผู้สมัครใช้งานต่อวัน" },
          { numbers: 0 },
          {
            new: true,
            upsert: true,
          }
        );
        console.log(`เพิ่มข้อมูลผู้สมัครใช้งานต่อวัน: ${data}`);
      }
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}
module.exports = PlayersRegister;
