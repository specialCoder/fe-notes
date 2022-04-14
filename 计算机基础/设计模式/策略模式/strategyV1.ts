/** 批量执行多个规则版本 */

/**
 * The Context defines the interface of interest to clients.
 */
 class Context {
  /**
   * @type {Strategy} The Context maintains a reference to one of the Strategy
   * objects. The Context does not know the concrete class of a strategy. It
   * should work with all strategies via the Strategy interface.
   */
  private strategys: Strategy[] = [];
  private value:string[];

  constructor(value:string[]) {
    this.value = value;
  }

  /**
   * Usually, the Context allows replacing a Strategy object at runtime.
   */
  public setStrategy(strategy: Strategy) {
      this.strategys.push(strategy);
  }

  /**
   * The Context delegates some work to the Strategy object instead of
   * implementing multiple versions of the algorithm on its own.
   */
  public doSomeBusinessLogic(): void {
      // ...

      console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
      const result = this.strategys.map((strategy:Strategy) =>                      strategy.doAlgorithm(this.value).join(','));
      console.log(result);

      // ...
  }
}

/**
* The Strategy interface declares operations common to all supported versions
* of some algorithm.
*
* The Context uses this interface to call the algorithm defined by Concrete
* Strategies.
*/
interface Strategy {
  doAlgorithm(data: string[]): string[];
}

/**
* Concrete Strategies implement the algorithm while following the base Strategy
* interface. The interface makes them interchangeable in the Context.
*/
class ConcreteStrategyA implements Strategy {
  public doAlgorithm(data: string[]): string[] {
      return data.sort();
  }
}

class ConcreteStrategyB implements Strategy {
  public doAlgorithm(data: string[]): string[] {
      return data.reverse();
  }
}

/**
* The client code picks a concrete strategy and passes it to the context. The
* client should be aware of the differences between strategies in order to make
* the right choice.
*/
const context = new Context(['a', 'b', 'c', 'd', 'e']);
context.setStrategy(new ConcreteStrategyA());
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();