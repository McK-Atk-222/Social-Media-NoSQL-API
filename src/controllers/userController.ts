import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

/**
 * GET All Users
 * @returns an array of Users
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET User based on id /students/:id
 * @param string id
 * @returns a single User object
*/
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json({
                user,
                // grade: await grade(studentId)
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * POST User /users
 * @param object user
 * @returns a single User object
*/

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
/**
 * DELETE User based on id /user/:id
 * @param string id
 * @returns string 
*/

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        //Removes all thoughts with associated username
        const thought = await Thought.deleteMany(
            { username: user.username },
        );

        if (!thought) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }

        return res.json({ message: 'User and associated thoughts successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

//update a User by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

//   add friend
  export const addFriend = async (req: Request, res: Response) => {
    try {
        const friend = req.params.friendId
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {$push: {friends: friend}},
            { new: true }
        )
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
 
//   remove friend
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const friend = req.params.friendId
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {$pull: {friends: friend}},
            { new: true }
        )
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}