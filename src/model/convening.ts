import {
  DataType,
  Model,
  Column,
  CreatedAt,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { providerWrapper } from '@midwayjs/core';
export const factory = () => ConveningModel;
providerWrapper([
  {
    id: 'ConveningModel',
    provider: factory,
  },
]);
// you need to export the type of Model class to ensure
// type-safety outside
export type IConveningModel = typeof ConveningModel;
@Scopes({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: { status: 1 },
  },
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 'convenings',
})
export class ConveningModel extends Model<ConveningModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  cid: number;
  @Column({ type: DataType.INTEGER })
  owner: number;
  @Column({ type: DataType.STRING(32) })
  type: string;
  @Column({ type: DataType.STRING(32) })
  name: string;
  @Column({ type: DataType.STRING(32), allowNull: true })
  introduction?: string;
  @Column({
    field: 'crowd_number',
    type: DataType.INTEGER,
  })
  crowdNumber: number;
  @Column({ type: DataType.DATE })
  endtime: Date;
  @CreatedAt
  @Column({ field: 'create_at' })
  createdTime: Date;
  @UpdatedAt
  @Column({ field: 'update_at' })
  updateTime: Date;
  @Column({
    type: DataType.ENUM,
    values: ['completed', 'toResponse', 'canceled', 'uncompleted'],
    defaultValue: 'toResponse',
  })
  status: string;
}
