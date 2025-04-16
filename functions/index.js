/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.database();
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

exports.archiveOldLoveNotes = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
  const snapshot = await db.ref("loveNotes").once("value");
  const now = Date.now();

  const updates = {};
  const deletions = {};

  snapshot.forEach(child => {
    const note = child.val();
    const key = child.key;

    if (note.createdAt && (now - note.createdAt > SEVEN_DAYS_MS)) {
      // Move to archive
      updates[`/archivedNotes/${key}`] = note;
      deletions[`/loveNotes/${key}`] = null;
    }
  });

  if (Object.keys(updates).length > 0) {
    await db.ref().update({ ...updates, ...deletions });
    console.log(`Archived ${Object.keys(updates).length} old love notes.`);
  } else {
    console.log("No notes to archive today.");
  }

  return null;
});

