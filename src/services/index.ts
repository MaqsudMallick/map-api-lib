import axios from "axios";
import fs from "fs";
import path from "path";
import { MapSettings, SettingStatus } from "../models";

const urlTemplate: string = "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}";
const tilesDirectory: string = './src/public/tiles';

const downloadTiles  = async (
    startZoom: number, 
    endZoom: number, 
    startLatitude: number, 
    startLongitude: number, 
    endLatitude: number, 
    endLongitude: number
) => {
    for (let z = startZoom; z <= endZoom; z++) {
        const zFolder = path.join(tilesDirectory, z.toString());
        if (!fs.existsSync(zFolder)) fs.mkdirSync(zFolder, { recursive: true });

        const startX = getXTile(startLongitude, z);
        const endX = getXTile(endLongitude, z);
        const startY = getYTile(startLatitude, z);
        const endY = getYTile(endLatitude, z);

        for (let x = startX; x <= endX; x++) {
            const xFolder = path.join(zFolder, x.toString());
            if (!fs.existsSync(xFolder)) fs.mkdirSync(xFolder, { recursive: true });
            
            for (let y = startY; y <= endY; y++) {
                const yFile = path.join(xFolder, `${y}.jpg`);
                const tileUrl = urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
                if (fs.existsSync(yFile)) {
                    continue;
                }
                try {
                    const response = await axios.get<NodeJS.ArrayBufferView>(tileUrl, { responseType: 'arraybuffer' });
                    const buffer = response.data
                    fs.writeFileSync(yFile, buffer);
                } catch (error: unknown) {
                    try {
                        await setProcessingActive();
                    } catch (error: unknown) {
                        throw new Error(`Error setting processing active`);
                    }
                    throw new Error(`Error downloading ${tileUrl}:`);
                }
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    try {
        await setProcessingActive();
    } catch (error: unknown) {
        throw new Error(`Error setting processing active`);
    }
}

const getMapData = async (): Promise<MapSettings | null> => await MapSettings.findOne();

const updateMapData = async (startZoom: number, endZoom: number, startLatitude: number, startLongitude: number, endLatitude: number, endLongitude: number, centerLatitude: number, centerLongitude: number): Promise<[affectedCount: number]> => await MapSettings.update({ startZoom: startZoom, endZoom: endZoom, startLatitude: startLatitude, startLongitude: startLongitude, endLatitude: endLatitude, endLongitude: endLongitude, centerLatitude: centerLatitude, centerLongitude: centerLongitude, status: SettingStatus.UPDATING }, { where: { id: 1 } });

const setProcessingActive = async (): Promise<[affectedCount: number]> => await MapSettings.update({ status: SettingStatus.ACTIVE }, { where: { id: 1 } });

const getXTile = (lon: number, zoom: number): number => Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));

const getYTile = (lat: number, zoom: number): number => Math.floor((1 - Math.log(Math.tan(deg2rad(lat)) + 1 / Math.cos(deg2rad(lat))) / Math.PI) / 2 * Math.pow(2, zoom));

const deg2rad = (deg: number): number => deg * (Math.PI / 180);

export const MapService = { downloadTiles, getMapData, updateMapData }