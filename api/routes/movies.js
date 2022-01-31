var express = require('express')
const Movie = require("../models/Movie");
const CrewMember = require("../models/CrewMember");
var router = express.Router();

//Get all the movies
router.get("/", async(req, res) => {
  try {
      const movies = await Movie.findAll();
      return res.status(200).json(movies);
  } catch (err) {
      return res.status(501).json(err);
  }
});

router.get("/:movieId", async(req, res) => {
  try {
      const movie = await Movie.findByPk(req.params.movieId);
      if (movie) {
          return res.status(200).json(movie);
      } else {
          return res.status(404).json({ error: `Movie with the id ${req.params.movieId} not found!` });
      }
  } catch (err) {
      return res.status(501).json(err);
  }
});

//Get all the crew members from a movie
router.get("/:movieId/crewmembers", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId, {
      include: [CrewMember]
    });
    if (movie) {
      res.status(200).json(movie.crewmembers);
    } else {
      res.status(404).json({ message: '404 - Movie Not Found!'});
    }
  } catch(error) {
    next(error);
  }
});

//Get a specific crew member from a movie
router.get("/:movieId/crewmembers/:memberId", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId);
    if (movie) {
      const crewmembers = await movie.getCrewmembers({ id: req.params.memberId });
      const crewmember = crewmembers.shift();
      if (crewmember) {
        res.status(202).json(crewmember);
      } else {
        res.status(404).json({ message: '404 - Crew Member Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - Movie Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

//Create a movie
router.post("/", async (req, res, next) => {
  try {
    await Movie.create(req.body);
    res.status(201).json({ message: "Movie Created!" });
  } catch (err) {
    next(err);
  }
});

//Post a new crew member into a movie
router.post("/:movieId/crewmembers", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId);
    if (movie) {
      const crewmember = new CrewMember(req.body);
      crewmember.movieId = movie.id;
      await crewmember.save();
      res.status(201).json({ message: 'Crew member created!'});
    } else {
      res.status(404).json({ message: '404 - Movie Not Found'});
    }
  } catch (error) {
    next(error);
  }
});

//Update a crew member from a movie
router.put("/:movieId/crewmembers/:memberId", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId);
    if (movie) {
      const crewmembers = await movie.getCrewmembers({ id: req.params.memberId });
      const crewmember = crewmembers.shift();
      if (crewmember) {
        crewmember.name = req.body.name;
        crewmember.role = req.body.role;
        await crewmember.save();
        res.status(202).json({ message: 'Crew Member updated!' });
      } else {
        res.status(404).json({ message: '404 - Crew Member Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - Movie Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

//Delete a crew member from a movie
router.delete("/:movieId/crewmembers/:memberId", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieId);
    if (movie) {
      const crewmembers = await movie.getCrewmembers({ id: req.params.memberId });
      const crewmember = crewmembers.shift();
      if (crewmember) {
        await crewmember.destroy();
        res.status(202).json({ message: 'Crew Member deleted!' });
      } else {
        res.status(404).json({ message: '404 - Crew Member Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - Movie Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:movieId", async(req, res) => {
  try {
      const movie = await Movie.findByPk(req.params.movieId);
      if (movie) {
          await movie.destroy();
          res.status(202).json({ message: 'Movie deleted!' });
      } else {
          return res.status(404).json({ error: `Movie with the id ${req.params.movieId} not found!` });
      }
  } catch (err) {
      return res.status(501).json(err);
  }
});

module.exports = router;