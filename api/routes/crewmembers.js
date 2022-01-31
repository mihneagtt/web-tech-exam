var express = require('express')
const CrewMember = require("../models/CrewMember");
var router = express.Router();

//Get all the crew members
router.get("/", async(req, res) => {
  try {
      const crewmembers = await CrewMember.findAll();
      return res.status(200).json(crewmembers);
  } catch (err) {
      return res.status(501).json(err);
  }
});

//Get a specific crew member based on id
router.get("/:memberId", async(req, res) => {
  try {
      const crewmember = await CrewMember.findByPk(req.params.memberId);
      if (crewmember) {
          return res.status(200).json(crewmember);
      } else {
          return res.status(404).json({ error: `Crew member with the id ${req.params.memberId} not found!` });
      }
  } catch (err) {
      return res.status(501).json(err);
  }
});


//Update a crew member
router.put("/:memberId", async(req, res) => {
  try {
      const crewmember = await CrewMember.findByPk(req.params.memberId);
      if(crewmember){
        await crewmember.update(req.body);
        return res.status(201).json(crewmember);
      }else{
        return res.status(404);
      }
  } catch (err) {
      res.status(501).json(err);
  }
})


//Delete a crew member
router.delete("/:memberId", async(req, res,next) => {
  try {
      const crewmember = await CrewMember.findByPk(req.params.memberId);
      if (crewmember) {
          await crewmember.destroy();
          res.status(200);
      } else {
          res.status(200);
      }
  } catch (err) {
      next(err);
  }
})

module.exports = router