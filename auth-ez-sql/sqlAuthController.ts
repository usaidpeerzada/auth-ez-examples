import { AuthController, Types } from "auth-ez";

export default class SqlAuthController extends AuthController {
  // declare User: Types.User;
  async getUser(data: Types.GetUser): Promise<Types.User> {
    let user: Types.User;
    if (data?.email) {
      user = await this.User.findOne({ where: { email: data.email } });
    } else if (data?.username) {
      user = await this.User.findOne({ where: { username: data.username } });
    } else {
      user = await this.User.findOne({ where: { id: data.id } });
    }
    return user?.dataValues;
  }
  async saveUser(params: Types.SaveUser): Promise<Types.User> {
    console.log(params);
    const newUser = await this.User.create(params);
    await newUser.save();
    return newUser;
  }
  async updateUser(params: Types.UpdateUser): Promise<Types.User> {
    console.log("aprams", params);
    const updateUser = await this.User.update(
      { password: params?.password },
      { where: { id: params.id } }
    );
    return updateUser;
  }
}
