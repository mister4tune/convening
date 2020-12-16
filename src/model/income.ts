import { DataType, Model, Column, Scopes, Table } from 'sequelize-typescript';
import { providerWrapper } from '@midwayjs/core';
export const factory = () => IncomeModel;
providerWrapper([
  {
    id: 'IncomeModel',
    provider: factory,
  },
]);
// you need to export the type of Model class to ensure
// type-safety outside
export type IIncomeModel = typeof IncomeModel;
@Scopes({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: { status: 1 },
  },
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 'income',
})
export class IncomeModel extends Model<IncomeModel> {
  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;
  @Column({ type: DataType.INTEGER })
  income: number;
  @Column({ type: DataType.STRING(32) })
  type: string;
  @Column({ type: DataType.STRING(32) })
  ctype: string;
  @Column({ type: DataType.STRING(32) })
  city: string;
  @Column({ type: DataType.DATE, primaryKey: true, autoIncrement: true })
  date: Date;
}
