import Order, { OrderItem, OrderNumber } from './Order'

type Operation = ( a:number, b:number, operator?:string ) => number

function buildPriority( operation:string ): Order {
  operation = operation.split( '**' ).join( '^' )
  const order: Order = []
  const number = new OrderNumber()
  for( let _this = 0; _this < operation.length; _this++ ) {
    const char: string = operation[ _this ]
    const isOperator: boolean = OrderNumber.isOperator( char )
    if( isOperator ) {
      number.addToOrder( order )
      order.push( char )
    }
    else { number.data += char }
    if( ( operation.length - 1 ) === _this ) { number.addToOrder( order ) }
  }
  return order
}

function operateByOrder( order:Order, operators:string[], operation:Operation ) {
  for( let _this = 0; _this < order.length; _this++ ) {
    const item: OrderItem = order[ _this ],
      invalidOp: boolean = operators.includes( item as string )
    if( !invalidOp ) { continue }
    const previous: number = _this - 1,
      next: number = _this + 1,
      a: number = order[ previous ] as number,
      b: number = order[ next ] as number
    order[ _this ] = operation( a, b, item as string )
    order.splice( next, 1 )
    order.splice( previous, 1 )
    _this--
  }
}

function pow( order:Order ) {
  operateByOrder( order, [ '^' ], ( a:number, b:number ): number => Math.pow( a, b )  )
}

function multiplyDivide( order:Order ) {
  operateByOrder( order, [ '*', '/' ], ( a:number, b:number, operator:string ): number => {
    let result: number
    switch( operator ) {
    case '*':
      result = a * b
      break
    case '/':
      result = a / b
      break
    }
    return result
  } )
}

function sumRest( order:Order ) {
  operateByOrder( order, [ '+', '-' ], ( a:number, b:number, operator:string ): number => {
    let result: number
    switch( operator ) {
    case '+':
      result = a + b
      break
    case '-':
      result = a - b
      break
    }
    return result
  } )
}

function operate( operation:string ): number {
  const order: Order = buildPriority( operation )
  pow( order )
  multiplyDivide( order )
  sumRest( order )
  const result = Number( order.join( '' ) )
  return result
}

export default operate

// potenciacion por orden
// multiplicacion y division por orden
// suma todo los numeros