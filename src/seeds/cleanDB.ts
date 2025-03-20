import { Thought, User } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await Thought.deleteMany({});
    console.log('Course collection cleaned.');

    await User.deleteMany({});
    console.log('Student collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
