export interface Comments {
    commentId: string | undefined;
    userCommentId: string | undefined;
    userModel: UserModel;
    createAt: string | undefined;
    content: string | undefined;
    commentReplyList: [];
  }
  
  interface UserModel {
    fullName: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    avatar: string | undefined;
    jobTitle: string | undefined;
  }