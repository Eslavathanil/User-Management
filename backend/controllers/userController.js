const User = require('../models/User');
const Manager = require('../models/Manager');
const { validateMobile, validatePAN } = require('../utils/validation');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

// Create User
exports.createUser = async (req, res, next) => {
  try {
    const { full_name, mob_num, pan_num } = req.body;

    // Check for missing keys
    if (!full_name || !mob_num || !pan_num) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: full_name, mob_num, pan_num'
      });
    }

    // Validate full_name
    if (!full_name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Full name cannot be empty'
      });
    }

    // Validate and clean mobile number
    const { valid: isMobileValid, cleaned: cleanedMobile } = validateMobile(mob_num);
    if (!isMobileValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mobile number. Must be a valid 10-digit number'
      });
    }

    // Validate and clean PAN number
    const { valid: isPANValid, cleaned: cleanedPAN } = validatePAN(pan_num);
    if (!isPANValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid PAN number. Format: ABCDE1234F'
      });
    }

    // Auto-assign an active manager (random selection for load balancing)
    const managers = await Manager.find({ is_active: true });
    if (!managers || managers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No active managers available'
      });
    }

    // Get random manager for load balancing
    const randomManager = managers[Math.floor(Math.random() * managers.length)];
    const manager_id = randomManager.manager_id;

    // Create user
    const user = new User({
      user_id: uuidv4(),
      full_name: full_name.trim(),
      mob_num: cleanedMobile,
      pan_num: cleanedPAN,
      manager_id
    });

    await user.save();

    logger.info(`User created successfully: ${user.user_id}`);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    next(error);
  }
};

// Get Users
exports.getUsers = async (req, res, next) => {
  try {
    const { user_id, mob_num, manager_id } = req.body;

    let query = { is_active: true };

    // Filter by user_id
    if (user_id) {
      query.user_id = user_id;
    }

    // Filter by mobile number
    if (mob_num) {
      const { cleaned: cleanedMobile } = validateMobile(mob_num);
      query.mob_num = cleanedMobile;
    }

    // Filter by manager_id
    if (manager_id) {
      query.manager_id = manager_id;
    }

    const users = await User.find(query);

    logger.info(`Retrieved ${users.length} users`);

    res.status(200).json({
      success: true,
      users: users
    });
  } catch (error) {
    logger.error(`Error retrieving users: ${error.message}`);
    next(error);
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const { user_id, mob_num } = req.body;

    // Check for missing keys
    if (!user_id && !mob_num) {
      return res.status(400).json({
        success: false,
        message: 'Either user_id or mob_num is required'
      });
    }

    let query = {};

    if (user_id) {
      query.user_id = user_id;
    } else if (mob_num) {
      const { cleaned: cleanedMobile } = validateMobile(mob_num);
      query.mob_num = cleanedMobile;
    }

    const user = await User.findOneAndDelete(query);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    logger.info(`User deleted successfully: ${user.user_id}`);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    next(error);
  }
};

// Update User
exports.updateUser = async (req, res, next) => {
  try {
    const { user_ids, update_data } = req.body;

    // Check for missing keys
    if (!user_ids || !Array.isArray(user_ids) || user_ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'user_ids array is required'
      });
    }

    if (!update_data || Object.keys(update_data).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'update_data object is required'
      });
    }

    const updates = {};

    // Validate and prepare update data
    if (update_data.full_name !== undefined) {
      if (!update_data.full_name.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Full name cannot be empty'
        });
      }
      updates.full_name = update_data.full_name.trim();
    }

    if (update_data.mob_num !== undefined) {
      const { valid: isMobileValid, cleaned: cleanedMobile } = validateMobile(update_data.mob_num);
      if (!isMobileValid) {
        return res.status(400).json({
          success: false,
          message: 'Invalid mobile number. Must be a valid 10-digit number'
        });
      }
      updates.mob_num = cleanedMobile;
    }

    if (update_data.pan_num !== undefined) {
      const { valid: isPANValid, cleaned: cleanedPAN } = validatePAN(update_data.pan_num);
      if (!isPANValid) {
        return res.status(400).json({
          success: false,
          message: 'Invalid PAN number. Format: ABCDE1234F'
        });
      }
      updates.pan_num = cleanedPAN;
    }

    if (update_data.manager_id !== undefined) {
      // Validate manager exists and is active
      const manager = await Manager.findOne({ 
        manager_id: update_data.manager_id, 
        is_active: true 
      });
      
      if (!manager) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or inactive manager_id'
        });
      }

      // If changing manager, mark old entries as inactive and create new ones
      if (Object.keys(update_data).length === 1 && update_data.manager_id) {
        // Bulk manager update
        const oldUsers = await User.find({ user_id: { $in: user_ids } });
        
        // Mark old entries as inactive
        await User.updateMany(
          { user_id: { $in: user_ids } },
          { $set: { is_active: false } }
        );

        // Create new entries with new manager
        const newUsers = oldUsers.map(user => ({
          user_id: uuidv4(),
          full_name: user.full_name,
          mob_num: user.mob_num,
          pan_num: user.pan_num,
          manager_id: update_data.manager_id,
          is_active: true
        }));

        await User.insertMany(newUsers);

        logger.info(`Manager updated for ${user_ids.length} users`);

        return res.status(200).json({
          success: true,
          message: 'Users updated with new manager successfully'
        });
      } else {
        updates.manager_id = update_data.manager_id;
      }
    }

    updates.updated_at = Date.now();

    // Update users
    const result = await User.updateMany(
      { user_id: { $in: user_ids } },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found with provided user_ids'
      });
    }

    logger.info(`${result.modifiedCount} user(s) updated successfully`);

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} user(s) updated successfully`
    });
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    next(error);
  }
};
