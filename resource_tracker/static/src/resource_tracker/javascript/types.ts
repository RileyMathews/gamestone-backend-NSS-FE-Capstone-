export interface ResourceTemplate {
    id: string,
    game_template: string,
    is_public: boolean,
    max_ammount: number,
    min_ammount: number,
    owner: string,
    name: string,
}

export interface Resource {
    id: string,
    owner: string,
    game_instance: string,
    resource_template: ResourceTemplate,
    current_ammount: number,
}

export interface DieFace {
    id: string,
    name: string,
    count: number,
}

export interface Die {
    id: string,
    name: string,
    faces: DieFace[],
}
