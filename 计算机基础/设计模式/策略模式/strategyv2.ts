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
  
    constructor(value) {
      this.value = value;
    }
  
    /**
     * Usually, the Context allows replacing a Strategy object at runtime.
     */
    public addStrategy(strategy: Strategy) {
        this.strategys.push(strategy);
    }
  
    /**
     * The Context delegates some work to the Strategy object instead of
     * implementing multiple versions of the algorithm on its own.
     */
    public start(): void {
        // ...
  
        console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
        for(let i=0,len=this.strategys.length; i< len; i++){
           const strategy = this.strategys[i];
          if(strategy.validator(this.value)){
            console.log('error:',strategy.validator());
            return false;
          }
        }
   
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
    validator(): bool;
  }
  
  /**
  * Concrete Strategies implement the algorithm while following the base Strategy
  * interface. The interface makes them interchangeable in the Context.
  */
  class IsNonEmpty implements Strategy {
    private errors:string[];
 
    constructor(errMsg){
      this.errMsg = errMsg;
    }
    
    public validator(value){
        if(this.value === undefined || value === null || value === ''){
          return this.errMsg;
        }
      return
    }
  }

  class IsNonEmpty implements Strategy {
    private errors:string[];
 
    constructor(errMsg){
      this.errMsg = errMsg;
    }
    
    public validator(value){
        if(this.value === undefined || value === null || value === ''){
          return this.errMsg;
        }
      return
    }
  }
  
  /**
  * The client code picks a concrete strategy and passes it to the context. The
  * client should be aware of the differences between strategies in order to make
  * the right choice.
  */
  const name="name"
  const context = new Context(name);
  context.addStrategy(new IsNonEmpty("请输入名字")); 
  // context.addStrategy(new ConcreteStrategyB());
  context.start();