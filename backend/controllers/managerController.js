const Manager = require('../models/Manager');
const logger = require('../utils/logger');

// Get all active managers
exports.getManagers = async (req, res, next) => {
  try {
    const managers = await Manager.find({ is_active: true });

    logger.info(`Retrieved ${managers.length} active managers`);

    res.status(200).json({
      success: true,
      managers: managers
    });
  } catch (error) {
    logger.error(`Error retrieving managers: ${error.message}`);
    next(error);
  }
};
