import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
*/
export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET Thought based on id /thought/:id
 * @param string id
 * @returns a single Thought object
*/
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId);
      if(thought) {
        res.json(thought);
      } else {
        res.status(404).json({
          message: 'Thought not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  /**
 * POST Thoughts /thoughts
 * @param object username
 * @returns a single Thought object
*/

export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username, userId } = req.body;
    try {
      const newThought = await Thought.create({
        thoughtText,
        username
      });
      const updatedUser = await User.findByIdAndUpdate(
        {_id: userId}, {$push: {thoughts: newThought._id}}, { new: true }
      )
      res.status(201).json(updatedUser);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT Thought based on id /thought/:id
 * @param object id, username
 * @returns a single Thought object
*/
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  /**
 * DELETE Thought based on id /thoughts/:id
 * @param string id
 * @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
      
      if(!thought) {
        res.status(404).json({
          message: 'No thought with that ID'
        });
      }
      res.status(201).json(thought)
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  /**
 * POST reaction based on /thoughts/:thoughtId/reactions
 * @param string id
 * @param object reaction
 * @returns object thought
*/

export const addReaction = async (req: Request, res: Response) => {
  console.log('You are adding a reaction');
  console.log(req.body);
  try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
      );

      if (!thought) {
          return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
      }

      return res.json(thought);
  } catch (err) {
      return res.status(500).json(err);
  }
}

/**
* DELETE Assignment based on /students/:studentId/assignments
* @param string assignmentId
* @param string studentId
* @returns object student 
*/

export const removeReaction = async (req: Request, res: Response) => {
  try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
      );

      if (!thought) {
          return res
              .status(404)
              .json({ message: 'No student found with that ID :(' });
      }

      return res.json(thought);
  } catch (err) {
      return res.status(500).json(err);
  }
}
