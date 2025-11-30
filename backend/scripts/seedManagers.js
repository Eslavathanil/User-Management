const mongoose = require('mongoose');
const Manager = require('../models/Manager');
const { v4: uuidv4 } = require('uuid');

// FIX: load .env from parent folder
require('dotenv').config({ path: __dirname + '/../.env' });

const sampleManagers = [
  {
    manager_id: uuidv4(),
    name: 'John Manager',
    email: 'john.manager@example.com',
    is_active: true
  },
  {
    manager_id: uuidv4(),
    name: 'Sarah Director',
    email: 'sarah.director@example.com',
    is_active: true
  },
  {
    manager_id: uuidv4(),
    name: 'Mike Supervisor',
    email: 'mike.supervisor@example.com',
    is_active: true
  },
  {
    manager_id: uuidv4(),
    name: 'Emily Lead',
    email: 'emily.lead@example.com',
    is_active: false
  }
];

const seedManagers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected...');

    // Clear existing managers
    await Manager.deleteMany({});
    console.log('Cleared existing managers');

    // Insert sample managers
    const managers = await Manager.insertMany(sampleManagers);
    console.log(`${managers.length} managers inserted successfully`);

    console.log('\nSample Manager IDs (use these for testing):');
    managers.forEach(manager => {
      console.log(`- ${manager.name}: ${manager.manager_id} (active: ${manager.is_active})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding managers:', error);
    process.exit(1);
  }
};

seedManagers();
