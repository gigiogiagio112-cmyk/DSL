import { Account_Types } from "./ast";

export interface AccountMetaData {
    type: Account_Types,
    isExplicit: boolean
}

export interface LedgerMetadata {
    data: string,
    description: string,
    side: "debit" | "credit",
    amount: number
}
export interface Posting {
    account: string,
    side: "debit" | "credit",
    amount: number, 
    data: string,
    ID: string,
    description: string

}