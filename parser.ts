import { Program } from "./ast";
import { Token, tokenizer, TokenType } from "./lexing";

export default class Parser {
    private tokens: Token[] = [];

    private position : number = 0

    private peek(){
       return this.tokens[this.position]
    }

    private advance(){
         const prev = this.tokens.shift() as Token
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
        if(this.peek().type !== token){
            return false
        }
        else return true
    }

    private is_eof(){
        if (this.peek().type === TokenType.EOF){
            return true
        }
        
        else return false

    }

    public ProduceAst(source_code: string): Program{
       const code = tokenizer(source_code);
       return this.parse_program(code)
    }
    
    private parse_program(tokens: Token[]): Program{

    }
}