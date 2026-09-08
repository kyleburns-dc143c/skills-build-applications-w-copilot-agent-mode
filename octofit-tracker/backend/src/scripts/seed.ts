import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex', email: 'alex@example.com', name: 'Alex Morgan', avatar: 'AM' },
      { username: 'jamie', email: 'jamie@example.com', name: 'Jamie Lee', avatar: 'JL' },
      { username: 'taylor', email: 'taylor@example.com', name: 'Taylor Reed', avatar: 'TR' },
    ]);

    await Team.create([
      {
        name: 'Summit Striders',
        description: 'A steady team focused on building strength and endurance.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Sunrise Crew',
        description: 'Morning movers who keep each other accountable.',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, points: 80, recordedAt: new Date('2026-09-06T07:30:00Z') },
      { user: users[0]._id, type: 'strength', durationMinutes: 45, points: 90, recordedAt: new Date('2026-09-04T18:00:00Z') },
      { user: users[1]._id, type: 'cycling', durationMinutes: 50, points: 110, recordedAt: new Date('2026-09-05T08:00:00Z') },
      { user: users[1]._id, type: 'walking', durationMinutes: 25, points: 45, recordedAt: new Date('2026-09-03T12:00:00Z') },
      { user: users[2]._id, type: 'running', durationMinutes: 28, points: 70, recordedAt: new Date('2026-09-06T06:45:00Z') },
    ]);

    const leaderboardUsers = [
      { user: users[1]._id, points: 155 },
      { user: users[0]._id, points: 170 },
      { user: users[2]._id, points: 70 },
    ].sort((left, right) => right.points - left.points);
    await Leaderboard.create(
      leaderboardUsers.map((entry, index) => ({ ...entry, rank: index + 1 })),
    );

    await Workout.create([
      {
        title: 'Foundation Strength',
        description: 'A balanced full-body session for building a durable base.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Dead bugs'],
      },
      {
        title: 'Tempo Run Builder',
        description: 'Intervals that develop pacing and comfortable speed.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Warm-up walk', 'Tempo intervals', 'Recovery jog', 'Cool-down stretch'],
      },
      {
        title: 'Power Circuit',
        description: 'A demanding circuit for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 40,
        exercises: ['Jump squats', 'Burpees', 'Mountain climbers', 'Plank shoulder taps'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
