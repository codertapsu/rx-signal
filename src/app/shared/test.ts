import { performance } from 'perf_hooks';

type Constructor<T = any> = new (...args: any[]) => T;
// type Constructor<Class, Args extends any[] = any[]> = new (...args: Args) => Class;

const addFuelToRocket = <T extends Constructor<any>>() => {
  return (ctor: T): T => {
    console.log('addFuel');

    return class extends ctor {
      // Also tried using "implements" with my type to help the typechecker, but failed miserably
      constructor(...args: any[]) {
        super(...args);
      }

      fuel = 1000;
    };
  };
};

const addFuel2ToRocket = <T extends Constructor<any>>() => {
  return (ctor: T): T => {
    console.log('addFuel2');

    return class extends ctor {
      // Also tried using "implements" with my type to help the typechecker, but failed miserably
      constructor(...args: any[]) {
        super(...args);
      }

      // fuel = 1000;
    };
  };
};

const propertyDecorator = (target: Object, propertyKey: string) => {
  console.log({ target2: target, propertyKey });
  Object.defineProperty(target, propertyKey, { value: '200000', writable: true });
  // do something with your property
};

const measure = () => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
  console.log('measure');

  // console.log({ target, propertyKey, descriptor });

  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const finish = performance.now();
    console.log(`Execution time: ${finish - start} milliseconds`);
    return result;
  };

  return descriptor;
};

const measure2 = () => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
  console.log('measure2');

  // console.log({ target, propertyKey, descriptor });

  const originalMethod = descriptor.value;

  // descriptor.value = function (...args: any) {
  //   const start = performance.now();
  //   const result = originalMethod.apply(this, args);
  //   const finish = performance.now();
  //   console.log(`Execution time: ${finish - start} milliseconds`);
  //   return result;
  // };

  return descriptor;
};

const changeValue = (value: any) => (target: any, propertyKey: string | symbol) => {
  console.log('changeValue');

  let val = target[propertyKey];

  const getter = () => {
    return val;
  };
  const setter = (next: any) => {
    console.log('updating flavor...');
    val = `🍦 ${next} 🍦`;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
  // Object.defineProperty(target, propertyKey, { value, writable: true, });
};

const allowlistOnly = (allowlist: string[]) => {
  return (target: any, memberName: string) => {
    let currentValue: any = target[memberName];

    Object.defineProperty(target, memberName, {
      set: (newValue: any) => {
        if (!allowlist.includes(newValue)) {
          return;
        }
        currentValue = newValue;
      },
      get: () => currentValue,
    });
  };
};

const print = (target: Object, propertyKey: string, parameterIndex: number) => {
  console.log({ target, propertyKey, parameterIndex });

  // console.log(`Decorating param ${parameterIndex} from ${propertyKey}`);
};

@addFuel2ToRocket()
@addFuelToRocket()
class Rocket {
  // @propertyDecorator
  // label = '100000';

  @changeValue(100)
  test!: number;

  @allowlistOnly(['Claire', 'Oliver'])
  name: string = 'Claire';

  @measure2()
  @measure()
  launch(@print value: number) {
    console.log('Launching in 3... 2... 1... 🚀');
  }
}

const rocket = new Rocket();
rocket.launch(1900);
// console.log((rocket as any).test);
console.log(rocket.name);


// Reactive

const original = { name: 'jeff' };

const reactive = new Proxy(original, {
  get(target: any, key) {
    console.log('Tracking: ', key);
    // return target[key];
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    console.log('updating UI...');
    return Reflect.set(target, key, value);
  },
});

reactive.name; // 'Tracking: name'

reactive.name = 'bob'; // 'updating UI...'
