import { assert, assertEquals, assertThrows } from "https://deno.land/std/testing/asserts.ts";

import create from './mod.ts';

Deno.test('ensures correct behavior of configure() function',():void=>{
    const { configure, parse, set, get } = create();
    const options = {
        seperator:'/',
        defaultUnsetValue: null,
        autoCreate: true
    };
    let result = configure(options);
    assert(result.seperator===options.seperator);
    assert(result.defaultUnsetValue===options.defaultUnsetValue);
    assert(result.autoCreate===options.autoCreate);
});

Deno.test('ensures correct behavior of parse() function',():void=>{
    const { configure, parse, set, get } = create();
    let result:string[] = parse('test.test.test');
    assert(Array.isArray(result)===true);
    assertEquals(result.length,3);
    assertEquals(result.filter((a:string)=>a!=='test').length,0);
});

Deno.test('ensures correct behavior of get() function',():void=>{
    const { configure, parse, set, get } = create();
    const o:any = {
        foo:'test',
        bar: {
            test: 1,
        }
    };
    assertEquals(get(o,'foo'),'test');
    assertEquals(get(o,'bar.test'),1);
    assertEquals(get(o,'nonExistantProperty.Nested.Foo.SomeValue'),undefined);
});

Deno.test('ensures correct behavior of set() function',():void=>{
    const { configure, parse, set, get } = create();
    const o:any = {
        foo:'test',
        bar: {
            test: 1,
        }
    };
    set(o,'foo','test-1');
    assertEquals(get(o,'foo'),'test-1');
    set(o,'nonExistantProperty.Nested.Foo.SomeValue','test-2');
    assertEquals(get(o,'nonExistantProperty.Nested.Foo.SomeValue'),undefined);
});