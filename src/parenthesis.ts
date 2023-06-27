function getParenthesisList( expression:string ): string[] {
  const result: string[] = []
  let thisItem = -1
  let scope = 0
  for( const char of expression ) {
    if( char === '(' ) {
      if( --scope === -1 ) {
        thisItem++
        result[ thisItem ] = ''
        continue
      }
    }
    if( char === ')' ) {
      scope++
    }
    if( scope < 0 ) { result[ thisItem ] += char }
  }
  return result
}

type Operation = ( x:string ) => number

function parenthesis( expression:string, operation:Operation ): number {
  const parenthesisList: string[] = getParenthesisList( expression )
  for( const parenthesisExpression of parenthesisList ) {
    const result = String( parenthesis( parenthesisExpression, operation ) )
    expression = expression.split( `(${ parenthesisExpression })` ).join( result )
  }
  const operationResult: number = operation( expression ) 
  return operationResult
}

export default parenthesis