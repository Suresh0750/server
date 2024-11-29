
import { StatusCode } from "../../../domain/entities/commonTypes";
import { User ,ProfileTypes,ConversationTypes, EditProfileTypes} from "../../../domain/entities/user";
import { IgetUserRepository } from "../../../domain/repositories/user";
import { getUserRepository } from "../../../infrastructure/database/mongoose/user";
import { hashPassword } from "../../../shared/utils/encrptionUtils";
import { OtpService } from "../../services/otpService";
import { OtpStoreData } from "../utils/otpStoreData";
import { sendMessage } from "../utils/chatUtils";

//672b0a442d110d2355978ef4


export const paymentIdUsecases = async(requestId:string)=>{
  try{
    return await getUserRepository().getPaymentId(requestId)
  }catch(error){
    console.log(`error from usecase in paymentIdUsecases`, error);
    throw error;
  }
}

// * get booking details usecases

export const getBookingUsecases = async(userId:string)=>{
  try{
    const [bookingDetails,reviewDetails] = await Promise.all([
      getUserRepository().getBooking(userId),
      getUserRepository().getReviewID(userId)
    ])
    return {bookingDetails,reviewDetails} 
  }catch(error){
    console.log(`error from usecase in getBookingUsecases`, error);
    throw error;
  }
}

// * user in chat side

export const getMessageUsecases = async(conversationId:string)=>{
  try {
    await getUserRepository().updateIsReadQuery(conversationId)
    return await getUserRepository().fetchMessageQuery(conversationId)
  } catch (error) {
    console.log(`error from usecase in getMessageUsecases`, error);
    throw error;
  }
}

export const getConversationUsecases = async(id:string)=>{
  try {
    return await getUserRepository().fetchConversation(id)
  } catch (error) {
    console.log(`error from usecase in getConversationUsecases`, error);
    throw error;
  }
}


export const conversationUsecases = async(data:ConversationTypes)=>{
  try {
  
    const checkExist :ConversationTypes|null = await getUserRepository().checkConversation(String(data?.userId),String(data?.workerId))
    // console.log('Checkexist')
    // console.log(JSON.stringify(checkExist)) 
    if(checkExist){
      await  getUserRepository().updateConversation(data)
    }else{
         // * user click messge box in single worker details page side here no message
      await getUserRepository().conversationQuery(data)  // * create conversation
    }
    const conversation = await getUserRepository().findconversationId(String(data?.userId),String(data?.workerId))
    if(data?.lastMessage && conversation?._id) {
     const result =  await getUserRepository().createMessage({conversationId:conversation?._id || '',sender:data?.userId,message:data?.lastMessage})
     console.log(`create the new document`)    
      await sendMessage(result)
    }
    
    return 
  } catch (error) {
    console.log(`error from usecase in conversationUsecases`, error);
    throw error;
  }
}

// * profile side
export const EditprofileUsecases = async(data:ProfileTypes)=>{
  try{
      const {username,emailAddress,phoneNumber,profile} = data
      const userData:EditProfileTypes = {
        username,
        phoneNumber,
        emailAddress
      }
      if(profile){
        userData.profile = profile
      }
      console.log('userData')
      console.log(userData)
      return getUserRepository().updateprofile(userData)
  }catch(error){
    console.log(`error from usecase in editprofileUsecases`, error);
    throw error;
  }
}

export const ProfileUsecases = async (_id:string)=>{
  try {
    return getUserRepository().Profile(_id)
  } catch (error) {
    console.log(`error from usecase in ProfileUsecases`, error);
    throw error;
  }
}

export const createUser = async (userData: User) => {
  try {
    
    console.log(`req comes usecase createUser`);
    const {findUserByEmail,insertUserDetails,createUser}: IgetUserRepository = getUserRepository();
    const isExistUser: User | null = await findUserByEmail(
      userData.emailAddress
    );
    if (isExistUser && isExistUser?.isVerified) {
      throw new Error("Email is already exist");
    }

    const hashPass = await hashPassword(userData.password); // * here we used to hash the password
    userData.password = hashPass;
    let _id: string | undefined;
    if (isExistUser && !isExistUser?.isVerified) {
      await insertUserDetails(userData);
      userData = isExistUser;
      _id = isExistUser._id;
    } else {
      userData = await createUser(userData); // * we store the data to the database
      _id = userData._id;
    }

    const { customerOTP, customerId } = await OtpService(_id, userData.emailAddress); // * call the otpService
    console.log(`${customerOTP} -- ${customerId}==>`);
    await OtpStoreData(customerId, customerOTP);
    return customerId;

  } catch (err:any) {
    console.log(`error from usecase in createUser`, err?.message);
    throw err;
  }
};
