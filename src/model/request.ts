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
export const factory = () => RequestModel;
providerWrapper([
  {
    id: 'RequestModel',
    provider: factory,
  },
]);
// you need to export the type of Model class to ensure
// type-safety outside
export type IRequestModel = typeof RequestModel;
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
export class RequestModel extends Model<RequestModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  rid: number;
  @Column({
    type: DataType.INTEGER,
  })
  cid: number;
  @Column({
    type: DataType.INTEGER,
  })
  uid: number;
  @Column({
    type: DataType.STRING(128),
  })
  comments: string;
  @Column({
    type: DataType.ENUM,
    values: ['pending', 'accepted', 'rejected', 'canceled'],
    defaultValue: 'pending',
  })
  status: string;
  @CreatedAt
  @Column({ field: 'create_at' })
  createdTime: Date;
  @UpdatedAt
  @Column({ field: 'update_at' })
  updateTime: Date;
}
