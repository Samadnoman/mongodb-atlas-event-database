// Sports Hall Event database: simple queries (MongoDB)
// Collection: Event

// 1. Find sum of sport events with sponsorship>3000, good atmosphere, and ticket price above 20
db.Event.countDocuments({
  Event_Type: "Sport",
  Sponsorship_Value: { $gt: 3000 },
  Atmosphere: "Good",
  Ticket_Price: { $gt: 20 }
})

// 2. Find events where actual crowd exceeded expected crowd in early months
db.Event.find(
{
  $expr: { $gt: ["$Actual_Crowd", "$Expected_Crowd"] },
  Event_Month: { $lte: 4 },
  Ticket_Price: { $gt: 15 }
},
{
  Event_Type: 1,
  Actual_Crowd: 1,
  Expected_Crowd: 1,
  Event_Month: 1
})

// 3. Find events sponsored by Tesco with Tea refreshments and Technology sponsor
db.Event.countDocuments({
  Sponsors: "Tesco",
  Refreshments: "Tea",
  Sponsor_Type: "Technology"
})

// 4. Find low crowd events with high ticket price and poor atmosphere
db.Event.countDocuments({
Actual_Crowd: { $lt: 800 },
Ticket_Price: { $gt: 40 },
Atmosphere: "Poor"
})

// 5. Find events handled by experienced technicians with degree and low security cost
db.Event.countDocuments({
  "Technician.Total_Hours": { $gt: 30 },
  "Technician.Qualification": "Degree",
  Security_Cost: { $lt: 2000 }
})

// 6. Find number of events with event type concert/ drama atmosphere is excellent and ticket price = 25.
db.Event.countDocuments({
  Event_Type: { $in: ["Concert","Drama"] },
  Atmosphere: "Excellent",
  Ticket_Price: { $gt: 25 }
})

// 7. Number of documents where event type is "Sport" or "Quiz", Sponsorship_Value is greater than 2000 and Food_Sales is 500
// (The query for this one appears only as a screenshot in the report.)

// 8. Demonstrating ($and) function.
db.Event.find(
{
  $and: [
    { Ticket_Price: { $gt: 30 } },
    { Actual_Crowd: { $gt: 1000 } },
    { Atmosphere: "Good" }
  ]
},
{
  Ticket_Price: 1,
  Actual_Crowd: 1
})

// 9. Demonstrating ($or)
db.Event.find(
{
  $or: [
    { Event_Type: "Sport" },
    { Event_Type: "Concert" }
  ],
  Ticket_Price: { $gt: 20 },
  Atmosphere: "Excellent"
},
{
  Event_Type: 1,
  Atmosphere: 1
})

// 10. Demonstrating ($exists): number of documents where merchandise sales is greater than 1000 and food sales is greater than 500
db.Event.countDocuments({
  Merchandise_Sales: { $exists: true, $gt: 1000 },
  Food_Sales: { $gt: 500 }
})

// 11. Demonstrating  ($regex)
db.Event.countDocuments({
  "Technician.Name": { $regex: "^Tech_1" },
  Event_Type: "Meeting",
  Atmosphere: "Fair"
})

// 12. Demonstrating ($gte / $lte)
			db.Event.countDocuments({
  		Ticket_Price: { $gte: 20, $lte: 40 },
  		Actual_Crowd: { $gte: 1000, $lte: 3000 },
	Atmosphere: "Good"
	})

// 13. Demonstrating ($size)
db.Event.countDocuments({
  Sponsors: { $size: 1 },
  Sponsorship_Value: { $gt: 2000 },
  Event_Type: "Concert"
})

// 14. Demonstrating ($not)
db.Event.countDocuments({
  Ticket_Price: { $not: { $gt: 40 } },
  Atmosphere: "Fair",
  Food_Sales: { $gt: 500 }
})

// 15. Demonstrating ($expr complex)
db.Event.countDocuments({
  $expr: { $lt: ["$Actual_Crowd", "$Expected_Crowd"] },
  Ticket_Price: { $gt: 20 },
  Atmosphere: "Poor"
})

// 16. Demonstrating ($mod)
db.Event.countDocuments({
  Event_Month: { $mod: [2, 0] },
  Ticket_Price: { $gt: 15 },
  Atmosphere: "Good"
})

// 17. Demonstrating ($type)
db.Event.countDocuments({
  Ticket_Price: { $type: "int" },
  Actual_Crowd: { $gt: 1000 },
  Atmosphere: "Excellent"
})

// 18. Demonstrating ($all)
db.Event.countDocuments({
  Sponsors: { $all: ["Aldi"] },
  Sponsorship_Value: { $gt: 2000 },
  Atmosphere: "Good"
})

// 19. Demonstrating (nested + range)
db.Event.countDocuments({
  "Technician.Hourly_Fee": { $gt: 20 },
  "Technician.Total_Hours": { $lt: 40 },
  Event_Type: "Conference"
})

// 20. Demonstrating (final mixed)
db.Event.countDocuments({
  Event_Type: "Exhibition",
  Sponsorship_Value: { $gt: 3000 },
  Food_Sales: { $gt: 1000 },
  Atmosphere: "Excellent"
})
