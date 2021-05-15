
import { User } from "../entity/User";
import { Arg, Mutation, Resolver, Query, InputType,Field } from "type-graphql";

@InputType()
class UserInput{

    @Field()
    name: String
  
    @Field()
    email: String
  
    @Field()
    age: String
  
    @Field()
    address: String
}

@Resolver()
export class UserResolver{
    @Mutation(()=>Boolean)
    async createUser(
        @Arg("options",()=>UserInput) options:UserInput
    ){
        await User.insert(options);
        return true;
    }

    @Query(()=>[User])
    users(){
        return User.find();
    }
}