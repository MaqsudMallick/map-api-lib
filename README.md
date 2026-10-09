# map-api

An Express route module for serving and pre-caching offline map tiles. Stores a
bounding box and zoom range as a `map_setting` record, then downloads every tile in
that range to disk so a client can render the area with no network.

Packaged as a self-contained module — it exposes its own router, controller, Sequelize
model and service, so a host application mounts it and gets the endpoints.

## Installation

```sh
npm install @maqsudmallick/map-api
```

## Usage

Mount the router in your Express app:

```ts
import { MapRouter } from '@maqsudmallick/map-api/dist';
import express from 'express';

const app = express();
app.use(MapRouter);
```

CommonJS:

```cjs
const { MapRouter } = require('@maqsudmallick/map-api/dist');
```

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/map-meta-data` | Return the stored bounding box, zoom range and status |
| `PUT` | `/map-meta-data` | Update the region, then download its tiles in the background |

`PUT` body — all fields required, validated with Joi:

```json
{
  "startZoom": 10, "endZoom": 16,
  "startLatitude": 22.5, "startLongitude": 88.3,
  "endLatitude": 22.6, "endLongitude": 88.4,
  "centerLatitude": 22.55, "centerLongitude": 88.35
}
```

Tiles land in `src/public/tiles/{z}/{x}/{y}.png`. The setting row carries a status of
`active` or `updating` so callers can tell when a download is still in flight.

## Development

```sh
pnpm install     # pnpm >= 9
pnpm build       # tsc
```

`consumer/` holds a minimal Express app that mounts the built module, for local testing.
