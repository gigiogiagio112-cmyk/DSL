export enum TokenType {
    Number,
    Date,
    Identifier,
    String,
    OpenBrace,
    CloseBrace,
    ACCOUNTS,
    JOURNAL,
    Transaction,
    Opening,
    Closing,
    REPORT,
    BinaryOp,
    Flow_Movement,
    Colon
}

export interface Token {
    type: TokenType,
    value: string
}

const KEYWORDS : Record<string,TokenType> = {
    "ACCOUNTS": TokenType.ACCOUNTS,
    "JOURNAL": TokenType.JOURNAL,
    "TXN": TokenType.Transaction,
    "OPEN": TokenType.Opening,
    "CLOSE": TokenType.Closing,
    "REPORT": TokenType.REPORT
}

function isAlpha(src: string):boolean{
    return src.toUpperCase() !== src.toLowerCase()  
}

function isNum(src: string){
    const c = src.charCodeAt(0)
    const bound = ["0".charCodeAt(0),"9".charCodeAt(0)]
    return [c >= bound[0] && c <= bound[1]]
}

function isSkippable(src:string){
    return src == " " || src == "\r" || src == "\n" 
}

function makeToken(type: TokenType,value: string ): Token{
   return {type, value}
}

export function tokenizer(src: string): Token[]{
    const code = src.split('')
    const tokens : Token[] = [];
    while(code.length > 0 ){
    if(code[0] == ":"){
     tokens.push( makeToken(TokenType.Colon, code.shift()! ))
    }
    else if (code[0] == "-" && code[1] == ">" || code[0] == "<" && code[1] == "-" ){
        tokens.push(makeToken(TokenType.Flow_Movement, code.shift()!))
    }
    else if(code[0] == "{"){
        tokens.push(makeToken(TokenType.OpenBrace, code.shift()!))
    }
    else if(code[0] == "}"){
        tokens.push(makeToken(TokenType.CloseBrace, code.shift()!))
    }
    
    else {
        if(isNum(code[0])){
          let num = " "
          let date = " "
          while (code.length > 0 && isNum(code[0])!){
            num += code.shift()!
            if(code[0] == "-"){
                 date = num
            }
            else if(code[0] == ","){
                num += code.shift()!
                
            }

          }
          if (date == num){
            tokens.push(makeToken(TokenType.Date, code.shift()!))
          }
          else {
            tokens.push(makeToken(TokenType.Number, code.shift()!))
          }
        }
        else if (isAlpha(code[0])){
          let ident = " ";
          while (code.length > 0 && isAlpha(code[0])!){
            ident += code.shift();
          }
          const key = KEYWORDS[ident];
          if ( key == undefined){
            tokens.push(makeToken(TokenType.Identifier, code.shift()!))
          }
          else {
            tokens.push(makeToken(key, code.shift()!))
          }
        }
        else if (isSkippable(code[0])){
            code.shift()!
        }
    }
}
 return tokens

}
        
