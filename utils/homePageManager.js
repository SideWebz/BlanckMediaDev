const fs = require('fs');
const path = require('path');

const slotsFile = path.join(__dirname, '../data/home-slots.json');

const readSlots = () => {
  try {
    const data = fs.readFileSync(slotsFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeSlots = (slots) => {
  fs.writeFileSync(slotsFile, JSON.stringify(slots, null, 2));
};

const getAllSlots = () => {
  const slots = readSlots();
  // Ensure we always have 3 slots
  while (slots.length < 3) {
    slots.push({
      id: slots.length + 1,
      type: 'image',
      image_path: null,
      video_url: null
    });
  }
  writeSlots(slots);
  return slots.slice(0, 3); // Return only first 3
};

const getSlotById = (slotId) => {
  const slots = readSlots();
  return slots.find(s => s.id === parseInt(slotId));
};

const updateSlot = (slotId, updates) => {
  const slots = readSlots();
  const idx = slots.findIndex(s => s.id === parseInt(slotId));
  if (idx === -1) return null;
  
  slots[idx] = { ...slots[idx], ...updates };
  writeSlots(slots);
  return slots[idx];
};

// Validate video URL
const isValidVideoUrl = (url) => {
  if (!url) return false;
  return url.includes('.mp4') || url.includes('.webm') || url.includes('.mov');
};

module.exports = {
  getAllSlots,
  getSlotById,
  updateSlot,
  isValidVideoUrl
};
