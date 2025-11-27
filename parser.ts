import { AccountBlock, OpeningBlock, Program, Stat } from "./ast";
import { Token, tokenizer, TokenType } from "./lexing";

export default class Parser {
    private tokens: Token[] = [];

    private position : number = 0

    private peek(){
       return this.tokens[this.position]
    }

    private advance(){
        const prev = this.tokens[this.position];
        this.position++
        return prev
    }

    private expect(token: TokenType, message: string):boolean{
        if(this.peek().type !== token){
            console.log(message)
            return false
        }
        else return true
    }
  
    private match(token: TokenType):boolean{
        return this.peek().type === token
    }

    private is_eof(){
        return this.peek().type === TokenType.EOF
    }

    public ProduceAst(source_code: string): Program{
       this.tokens = tokenizer(source_code);
       return this.parse_program(this.tokens)
    }

    private parseAccountBlock(): AccountBlock{

    }

    private parseOpeningBlock() : OpeningBlock{

    } 

    private parseJournalBlock(): JournalBlock{

    }
    private parseTransaction(): Transaction{

    }
    
    private parse_program(tokens: Token[]): Program{
        this.tokens = tokens;
        this.position = 0;
        const body : Stat[] = [];
        while(!this.is_eof()){
            if (this.match(TokenType.ACCOUNTS)){
                const AccountBlock = this.parseAccountBlock();
                body.push(AccountBlock)
            }
            if(this.match(TokenType.Opening)){
                const OpeningBlock = this.parseOpeningBlock();
                body.push(OpeningBlock)
            }
            if(this.match(TokenType.JOURNAL)){
                const JournalBlock = this.parseJournalBlock();
                body.push(JournalBlock)
            }
            if(this.match(TokenType.Transaction)){
                const Transaction = this.parseTransaction();
                body.push(Transaction)
            }

        }
        return {type: "program",value: body} as Program

    }
}