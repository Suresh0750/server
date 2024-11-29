
import {
    PersonalInformation,
    ProjectDetails,
    WorkerInformation,
    GetProjectData,
    WorkerRequest,
    MessageTypes,
} from '../entities/worker'
import {ConversationTypes,MessageType,RecentActivityType} from '../entities/commonTypes'
import {Types} from 'mongoose'

export interface IgetWorkerRepository{
    createWorker (workerData:WorkerInformation) : Promise<WorkerInformation | null>
    findWorker(workerEmail:string) : Promise<PersonalInformation | null>
    ischeckEmail(userEmail:string): Promise<string | undefined>
    setNewPassWord(customerId:string,newPass:string) :Promise<void>
    loginVerifyQuery(userEmail:string):Promise<WorkerInformation | null>
    getWorkerData(workerId:string):Promise<WorkerInformation | null>
    insertWorker (customerData:WorkerInformation) : Promise<WorkerInformation | null>
    chagneExitWorkerCategoryName(existName:string,newName:string) :Promise<void>   // * here the worker category will update if Admin change their category
    addWorkerProjectDetails(_id:string,ProjectDetails:ProjectDetails):Promise<void> // * worker add project Details
    getProjectDetailsQuery(_id:string): Promise<GetProjectData | null>
    getSingleWorkerDetailsQuery(_id:string) : Promise<WorkerInformation | null>
    getAllRequestQuery(workerId:string) : Promise<WorkerRequest[]> // fetch request of worker data
    isAcceptWorkQuery(_id:string,isPayment:number):Promise<void>
    isRejectWorkQuery(_id:string) : Promise<void>
    IsActivityQuery(requestId:string,paymentId:string) : Promise<void>
    paymentData (requestId:string,payment:number,paymentId:number) : Promise<void>
    getChatsNameQuery(workerId:string) : Promise<ConversationTypes[]>
    messageQuery(data:MessageTypes) : Promise<MessageTypes>
    updatemessage({_id,lastMessage}:{_id:Types.ObjectId,lastMessage:string}) : Promise<void>
    fetchMessage(conversationId:string):Promise<MessageType[] | null>
    getSingleMsg(message:string):Promise<MessageType |null>
    updateIsReadQuery(conversationId:string) :Promise<void>
    isResendActivityQuery(requestId:string,payment:number,wokerId:string,userId:string):Promise<void>
    countResentWorkQuery(workerId:string) :Promise<any>
    totalOffer(workerId:string): Promise<number | null>
    getRecentActivity(workerId:string) :Promise<any>
    ratingQuery(workerId:string):Promise<any>
    getUpcomingWorks(workerId:string):Promise<RecentActivityType[]>
    workCompleteQuery(_id:string,isCompleted:boolean,status:string):Promise<RecentActivityType | null>
    markCompleteQuery(_id:string,status:string):Promise<void>
    availabilityInfo(data:any) : Promise<void>
}