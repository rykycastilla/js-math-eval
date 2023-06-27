import data from './data.json'
import jsMathEval from '../index'

function buildResultMessage( item:string, result:number ): string {
  return ` . ${ item } \n   = ${ result } \n`
}

const startTime: number = Date.now()
const results: string[] = []
for( const item of data ) {
  const result: number = jsMathEval( item )
  const resultMessage: string = buildResultMessage( item, result )
  results.push( resultMessage )
}
const duration: number = Date.now() - startTime
console.log( 'Testing: \n' )
for( const result of results ) { console.log( result ) }
console.log( `\n Time: ${ duration }mls \n` )