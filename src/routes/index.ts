import { Router } from "express";
import { MapController } from "../controllers";

const router: Router = Router()

router.get('/map-meta-data', MapController.getMapSettingsData);
router.put('/map-meta-data', MapController.updateMapSettingsData);

export const MapRouter = router