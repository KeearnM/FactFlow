const SmartCollectionsModel = require("../models/SmartCollections");
// import users model

// --------------------------------------------------------------- //

// seed collection
const seedSmartCollection = async (req, res) => {
  try {
    await SmartCollectionsModel.deleteMany({});

    await SmartCollectionsModel.create([
      {
        topic: "Market",
      },
      {
        topic: "Tech Startups",
      },
      {
        topic: "Animal Nutrition",
      },
      {
        topic: "US elections",
      },
      {
        topic: "Maritime shipping",
      },
      {
        topic: "Switzerland",
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

// get all collections
const getAllSmartCollections = async (req, res) => {
  try {
    const allCollections = await SmartCollectionsModel.find();
    res.json(allCollections);
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error getting all collections" });
  }
};

// add new collection
const addSmartCollection = async (req, res) => {
  try {
    const newCollection = {
      topic: req.body.topic,
    };
    await SmartCollectionsModel.create(newCollection);

    res.json({ status: "ok", msg: "collection saved" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "collection not saved" });
  }
};

// delete collection

// get collections by user (Object) ID

// get content of one collection

module.exports = {
  seedSmartCollection,
  getAllSmartCollections,
  addSmartCollection,
};
