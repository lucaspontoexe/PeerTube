import { AllowNull, Column, CreatedAt, HasMany, Is, Model, Table, UpdatedAt } from 'sequelize-typescript'
import { isHostValid } from '../../helpers/custom-validators/servers'
import { ActorModel } from '../activitypub/actor'
import { throwIfNotValid } from '../utils'

@Table({
  tableName: 'server',
  indexes: [
    {
      fields: [ 'host' ],
      unique: true
    }
  ]
})
export class ServerModel extends Model<ServerModel> {

  @AllowNull(false)
  @Is('Host', value => throwIfNotValid(value, isHostValid, 'valid host'))
  @Column
  host: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date

  @HasMany(() => ActorModel, {
    foreignKey: {
      name: 'serverId',
      allowNull: true
    },
    onDelete: 'CASCADE',
    hooks: true
  })
  Actors: ActorModel[]
}
