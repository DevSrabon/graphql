import { Todo } from "./models/todo.model.js";
import { User } from "./models/user.model.js";

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    user: async (_, { _id }) => {
      console.log("object");
      const user = await User.findById(_id).populate({
        path: "todos",
        populate: {
          path: "user",
        },
      });
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { newUser }) => {
      const user = await User.create(newUser);
      return user;
    },
    createTodo: async (_, { newTodo }) => {
      const todo = await Todo.create(newTodo);
      await User.findByIdAndUpdate(
        todo.user._id,
        { todos: todo._id },
        { new: true }
      );

      return todo;
    },
  },
};

export default resolvers;
