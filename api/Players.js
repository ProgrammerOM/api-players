const Players = require("../Model/Players");

module.exports.ApiPlayersOnline = async (req, res) => {
  try {
    let DataPlayersOnline = await Players.findOne({ title: "ผู้เล่นประจำวัน" });
    res.json(DataPlayersOnline);
  } catch (error) {
    console.log(error);
  }
};

module.exports.ApiPlayersAll = async (req, res) => {
  try {
    let DataPlayersAll = await Players.findOne({ title: "ผู้เล่นทั้งหมด" });
    res.json(DataPlayersAll);
  } catch (error) {
    console.log(error);
  }
};

module.exports.ApiPlayersRegister = async (req, res) => {
  try {
    let DataPlayersRegister = await Players.findOne({
      title: "ผู้สมัครใช้งานต่อวัน",
    });
    res.json(DataPlayersRegister);
  } catch (error) {
    console.log(error);
  }
};
