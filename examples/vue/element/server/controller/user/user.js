import UserModel from '../../models/userModel';
class User extends UserModel {
  constructor() {
    super();
  }
  login = async (ctx) => {
    console.log(ctx.response);
    ctx.body = {
      data: {
        success: true,
      },
      success: true
    };
    return await ctx;
  };
  register = async (ctx) => {
    ctx.body = {
      data: {
        method: ctx.method,
      },
      success: true
    }
    return await ctx;
  }
}

export default new User();
