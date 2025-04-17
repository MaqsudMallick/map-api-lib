import { Table, Model, Column, DataType } from 'sequelize-typescript';

export enum SettingStatus {
    ACTIVE = "active",
    UPDATING = "updating"
}

@Table({ timestamps: true, tableName: 'map_setting' })
export class MapSettings extends Model {
    @Column({ type: DataType.DECIMAL(8, 6), allowNull: false})
    startLatitude!: number;

    @Column({ type: DataType.DECIMAL(9, 6), allowNull: false })
    startLongitude!: number;

    @Column({ type: DataType.DECIMAL(8, 6), allowNull: false})
    endLatitude!: number;

    @Column({ type: DataType.DECIMAL(9, 6), allowNull: false })
    endLongitude!: number;

    @Column({ type: DataType.DECIMAL(8, 6), allowNull: false})
    centerLatitude!: number;

    @Column({ type: DataType.DECIMAL(9, 6), allowNull: false })
    centerLongitude!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    startZoom!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })    
    endZoom!: number;

    @Column({ type: DataType.ENUM(...Object.values(SettingStatus)), defaultValue: SettingStatus.ACTIVE, allowNull: false })
    status!: SettingStatus;
}


