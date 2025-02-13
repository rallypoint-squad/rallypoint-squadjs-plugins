
export interface OptionSpec {
    required: boolean;
    description: string;
    connector?: string;
    default?: any;
    example?: any;
}

export type OptionsSpec = Record<string, OptionSpec>;

export interface PluginClass {

    description: string;
    
    defaultEnabled: boolean;
    
    optionsSpecification: OptionsSpec;

}