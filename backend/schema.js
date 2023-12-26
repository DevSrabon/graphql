import jwt from "jsonwebtoken";
import { Todo } from "./models/todo.model.js";
import { User } from "./models/user.model.js";
const resolvers = {
  Query: {
    users: async (parent, args, contextValue) => {
      const users = await User.find();
      return users;
    },
    user: async (_, args, contextValue) => {
      if (!contextValue.user) {
        throw new Error("User is not authenticated");
      }
      const user = await User.findById(contextValue.user.userId).populate({
        path: "todos",
        populate: {
          path: "user",
        },
      });
      if (!user)
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        // standard `Error`s will have a 500 status code by default
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      return user;
    },
    todos: async () => {
      const todos = await Todo.find().populate("user");
      return todos;
    },
  },
  Mutation: {
    createUser: async (_, { newUser }) => {
      const isExist = await User.findOne({ email: newUser.email });
      if (isExist) {
        throw new Error("User already exist");
      }
      const user = await User.create(newUser);
      return user;
    },
    signinUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      console.log("🚀 ~ file: schema.js:36 ~ signinUser: ~ user:", user);
      if (!user) {
        throw new Error("User does not exist");
      }
      const isMatch = await User.comparePassword(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign({ userId: user._id, role: user.role }, "secret", {
        expiresIn: "1d",
      });
      return { token };
    },
    updateUser: async (_, { _id, newUser }) => {
      const user = await User.findByIdAndUpdate(_id, newUser, { new: true });
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
    deleteTodo: async (_, { _id }) => {
      await Todo.findByIdAndDelete(_id);
      return true;
    },
  },
};

export default resolvers;
