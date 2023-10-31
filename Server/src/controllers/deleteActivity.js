const { Activity } = require('../db');

const deleteActivity = async (req, res) => {
  const { name } = req.params; // Get the name from the route parameter

  try {
    const activity = await Activity.findOne({
      where: { name },
    });

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    await activity.destroy();

    res.status(204).json({ message: 'Activity removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = deleteActivity;
