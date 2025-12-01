import { Account_Types } from "./ast";

export interface AccountMetaData {
    type: Account_Types,
    isExplicit: boolean
}


export interface Posting {
    account: string,
    side: "debit" | "credit",
    amount: number, 
    date: string,
    ID: string,
    description: string

}