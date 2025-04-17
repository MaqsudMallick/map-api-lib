## Installation

This is a [Node.js](https://nodejs.org/en/) module. Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install @zendothub/zendefense-Map
```

## API

```ts
import { MapRoutes } from '@zendothub/zendefense-Map/dist';
```

CommonJs:

```cjs
const { MapRouter } = require('@zendothub/zendefense-map/dist')
```

## Usage

### Default Usage

Register the routes:

```ts
import { MapRoutes } from '@zendothub/zendefense-Map/dist';
import { Router } from 'express';

const router =  use Router();

router.use(MapRouter);
```

CommonJs:

```cjs
const { MapRouter } = require('@zendothub/zendefense-map/dist')

const router =  use Router();

router.use(MapRouter);
```

# Contributing

To setup the project locally, follow these steps:

1. Clone the repository
2. Install dependencies using `pnpm install`. [pnpm](https://pnpm.io/) >= 9.0.0 is used for package management.
