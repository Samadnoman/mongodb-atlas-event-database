// Sports Hall Event database: aggregation pipelines (MongoDB)
// Collection: Event (query 6 also uses a Sports_Hall collection via $lookup)

// Query 1: Total revenue for each event type where expected crowd is above 1,000
db.Event.aggregate([
  {
    $match: {
      Expected_Crowd: { $gt: 1000 }
    }
  },
  {
    $project: {
      Event_Type: 1,
      Total_Revenue: {
        $add: [
          { $multiply: ["$Ticket_Price", "$Actual_Crowd"] },
          "$Food_Sales",
          "$Merchandise_Sales"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$Event_Type",
      Total_Revenue: { $sum: "$Total_Revenue" }
    }
  },
  {
    $sort: { Total_Revenue: -1 }
  }
])

// Query 2: Average crowd by month for concerts
db.Event.aggregate([
  {
    $match: {
      Event_Type: "Concert"
    }
  },
  {
    $group: {
      _id: "$Event_Month",
      Avg_Crowd: { $avg: "$Actual_Crowd" }
    }
  },
  {
    $sort: { Avg_Crowd: -1 }
  }
])

// Query 3: Top 5 events with the highest profit
db.Event.aggregate([
  {
    $project: {
      Event_Type: 1,
      Profit: {
        $subtract: [
          {
            $add: [
              { $multiply: ["$Ticket_Price", "$Actual_Crowd"] },
              "$Food_Sales",
              "$Merchandise_Sales"
            ]
          },
          "$Security_Cost"
        ]
      }
    }
  },
  {
    $sort: { Profit: -1 }
  },
  {
    $limit: 5
  }
])

// Query 4: Count of events by atmosphere
db.Event.aggregate([
  {
    $group: {
      _id: "$Atmosphere",
      Total_Events: { $sum: 1 }
    }
  },
  {
    $sort: { Total_Events: -1 }
  }
])

// Query 5: Average sponsorship by sponsor type
db.Event.aggregate([
  {
    $group: {
      _id: "$Sponsor_Type",
      Avg_Sponsorship: { $avg: "$Sponsorship_Value" }
    }
  },
  {
    $sort: { Avg_Sponsorship: -1 }
  }
])

// Query 6: Events where the crowd exceeded hall capacity (join with $lookup)
db.Event.aggregate([
  {
    $lookup: {
      from: "Sports_Hall",
      localField: "sports_hall_id",
      foreignField: "_id",
      as: "hall"
    }
  },
  {
    $unwind: "$hall"
  },
  {
    $match: {
      $expr: { $gt: ["$Actual_Crowd", "$hall.Capacity"] }
    }
  },
  {
    $project: {
      Event_Type: 1,
      Actual_Crowd: 1,
      "hall.Name": 1,
      "hall.Capacity": 1
    }
  }
])

// Query 7: Revenue by sports hall
db.Event.aggregate([
  {
    $group: {
      _id: "$sports_hall_id",
      Total_Revenue: {
        $sum: {
          $add: [
            { $multiply: ["$Ticket_Price", "$Actual_Crowd"] },
            "$Food_Sales"
          ]
        }
      }
    }
  },
  {
    $sort: { Total_Revenue: -1 }
  }
])

// Query 8: Technician workload analysis
db.Event.aggregate([
  {
    $group: {
      _id: "$Technician.Qualification",
      Avg_Hours: { $avg: "$Technician.Total_Hours" },
      Max_Hours: { $max: "$Technician.Total_Hours" }
    }
  }
])

// Query 9: Monthly event distribution
db.Event.aggregate([
  {
    $group: {
      _id: "$Event_Month",
      Count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
])

// Query 10: High-performing events
db.Event.aggregate([
  {
    $match: {
      Atmosphere: "Excellent",
      Actual_Crowd: { $gt: 1000 }
    }
  },
  {
    $group: {
      _id: "$Event_Type",
      Count: { $sum: 1 },
      Avg_Revenue: {
        $avg: {
          $add: [
            { $multiply: ["$Ticket_Price", "$Actual_Crowd"] },
            "$Food_Sales"
          ]
        }
      }
    }
  }
])
