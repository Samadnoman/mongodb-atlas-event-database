# Sports Hall Event Database in MongoDB (Part 1)

A MongoDB document database for events held at sports halls, with 20 query-language questions and 10 aggregation pipelines run in MongoDB Atlas. Each event document embeds its sports hall and technician details, and uses arrays for sponsors and refreshments.

Built for the Relational Database module of my MSc in Data Analytics and completed in April 2026. My later project, [Sports Hall Events: MongoDB Database Project](https://github.com/Samadnoman/sports-hall-events-mongodb), continues this work with a larger dataset, 35 queries, 15 pipelines, Compass and full verification.

## Project at a glance

| | |
|---|---|
| **Database** | Collection `Event`, one document per event |
| **Simple queries** | 20, covering comparison, logical, array, pattern and type operators |
| **Aggregation pipelines** | 10, including a `$lookup` join to a `Sports_Hall` collection |
| **Tools** | MongoDB Atlas, Excel (data generation) |
| **Completed** | April 2026 (uploaded to GitHub in November 2026) |

## Data model

The design is denormalised: everything about an event sits in one document, so most questions need no joins.

- **Event details:** year, month, type (Sport, Concert, Conference and so on), duration, expected and actual crowd, ticket price and atmosphere.
- **Sponsorship:** an array of sponsor names, with sponsorship value and sponsor type.
- **Sales and refreshments:** an array of refreshments (tea, coffee, soft drinks), plus food and merchandise sales.
- **Sports hall (embedded document):** name, city, county, sports supported, seating, floor type, energy source, lighting, year built, cost, capacity and acoustics.
- **Technician (embedded document):** name, location, qualification, total hours and hourly fee.

## Query coverage

**Simple queries ([`queries/simple_queries.js`](queries/simple_queries.js))** use `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$and`, `$or`, `$not`, `$exists`, `$regex`, `$size`, `$all`, `$mod`, `$type` and `$expr`, plus dot notation into the embedded documents. For example:

- events where the actual crowd beat the expected crowd in the first four months (`$expr`)
- events handled by Degree-qualified technicians who worked over 30 hours (dot notation)
- events sponsored by Aldi with sponsorship over €2,000 (`$all`)

**Aggregation pipelines ([`queries/aggregation_pipelines.js`](queries/aggregation_pipelines.js))** use `$match`, `$project`, `$group`, `$sort`, `$limit`, `$lookup` and `$unwind`, with `$sum`, `$avg`, `$max`, `$add`, `$subtract` and `$multiply`:

1. Total revenue for each event type where the expected crowd is above 1,000
2. Average crowd by month for concerts
3. Top 5 events with the highest profit
4. Count of events by atmosphere
5. Average sponsorship by sponsor type
6. Events where the crowd exceeded the hall's capacity (`$lookup` join)
7. Revenue by sports hall
8. Technician workload
9. Monthly event distribution
10. High-performing events

## Findings

- Concerts and conferences brought in more total revenue than smaller events such as meetings and quizzes.
- Events with higher ticket prices tended to have smaller crowds, but still earned high revenue per person.
- Media and Technology sponsors had the highest average sponsorship values.
- Some events had more people than the hall's capacity, which points to a safety and planning concern.
- Technicians with Degree qualifications tended to work more hours on larger events.

The full write-up, with screenshots of the results in Atlas, is in the [project report](docs/MongoDB_Database_Project.pdf) and the [aggregation pipelines report](docs/Aggregation_Pipeline_Queries.pdf).

## Repository structure

```
queries/
  simple_queries.js            20 find() and countDocuments() queries with their questions
  aggregation_pipelines.js     10 aggregation pipelines
docs/
  MongoDB_Database_Project     Design, data import, simple queries, findings and conclusion (.docx and .pdf)
  Aggregation_Pipeline_Queries All 10 pipelines with their results (.docx and .pdf)
```

## Related project

The [Customer Review Analytics (Flipkart) project](https://github.com/Samadnoman/customer-review-analytics-tableau) was completed for the same module.

## Licence

Released under the [MIT Licence](LICENSE).
