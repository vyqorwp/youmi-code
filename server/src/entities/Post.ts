import {Entity, PrimaryKey, Property} from "@mikro-orm/core"
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
@Field(()=>Number)
  @PrimaryKey()
  id!: number;
@Field(()=>String)
  @Property({type:'date'})
  createdAt = new Date();
@Field(()=>String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
@Field(()=>String)
  @Property({type:'text'})
  title!: string;
}