import { NextResponse } from 'next/server';


const mock_data = {
    "cities": [
      {
        "name": "New York",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "vehicles": [
          {
            "vehicle_id": "NY_Vehicle_1",
            "locations": [
              {
                "timestamp": "2024-12-21T06:00:00Z",
                "latitude": 40.7130,
                "longitude": -74.0058
              },
              {
                "timestamp": "2024-12-21T07:00:00Z",
                "latitude": 40.7135,
                "longitude": -74.0055
              },
              // ... (14 more location points)
            ]
          },
          {
            "vehicle_id": "NY_Vehicle_2",
            "locations": [
              {
                "timestamp": "2024-12-21T06:00:00Z",
                "latitude": 40.7125,
                "longitude": -74.0062
              },
              {
                "timestamp": "2024-12-21T07:00:00Z",
                "latitude": 40.7128,
                "longitude": -74.0059
              },
              // ... (14 more location points)
            ]
          },
          // ... (18 more vehicles)
        ]
      },
      {
        "name": "San Francisco",
        "latitude": 37.7749,
        "longitude": -122.4194,
        "vehicles": [
          {
            "vehicle_id": "SF_Vehicle_1",
            "locations": [
              {
                "timestamp": "2024-12-21T06:00:00Z",
                "latitude": 37.7751,
                "longitude": -122.4192
              },
              {
                "timestamp": "2024-12-21T07:00:00Z",
                "latitude": 37.7754,
                "longitude": -122.4190
              },
              // ... (14 more location points)
            ]
          },
          // ... (19 more vehicles)
        ]
      },
      {
        "name": "Los Angeles",
        "latitude": 34.0522,
        "longitude": -118.2437,
        "vehicles": [
          {
            "vehicle_id": "LA_Vehicle_1",
            "locations": [
              {
                "timestamp": "2024-12-21T06:00:00Z",
                "latitude": 34.0524,
                "longitude": -118.2435
              },
              {
                "timestamp": "2024-12-21T07:00:00Z",
                "latitude": 34.0527,
                "longitude": -118.2433
              },
              // ... (14 more location points)
            ]
          },
          // ... (19 more vehicles)
        ]
      },
      {
        "name": "Chicago",
        "latitude": 41.8781,
        "longitude": -87.6298,
        "vehicles": [
          {
            "vehicle_id": "CHI_Vehicle_1",
            "locations": [
              {
                "timestamp": "2024-12-21T06:00:00Z",
                "latitude": 41.8783,
                "longitude": -87.6296
              },
              {
                "timestamp": "2024-12-21T07:00:00Z",
                "latitude": 41.8786,
                "longitude": -87.6294
              },
              // ... (14 more location points)
            ]
          },
          // ... (19 more vehicles)
        ]
      },
      {
        "name": "Houston",
        "latitude": 29.7604,
        "longitude": -95.3698,
        "vehicles": [
          {
            "vehicle_id": "HOU_Vehicle_1",
            "locations": [
              {
                "timestamp": "2024-12-21T06:00:00Z",
                "latitude": 29.7606,
                "longitude": -95.3696
              },
              {
                "timestamp": "2024-12-21T07:00:00Z",
                "latitude": 29.7609,
                "longitude": -95.3694
              },
              // ... (14 more location points)
            ]
          },
          // ... (19 more vehicles)
        ]
      },
      {
        "name": "Las Vegas",
        "latitude": 36.1699,
        "longitude": -115.1398,
        "vehicles": [
          {
            "vehicle_id": "LV_Vehicle_1",
            "locations": [
              {
                "timestamp": "2024-12-21T06:00:00Z",
                "latitude": 36.1701,
                "longitude": -115.1396
              },
              {
                "timestamp": "2024-12-21T07:00:00Z",
                "latitude": 36.1704,
                "longitude": -115.1394
              },
              // ... (14 more location points)
            ]
          },
          // ... (19 more vehicles)
        ]
      },
      {
        "name": "Seattle",
        "latitude": 47.6062,
        "longitude": -122.3321,
        "vehicles": [
          {
            "vehicle_id": "SEA_Vehicle_1",
            "locations": [
              {
                "timestamp": "2024-12-21T06:00:00Z",
                "latitude": 47.6064,
                "longitude": -122.3319
              },
              {
                "timestamp": "2024-12-21T07:00:00Z",
                "latitude": 47.6067,
                "longitude": -122.3317
              },
              // ... (14 more location points)
            ]
          },
          // ... (19 more vehicles)
        ]
      }
    ],
    "note": "Each city contains 20 vehicles with location updates over a 16-hour period (from 06:00 to 22:00 UTC). The latitude and longitude values are slightly varied from the city centroids to simulate movement."
  }
  

    export async function GET(request: Request) {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city');

        if (!city) {
            return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
        }

        const cityData = mock_data.cities.find(c => 
            c.name.toLowerCase() === city.toLowerCase()
        );

        if (!cityData) {
            return NextResponse.json({ error: 'City not found' }, { status: 404 });
        }

        return NextResponse.json(cityData);
    }   