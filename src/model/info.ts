import { DataType, Model, Column, Scopes, Table } from 'sequelize-typescript';
import { providerWrapper } from '@midwayjs/core';
export const factory = () => InfoModel;
providerWrapper([
  {
    id: 'RequestModel',
    provider: factory,
  },
]);
// you need to export the type of Model class to ensure
// type-safety outside
export type IInfoModel = typeof InfoModel;
@Scopes({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: { status: 1 },
  },
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 'requests',
})
export class InfoModel extends Model<InfoModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  infoId: number;
  @Column({
    type: DataType.INTEGER,
  })
  rid: number;
  @Column({
    type: DataType.INTEGER,
  })
  owner: number;
  @Column({
    type: DataType.INTEGER,
  })
  contractor: number;
  @Column({
    type: DataType.DATE,
  })
  date: Date;
  @Column({
    type: DataType.INTEGER,
  })
  ownerFee: number;
  @Column({
    type: DataType.INTEGER,
  })
  constructorFee: number;
}
