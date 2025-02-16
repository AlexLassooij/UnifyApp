export interface Paragraph {
    text: string;
}

export type ParagraphList = Paragraph[]

// one / no heading, one paragraph
// could be used for list of paragraphs that each have a subheading
export interface SubheadingAndParagraph {
    subheading?: string;
    text: string;
}

// one / no heading, multiple paragraphs
export interface SubheadingAndParagraphList {
    subheading?: string;
    paragraphs: ParagraphList;
}

// one / no heading, bullet points
export interface SubheadingAndBulletPoints {
    subheading?: string;
    bullets: Paragraph[];
}


export type TextField = Paragraph | SubheadingAndParagraph | SubheadingAndParagraphList | SubheadingAndBulletPoints | ParagraphList;
