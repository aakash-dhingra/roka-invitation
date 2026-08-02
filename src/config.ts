// ============================================================
//  EVENT CONFIGURATION — EDIT THESE TO CUSTOMIZE
// ============================================================

export const EVENT_CONFIG = {
  // Couple
  brideName: "Aanchal",
  groomName: "Randeep",
  brideFullName: "Dr. Aanchal Dhingra",
  groomFullName: "Randeep Singh",
  tagline: "A beautiful beginning",

  // Ceremony
  eventTitle: "Roka Ceremony",
  eventDate: "2026-08-21", // YYYY-MM-DD
  displayDate: "21st August, 2026",
  displayDay: "Friday",
  startTime: "7:00 PM Onwards",
  endTime: "",

  // Venue
  venueName: "Golden Apple Mansion",
  venueAddress: "Pritampura, New Delhi",
  googleMapsUrl: "https://maps.app.goo.gl/siggsayemhoUtaWo6",

  // RSVP Contact
  rsvpDeadline: "10th August, 2026",
  hostName: "",
  hostPhone: "",

  // Quiz — customize questions & answers about the couple
  quizQuestions: [
    {
      question: "Where did Aanchal and Randeep first meet?",
      options: ["A coffee shop in Connaught Place", "At a college fest", "At the Gym", "A friend's Diwali party"],
      correctIndex: 2,
    },
    {
      question: "What is their shared favourite cuisine?",
      options: ["Italian", "Thai", "Japanese", "Punjabi"],
      correctIndex: 3,
    },
    {
      question: "Which city did they have their first date?",
      options: ["Mumbai", "Jaipur", "Delhi", "Udaipur"],
      correctIndex: 2,
    },
  ],
};

export type Question = typeof EVENT_CONFIG.quizQuestions[number];
