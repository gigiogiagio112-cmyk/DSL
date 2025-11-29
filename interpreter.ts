import { Account_Types, AccountBlock, JournalBlock, Movement, Program, Transaction } from "./ast"; 
import { AccountMetaData, LedgerMetadata, Posting } from "./ds";


class Interpreter {
   private accountRegistry : Record<string, AccountMetaData> = {};
   private ledger : Record<string, LedgerMetadata> = {};
   private txnCounter = 0

   private process_account_blocks(block: AccountBlock){
      if(block.type !== "AccountBlock"){
        throw new Error(`The required type is: 'AccountBlock', yours is:${console.log(block.type)}`)
      }
      if(block.accounts){
        let name : string = "";
        let type = block.accounts[name] ; 
        const md = {type: type ,isExplicit: true}  as AccountMetaData
        return this.accountRegistry[name] = md 
      }
      else{
        throw new Error("We can're register an account block without accounts")
      }
   }
   
   private process_journal_blok(block: JournalBlock){
        if(block.type !== "JournalBlock"){
           throw new Error(`The required type is: 'JournalBlock', yours is:${console.log(block.type)}`)
        }
        for (const txn of block.txns){
            this.process_transaction(txn)
        }

   }

   private process_transaction(txn: Transaction){
     if (txn.type !== "Transaction"){
        throw new Error(`The required type is: 'Transaction', yours is:${console.log(txn.type)}`)
     }
     this.txnCounter++;
     let ID : string = `TXN-${console.log(this.txnCounter)}`;
     const postings = [] 
     for (const movement of txn.flow){
        postings.push(...this.convert_movement_into_postings(movement, ID, txn.date, txn.name))
     }
     if(postings[0].amount !== postings[1].amount){
             throw new Error(`There's an inbalance between credits and debits in this transaction: ${console.log(ID)},${console.log(txn.name)}`)
     }

   }

   private convert_movement_into_postings(movement: Movement, ID: string, data: string, description: string): Posting[]{
    let postings = new Array<Posting>()
        if(movement.flow == "->"){
             postings =  [
            { 
                account: movement.account1,
                side: "credit",
                amount: movement.amount,
                ID, data, description 
            } as Posting ,
            {
                account: movement.account2,
                side: "debit",
                amount: movement.amount,
                ID,data,description
            } as Posting]
        }
        else if(movement.flow == "<-"){
            postings  = [{ 
                account: movement.account2,
                side: "credit",
                amount: movement.amount,
                ID, data, description 
            } as Posting  ,
            {
                account: movement.account1,
                side: "debit",
                amount: movement.amount,
                ID,data,description
            } as Posting]
        }
        return postings
        
   }

   public Interpret(program: Program){
      for(const block of program.value){

        switch(block.type){

            case "AccountBlock":
                return this.process_account_blocks(block as AccountBlock);
            case "JournalBlock":
                return this.process_journal_blok(block as JournalBlock)
        }
      }
   }
}