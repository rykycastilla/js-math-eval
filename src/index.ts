import operate from './operate/index'
import parenthesis from './parenthesis'

export function jsMathEval( expression:string ): number {
  // Erasing spaces
  const cleanExpression: string[] = expression.split( ' ' )
  expression = cleanExpression.join( '' )
  const result:number = parenthesis( expression, operate )
  return result
}

export default jsMathEval