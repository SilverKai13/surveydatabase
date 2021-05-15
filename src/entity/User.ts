import { Field,Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity{
  
  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: String

  @Field()
  @Column()
  email: String

  @Field()
  @Column()
  age: String

  @Field()
  @Column()
  address: String
}
