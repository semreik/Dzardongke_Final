export type CultureTextStep = {
	 type: 'text';
	 header?: string;
	 text: string;
};

export type CultureImageStep = {
	 type: 'image';
	 header?: string;
	 src: string; // filename under assets/images/Culture/
	 caption: string;
};

export type CultureQuizOption = { label: string; correct: boolean };

export type CultureQuizSingleStep = {
	 type: 'quiz-single';
	 header?: string;
	 question: string;
	 options: CultureQuizOption[];
};

export type CultureQuizMultiStep = {
	 type: 'quiz-multi';
	 header?: string;
	 question: string;
	 options: CultureQuizOption[];
};

export type CultureStep =
	| CultureTextStep
	| CultureImageStep
	| CultureQuizSingleStep
	| CultureQuizMultiStep;

export type CultureDeck = {
	 id: string;
	 title: string;
	 steps: CultureStep[];
};


