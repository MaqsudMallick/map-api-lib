import { Request, RequestHandler, Response } from 'express';
import Joi from 'joi';
import { MapService } from '../services';
import { validateSchema } from '../utils/validateSchema';

const getMapSettingsData: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const mapData = await MapService.getMapData();
        res.status(200).json({ status: true, message: mapData });
    } catch (e: any) {
        res.status(500).json({ status: false, message: e.message });
    }
};

const updateMapSettingsData: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const validationError = validateSchema<typeof req.body>(MapDataSchema, req.body)
        if (validationError) {
            res.status(422).json({ status: false, message: validationError });
            return;
        }
        const {startZoom, endZoom, startLatitude, startLongitude, endLatitude, endLongitude, centerLatitude, centerLongitude} = req.body;
        await MapService.updateMapData(startZoom, endZoom, startLatitude, startLongitude, endLatitude, endLongitude, centerLatitude, centerLongitude)
        MapService.downloadTiles(startZoom, endZoom, startLatitude, startLongitude, endLatitude, endLongitude);
        res.status(200).json({ status: true, message: 'Map data updated' });
    } catch (e: any) {
        res.status(500).json({ status: false, message: e.message });
    }
};

const MapDataSchema = Joi.object().keys({
    startZoom: Joi.number().required(),
    endZoom: Joi.number().required(),
    startLatitude: Joi.number().precision(6).min(-90).max(90).required(),
    startLongitude: Joi.number().precision(6).min(-180).max(180).required(),
    endLatitude: Joi.number().precision(6).min(-90).max(90).required(),
    endLongitude: Joi.number().precision(6).min(-180).max(180).required(),
    centerLatitude: Joi.number().precision(6).min(-90).max(90).required(),
    centerLongitude: Joi.number().precision(6).min(-180).max(180).required(),
});

interface MapControllerType {
    getMapSettingsData: typeof getMapSettingsData;
    updateMapSettingsData: typeof updateMapSettingsData;
}

export const MapController: MapControllerType = { updateMapSettingsData, getMapSettingsData }