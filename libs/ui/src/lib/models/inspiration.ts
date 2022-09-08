export class Inspiration{

    hommes!: InspirationModel[];
    femmes!: InspirationModel[];
    enfants!: InspirationModel[];

}

export class InspirationControl{

    imageUrl!: string;
    imageAlt!: string;
    name!: string;
}

export class InspirationModel{
    imageUrl!: string;
    imageAlt!: string;
}