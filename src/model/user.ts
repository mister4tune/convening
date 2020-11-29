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
export const factory = () => UserModel;
providerWrapper([
  {
    id: 'UserModel',
    provider: factory,
  },
]);
// you need to export the type of Model class to ensure
// type-safety outside
export type IUserModel = typeof UserModel;
@Scopes({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: { status: 1 },
  },
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 'users',
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  uid: number;
  @Column({ type: DataType.STRING(16) })
  nickname: string;
  @Column({ type: DataType.STRING(32) })
  pwd: string;
  @Column({
    field: 'user_type',
    type: DataType.ENUM,
    values: ['admin', 'folk'],
    defaultValue: 'folk',
  })
  userType: string;
  @Column({
    field: 'user_name',
    type: DataType.STRING(16),
  })
  userName: string;
  @Column({
    field: 'license_type',
    type: DataType.ENUM,
    values: ['ID', 'passport'],
    defaultValue: 'ID',
  })
  licenseType: string;
  @Column({
    field: 'license_id',
    type: DataType.STRING(18),
  })
  licenseId: string;
  @Column({ type: DataType.STRING(11) })
  phone: string;
  @Column({
    type: DataType.STRING(128),
    allowNull: true,
  })
  introduction?: string;
  @Column({
    type: DataType.STRING(16),
    allowNull: true,
  })
  city?: string;
  @CreatedAt
  @Column({ field: 'create_at' })
  createdTime: Date;
  @UpdatedAt
  @Column({ field: 'update_at' })
  updateTime: Date;
}
