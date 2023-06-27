export type OrderItem = number | string

type Order = OrderItem[]

export class OrderNumber {
  public data = ''
  private isBasicOperator( char:string ): boolean {
    const list: string[] = [ '+', '-' ]
    return list.includes( char )
  }
  public addToOrder( order:Order ) {
    if( this.data ) {
      const lastItemIndex: number = order.length - 1
      let lastItem: OrderItem = order[ lastItemIndex ]
      const beforeLastItem: OrderItem = order[ lastItemIndex - 1 ],
        isBasicOperator: boolean = this.isBasicOperator( lastItem as string ),
        isNumber: boolean = typeof beforeLastItem === 'number'
      if( isBasicOperator && !isNumber ) {
        lastItem = Number( lastItem + this.data )
        order[ lastItemIndex ] = lastItem
      }
      else {
        const data = Number( this.data )
        order.push( data )
      }
      this.data = ''
    }
  }
  static isOperator( char:string ): boolean {
    const list: string[] = [ '+', '-', '*', '/', '^' ]
    return list.includes( char )
  }
}

export default Order