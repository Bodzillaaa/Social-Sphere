import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications controller", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications controller", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

// TODO (optional) will do after completion
export const deleteOneNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationId = req.params.id;

    const notification = await Notification.findById(notificationId);
    if (!notification)
      return res.status(404).json({ error: "Notification not found" });

    if (userId.toString() !== notification.to.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorised to delete this notifications" });
    }

    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log("Error in deleteOneNotification controller", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};
