import { GridKernel } from './GridKernel';
import { Rect } from '../geom/Rect';

//This keeps WebStorm quiet, for some reason it is complaining...
declare var Reflect:any;


/**
 * Do not use directly.
 */
export interface ClassDef<T>
{
}

/**
 * Function definition for a cell renderer function.
 */
export interface Renderer
{
    (gfx:CanvasRenderingContext2D, visual:any):void;
}


/**
 * A decorator that marks a method as a _command_; an externally callable logic block that performs some task.  A name
 * for the command can be optionally specified, otherwise the name of the method being exported as the command will be
 * used.
 * @param name The optional command name
 * @returns decorator
 */
export function command(name?:string):MethodDecorator
{
    return function(ctor:Object, key:string, descriptor:TypedPropertyDescriptor<Function>):void
    {
        const mdk = 'grid:commands';

        let list = Reflect.getMetadata(mdk, ctor);
        if (!list)
        {
            Reflect.defineMetadata(mdk, (list = []), ctor);
        }

        list.push({
            name: name || key,
            key: key,
            impl: descriptor.value,
        });
    };
}


/**
 * A decorator that defines the render function for a GridCell implementation, allowing custom cell types
 * to control their drawing behavior.
 *
 * @param func
 * A decorator that marks a method
 */
export function renderer(func:Renderer):ClassDecorator
{
    return function(ctor:any):void
    {
        Reflect.defineMetadata('custom:renderer', func, ctor);
    };
}


/**
 * A decorator that marks a method as a _routine_; a logic block that can be hooked into or overridden by other
 * modules.  A name for the routine can be optionally specified, otherwise the name of the method being exported
 * as the routine will be used.
 * @param name The optional routine name
 * @returns decorator
 */
export function routine(name?:string):MethodDecorator
{
    return function(ctor:Object, key:string, descriptor:TypedPropertyDescriptor<Function>):any
    {
        let routine = descriptor.value;
        let wrapper = function ()
        {
            let kernel = (this['__kernel'] || this['kernel']) as GridKernel;
            return kernel.routines.signal(key, Array.prototype.slice.call(arguments, 0), routine.bind(this));
        };

        return { value: wrapper };
    };
}

/**
 * A decorator that marks a field as a _variable_; a readable and optionally writable value that can be consumed by
 * modules.  A name for the variable can be optionally specified, otherwise the name of the field being exported
 * as the variable will be used.
 * @param name The optional variable name
 * @returns decorator
 */
export function variable(name?:string, mutable:boolean = true):PropertyDecorator
{
    return function(ctor:Object, key:string):void
    {
        const mdk = 'grid:variables';

        let list = Reflect.getMetadata(mdk, ctor);
        if (!list)
        {
            Reflect.defineMetadata(mdk, (list = []), ctor);
        }

        list.push({
            name: name || key,
            key: key,
            mutable: mutable,
        });

        //let valStoreKey = !!name ? key : `__${key}`;
        //let useAltValueStore = !name;
        //
        //Object.defineProperty(ctor, name || key, {
        //    configurable: false,
        //    enumerable: true,
        //    get: function() { return this[valStoreKey]; },
        //    set: function(newVal) { this[valStoreKey] = newVal; }
        //});
    };
}

/**
 * A decorator for use within implementations of GridCell that marks a field as one that affects the visual
 * appearance of the cell.  This will cause the value of the field to be mapped to the _Visual_ object
 * created before the cell is drawn.
 *
 * @returns decorator
 */
export function visualize():PropertyDecorator
{
    return function(ctor:Object, key:string):void
    {
        const mdk = 'grid:visualize';

        let list = Reflect.getMetadata(mdk, ctor);
        if (!list)
        {
            Reflect.defineMetadata(mdk, (list = []), ctor);
        }

        list.push(key);
    };
}