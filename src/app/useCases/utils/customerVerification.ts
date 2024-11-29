


// * Customer authendication 

import {OTPRepository} from '../../../infrastructure/database/mongoose/otp'
import {getUserRepository} from '../../../infrastructure/database/mongoose/user'
import {getWorkerRepository} from '../../../infrastructure/database/mongoose/worker'
import {CustomerQueryRepository} from '../../../infrastructure/database/mongoose/customer'
import {ResendOTP,GoogleLoginTypes} from '../../../domain/entities/customerOTP'  // * resend otp data types
import {User} from '../../../domain/entities/user'  // * resend otp data types
import {OtpService} from "../../services/otpService"
import {ResendOTPStore,OtpVerifyUseCases} from './otpStoreData'   // * store otp data in database and verif OTP
import { hashPassword } from '../../../shared/utils/encrptionUtils'
// GoogleLoginTypes
// * types
import {ForgetPasswordDataType} from '../../../domain/entities/customerOTP'
import { WorkerInformation } from '../../../domain/entities/worker'
import { Role } from '../../../domain/entities/commonTypes'





// * get all verified Worker for list in service page Usecases 

export const getAllWorkerDataUseCases = async ()=>{
    try {
        return await CustomerQueryRepository().getVerifiedWorker()
    } catch (error) {
        console.log(`Error from app->utils->getAllWorkerDataUseCases \n ${error}`)
        throw error
    }
}

// * here verified the worker and user data. check whether they are verified OTP 

export const userVerification= async (customerId:string,role:string)=>{
    try {
        const {verifyUser} = OTPRepository()
        const {getDataFindById} = getUserRepository()
       
            verifyUser(customerId)
            return getDataFindById(customerId)

    } catch (error) {
        console.log(`Error from app->utils->customerVerification \n ${error}`)
        throw error
    }
}

export const workerVerification = (wokerId:string)=>{
    try {
        const {verifyWorker} = OTPRepository()
        const {getWorkerData} = getWorkerRepository()

        verifyWorker(wokerId)
        return getWorkerData(wokerId)
    } catch (error) {
        console.log(`Error from app->utils->workerVerification \n ${error}`)
        throw error
    }
}


export const customerResentOTP = async(customerData:ResendOTP)=>{
    try {
        // console.log(`Req reached usCases utils cutomerResentOTP`)

        const {getUserDataResendOTP,getWorkerDataResendOTP} = OTPRepository()
        // console.log(customerData.role)
        if(customerData.role=='user' && customerData.customerId){
          
            const userEmail : string | undefined= await getUserDataResendOTP(customerData.customerId)
            // console.log(userEmail) 
            if(userEmail){
                const userData  = await OtpService(customerData.customerId,userEmail)
                // console.log(userData.customerOTP)
                await ResendOTPStore(customerData.customerId,Number(userData?.customerOTP))      // * Restore the OTP data in mongodb database
            }
        }else if(customerData.customerId){
            const workerEmail : string | undefined= await getWorkerDataResendOTP(customerData.customerId)
            console.log(`customerResentotp in worker role`) 
      
            if(workerEmail){
                const workerData  = await OtpService(customerData.customerId,workerEmail)
                await ResendOTPStore(customerData.customerId,Number(workerData?.customerOTP))      // * Restore the OTP data in mongodb database
            }

        }
    
        return true
    } catch (error) {
        console.log(`Error from app->usecase->utils->customerResentOTP\n${error}`)
        throw error
    }
}

export const ForgetPassWordUseCase = async (forgetPasswordData:ForgetPasswordDataType)=>{
    try {

        const verifyOTP = await OtpVerifyUseCases(Number(forgetPasswordData?.formData?.otpValue),forgetPasswordData.customerId)
        if(forgetPasswordData.role=="user" && verifyOTP){
            // console.log(forgetPasswordData)
            const {setNewPassWord} = getUserRepository();
            const hashNewPassword = await hashPassword(forgetPasswordData.formData.newPass)
            await setNewPassWord(forgetPasswordData.customerId,hashNewPassword)  // * call the setNewPassWord function for setting new Password user database
            return true
        }else if(forgetPasswordData.role=="worker" && verifyOTP){
            const {setNewPassWord} = getWorkerRepository();
            const hashNewPassword = await hashPassword(forgetPasswordData.formData.newPass)
            await setNewPassWord(forgetPasswordData.customerId,hashNewPassword)  // * call the setNewPassWord function for setting new Password in worker database
            return true
        }
        return false
        
    } catch (error) {
        console.log(`Error from app->usecase->utils->ForgetPassWordUseCase\n${error}`)
        throw error
    }
}

// * if customer is a worker after verification of email is not there means here we create an account for them
export const GoogleLoginWorkerRegister = async(customerData:WorkerInformation)=>{
    try {
        
        // console.log(`Req reached GoogleLoginWorker`)
       
        delete customerData.role
     
        await getWorkerRepository().insertWorker(customerData)
        return getWorkerRepository().findWorker(customerData.emailAddress)
    } catch (error) {
        
    }
}

// * Google Login UseCases 
export const GoogleLoginUseCases = async (customerData:GoogleLoginTypes )=>{
    try {
        // console.log('use case')
        // console.log(customerData)
        if(customerData.role==Role.User){
            const {UserGoogleLogin} = CustomerQueryRepository()     // * user
            // console.log(customerData)
            const UserData : User = {
                username : customerData.username,
                phoneNumber : 0,
                emailAddress : customerData?.emailAddress,
                password : '',
                isVerified : true,
                address : ''
            }
            await UserGoogleLogin(UserData)             // * create the user if already there means it won't create. Used Upsert
            const {findUserByEmail} = getUserRepository()
            return findUserByEmail(customerData.emailAddress)
        }
    } catch (error) {
        console.log(`Error from app->usecase->utils->GoogleLoginUseCases\n${error}`)
        throw error
    }
}


// * worker verification while worker login through google
export const workerGoogleVerification = async (workerEmail:any)=>{
    try {   
        return await CustomerQueryRepository().WorkerGoogleLoginVerification(workerEmail)
        
    } catch (error) {
        console.log(`Error from app->usecase->utils->workerGoogleVerification\n${error}`)
        throw error
    }
}