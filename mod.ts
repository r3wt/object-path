type Setter = (obj:any,path:string,value:any) => true | false;
type Getter = (obj:any,path:string) => unknown | undefined;
type Parser = (path:string) => string[];
type Configure = (options: any) => ObjectPathConfig;
type ObjectPathConfig = {
    seperator:'.'|','|'/'|RegExp;
    defaultUnsetValue: any;
    autoCreate: true|false;
};
type ObjectPathModule = {
    configure: Configure;
    parse: Parser;
    set: Setter;
    get: Getter;
};

export default function createObjectPathInstance(options?:Partial<ObjectPathConfig>):ObjectPathModule {

    const config:ObjectPathConfig = {
        seperator:'.',
        defaultUnsetValue: undefined,
        autoCreate: false
    };

    const configure:Configure = (options={}) => {
        for(let k in config) {
            if(options.hasOwnProperty(k)){
                config[k as keyof ObjectPathConfig] = options[k as keyof Partial<ObjectPathConfig>] as Pick<ObjectPathConfig,any>;
            }
        }
        return config;
    };

    const parse:Parser = (path) => {
        return path.split(config.seperator);
    };

    const set:Setter = (obj,path,value) => {
        const p = parse(path);
        if(p.length){
            let o = obj;
            for(let i=0;i<p.length-1;i++) {
                if(o!==null&&typeof o==='object'){
                    if(!o.hasOwnProperty(p[i])){
                        if(config.autoCreate){
                            o[p[i]] = {};
                            o = o[p[i]];
                            continue;
                        }else{
                            return false;
                        }
                    }else{
                        o = o[p[i]];
                    }
                }else{
                    return false;
                }
            }
            o[p[p.length-1]] = value;
            return true;
        }
        return false;
    };

    const get:Getter = (obj,path) => {
        const p = parse(path);
        let v = obj;
        for(let i=0;i<p.length;i++) {
            if(v!==null&&typeof v==='object'&&v.hasOwnProperty(p[i])){
                v=v[p[i]];
            }else{
                return config.defaultUnsetValue;
            }
        }
        return v;
    };

    const module:ObjectPathModule = {configure,parse,set,get};

    if(options){
        configure(options);
    }

    return module;
}