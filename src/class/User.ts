interface UserObj {
  // uid: string;
  email: string;
  // nickname: string;
  // createdAt: number;
  // updatedAt: number;
  // level: number;
  // point: number;
  // myPosts: string[];
  // myComments: string[];
  // searchedList: object[];
}

class User {
  constructor(private userObj: UserObj) {
    this.save();
  }

  public save(): void {
    //
  }
  /**
   * @param  {string} postId
   * @returns object
   */
  public get(postId: string): object {
    return {};
  }

  public update(): void {
    //
  }

  public delete(): void {
    //
  }
}

export default User;
