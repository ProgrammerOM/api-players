const mongoose = require("mongoose");
const Random = require("../Model/random");
const EventEmitter = require("events");
const emitter = new EventEmitter();
const Moment = require("moment");
Moment.locale("th");

module.exports.PlayersDaily = async (req, res) => {
  try {
    let CheckPlayersDaily = await Random.findOne({ title: "ผู้เล่นประจำวัน" });
    if (CheckPlayersDaily) {
      let PlayersDailyAdd = Math.floor(Math.random() * 10 + 1);
      let PlayersDailyReduce = Math.floor(Math.random() * 5 + 1);
      let PlayersDaily = await Random.findOne({ title: "ผู้เล่นประจำวัน" });

      PlayersDaily.numbers += PlayersDailyAdd;
      await Random.findOneAndUpdate(
        { title: "ผู้เล่นประจำวัน" },
        { numbers: PlayersDaily.numbers }
      );
      PlayersDaily.numbers -= PlayersDailyReduce;
      await Random.findOneAndUpdate(
        { title: "ผู้เล่นประจำวัน" },
        { numbers: PlayersDaily.numbers }
      );
    } else if (CheckPlayersDaily === null) {
      await Random.create({ title: "ผู้เล่นประจำวัน", numbers: 20000 });
    }
    let ShowDataPlayersDaily = await Random.findOne({
      title: "ผู้เล่นประจำวัน",
    });
    res.json(ShowDataPlayersDaily);
  } catch (error) {
    console.log(error);
  }
};
module.exports.PlayersAll = async (req, res) => {
  try {
    let showPlayersAll = await Random.findOne({ title: "ผู้เล่นทั้งหมด" });
    res.json(showPlayersAll);
  } catch (error) {
    console.log(error);
  }
};

module.exports.PlayersApplyDaily = async (req, res) => {
  try {
    let ClickPlayersApplyDaily = await Random.findOne({
      title: "ผู้สมัครใช้งานต่อวัน",
    });

    if (ClickPlayersApplyDaily) {
      let time = Moment().format("LTS");
      console.log(Moment.locale());

      console.log(`เช็คเวลา ${time}`);

      if (time != "23:05:00") {
        ClickPlayersApplyDaily.numbers += 1;
        await Random.findOneAndUpdate(
          { title: "ผู้สมัครใช้งานต่อวัน" },
          { numbers: ClickPlayersApplyDaily.numbers }
        );
      } else {
        console.log(`เข้าเงื่อนไข ${time}`);
        console.log(
          `เช็คผู้สมัครใช้งานต่อวันข้อมูลก่อน ${ClickPlayersApplyDaily}`
        );

        let data = await Random.findOne({ title: "ผู้เล่นทั้งหมด" });
        console.log(`เช็คผู้เล่นทั้งหมดข้อมูลก่อน ${data}`);

        if (data) {
          data.numbers += ClickPlayersApplyDaily.numbers;
          await Random.findOneAndUpdate(
            { title: "ผู้เล่นทั้งหมด" },
            { numbers: data.numbers }
          );
          console.log(`เพิ่มผู้เล่นทั้งหมดข้อมูล ${data.numbers}`);
        } else {
          await Random.create({
            title: "ผู้เล่นทั้งหมด",
            numbers: ClickPlayersApplyDaily.numbers,
          });
        }
        await Random.findOneAndUpdate(
          { title: "ผู้สมัครใช้งานต่อวัน" },
          { numbers: 0 }
        );
      }
    } else if (ClickPlayersApplyDaily === null) {
      await Random.create({
        title: "ผู้สมัครใช้งานต่อวัน",
        numbers: 1000,
      });
    }
    let ShowDataPlayersApplyDaily = await Random.findOne({
      title: "ผู้สมัครใช้งานต่อวัน",
    });
    res.json(ShowDataPlayersApplyDaily);
  } catch (error) {
    console.log(error);
  }
};
