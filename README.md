# Baiku exercise

## Installation

```bash
> git init
> git pull https://github.com/NelsonManuelGM/baiku-design-challenge.git
> docker-compose up
```

## Development Recommendations

1 - The demo was wrapped using docker technology in order to make it easy to deploy and avoiding compatibilities problems.

2 - The SWAGGER documentation is available on:
```
GET api/doc
```

## Features Explanation

### Bicycles reservations

1 -  All activities to book a bicycle (even instantly) will be stored in the reservation table.
You can book a bicycle right away or within 24 hours using the same endpoint.

```
POST api/reservation
body
{
    id_user: xxxxxxxxxxxxxxx,
    id_location: xxxxxxxxxxxxxxx,
    reserve_for ?: "YYYY/MM/DD HH:MM:SS",
    id_bicycle ?: xxxxx
}
```

* In the first case:
Creating the reservation with all information needed. It will unlock the bicycle as soon as the reservation (with the bicycle id and the rest of the data is already recognized) is completed.
* In the second case:
Create the reservation with only partial information. The bicycle won't be unlocked until you activate the reservation after, using the next endpoint to complete the reservation.

```
UPDATE api/reservation/:id
body
{
    id_location ?: xxxxxxxxxxxxxxx,
    reserve_for ?: "YYYY/MM/DD HH:MM:SS",
    id_bicycle ?: xxxxx
}
```

The Activation is partial because you can update the reservation time or the pickup location as long as the reservation is valid and booked within 24 hours. Also, the id_bicycle, can't come alone, it must be provided alongside the reserve_for variable;

### Closest Pickup-location

2 - In order to know the closest location to your current position, you can consume:

```
GET api/pickup-location/closest
query params
{
    lat: xxxxxxxx
    lng: xxxxxxxx
}
```

### Bicycles gps tracking

3 - The GPS position from bicycles will be updated through its endpoint.

```
UPDATE api/bicycle/:id
```

## Development Observations

1 -  In Order to work with a homogeneous id generation I substituted the 6-character ID idea for a UUID id auto-generated (primary key)

2 -  In the reservation endpoint we are sending the user id in order to make the demo simple.
In a real situation:

* The user will be in the request, and then we can get its information from there.

* There should be a wait to cancel an uncompleted reservation

3 -  In Order to make the demo simpler there are no unit tests, integration tests, or e2e tests. In a real situation:

* They must be included depending on the testing strategy.
