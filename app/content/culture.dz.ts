import { CultureDeck } from './types';

// Dzardzongke Culture content (declarative). Images must exist under assets/images/Culture/
export const cultureDz: CultureDeck[] = [
	{
		id: 'deck-1',
		title: 'Dzardzongke: Language & Region',
		steps: [
			{ type: 'text', header: 'Part a', text: 'Mustang is one of 77 districts in Nepal, and the most sparsely populated. Like many districts or parts of districts, it was once an autonomous kingdom that was integrated into Nepal during the unification of the country by the Gorkhas in the late 18th century. The Tibetan name for the kingdom founded in the 14th c. is Lo. The district headquarters of Mustang is Jomsom or Dzongsam in the local language called ‘Dzardzongke’. Sam is the Dzardzongke word for “new” and dzong means ‘castle’ so the name of the town of Jomsom means “Newcastle”.' },
			{ type: 'text', text: 'Dzardzongke is a variety of Tibetan spoken in the majority of villages of Baragaon, in South Mustang. The name of the language is derived from the local name for the Muktinath Valley, Dzardzong Yuldruk, which means the “Six Villages including Dzar and Dzong.” Dzardzongke is similar to other Tibetic languages, especially those spoken nearby like Loke in Upper Mustang. But it also has unique words and grammatical features that are not found in any other variety, not even, for example, in Loke or other Tibetic languages spoken in Nepal or in the more widely used varieties like Standard or Lhasa Tibetan.' },
			{ type: 'text', text: 'Dzardzongke is an endangered language, which means that it is at high risk of being lost forever. It is currently still spoken by around 1800 speakers. Some of these live in the Muktinath Valley, but many have moved to bigger cities like Kathmandu, Hong Kong, Paris or New York. Together with Dzardzongke speakers, we have developed this app to help preserve the Dzardzongke language and the cultural heritage of its speakers. With the app, you can learn about local history and festivals like the dachang ‘arrow-beer’ or the yarthung ‘summer’ festival. You can also use the app to learn to speak the language, or, if you already speak it, you can learn how to write it.' },
			{ type: 'image', src: 'culture1.png', caption: 'Part of the Muktinath Valley with Dzar on the left and Dzong on the right — August 2022' },
			{ type: 'quiz-single', question: 'What does the name of the town Jomsom mean?', options: [
				{ label: 'fortress', correct: false },
				{ label: 'new york', correct: false },
				{ label: 'new castle', correct: true },
				{ label: 'summer town', correct: false },
			] },
			{ type: 'text', header: 'Part b', text: 'A short distance north of Jomsom is the Pandak river, an eastern tributary of the Kali Gandaki. This river is an old territorial boundary. To the south of it is the territory of the former kingdom of Thini (also known as Sompo). The area to the north of it was controlled by a settlement called Tshotsholung or “Old Kagbeni”. Old Kagbeni was submerged by a massive landslide at some unknown period and moved to its present location, a short distance to the north as the entrance of the Muktinath Valley.' },
			{ type: 'text', text: 'All this territory, up to the present-day Tibetan border, both north and south of the Pandak River, was conquered by the founder of the kingdom of Lo, Amepal (a mes dpal) in the 14th century. The Pandak River is also a cultural dividing line: villages to the south of it speak Thakali, a Tamangic language in the Tibeto-Burman family. Communities to the north of it speak different varieties of Tibetan or Seke, which is more like Thakali. Currently, Dzardzongke is spoken in the villages of Lubrak, Kagbeni, Khyenga, Chongkor, Dzar, Dzong and Chusang.' },
			{ type: 'image', src: 'culture2.png', caption: 'The northern part of the village of Chusang - August 2022' },
			{ type: 'text', text: 'In some of the villages in the Dzardzongke Valley and beyond, they still celebrate festivals like the Dachang and the Yarthung. Traditionally, the main ceremony was the Demdem Chöpa, which featured dancing, singing, archery and the propitiation of local territorial gods. It is not known when the ceremony used to be celebrated, but the Dachang ceremonies that are held in each of the villages may be the local survivals of this once inter-communal event between multiple villages. In the next lesson, you will learn more about the Dachang and other festivals.' },
			{ type: 'quiz-multi', question: 'What did they do during the ancient Demdem Chöpa ceremony?', options: [
				{ label: 'dancing', correct: true },
				{ label: 'singing', correct: true },
				{ label: 'worship the buddha', correct: false },
				{ label: 'archery', correct: true },
			] },
			{ type: 'text', header: 'Part c', text: 'Traditional festivals in the Dzardzongke valley and its surroundings are at specific times in the year. Although Buddhism and Hinduism are found throughout the area, these festivals originally represented older, so-called “pagan” traditions. In recent times, they have become more mixed with other religious traditions. There are three main “pagan” calendrical ceremonies in the Baragaon area, expressed in the following maxim: pi dachang, yar yartung, gun tshongguk “In the spring there is the Dachang; in summer the Yartung, and in winter the Tshongguk.”' },
			{ type: 'text', text: 'Tshongguk literally means “Bringing home the [profits from] trade”. This is the local name for the New Year ceremony according to the agrarian calendar that precedes the main official Tibeto-Mongol calendar by a month. This is the calendar that is observed in most of the villages. It refers to the rule whereby everyone who goes to India for seasonal trade after the buckwheat harvest in October should return to their respective communities by this date. If they didn’t return on time, they had to pay a fine, because it was important to bring bag the trade earnings to the village.' },
			{ type: 'image', src: 'culture3.png', caption: 'Poster to advertise the annual Yarthung horse riding competition in August 2022' },
			{ type: 'text', text: 'The festivals are, in principle, spaced at four-month intervals. The Yartung “Summer festival,” is an occasion featuring all sorts of sports, especially horsemanship. The Dachang “Arrow-Beer” focusses specifically on archery. All three ceremonies are embedded in a week of feasting, propitiation of local gods, dancing and songs.' },
			{ type: 'quiz-single', question: 'When is the annual horse riding competition?', options: [
				{ label: 'During Tshongguk in Winter', correct: false },
				{ label: 'During Dachang in Spring', correct: false },
				{ label: 'During Yarthung in Summer', correct: true },
			] },
		],
	},
	{
		id: 'deck-2',
		title: 'Dachang festival',
		steps: [
			{ type: 'text', header: 'Part a', text: 'Dachang “arrow beer,” is traditionally celebrated in the fourth month of the year. The local calendars of each of the villages do not coincide, however, so this means that the events are staggered over three months, one village at the time. Moreover, even villages that celebrate the Dachang in the same month do not do so on the same dates. The Dachang of Dzar, for example, finishes on the 13th day of the month, the day before the Khyenga Dachang begins. This is usually in March, April or May (10 April in 2025).' },
			{ type: 'text', text: 'Before the festival starts the village needs to make the necessary preparations. First, the village community buys a yak, which will feed the village for a week during the festivities. Early morning a small herd of seven or eight yaks is brought down to the village. The Khyenga community only need one, but it is impossible to bring a single animal down from the pasturelands - they won’t leave their companions.' },
			{ type: 'image', src: 'culture4.png', caption: 'Yaks to be brought down for the festival - April 2024' },
			{ type: 'quiz-single', question: 'Are the Dachang festivals celebrated at the same time in all villages?', options: [
				{ label: 'YES', correct: false },
				{ label: 'NO', correct: true },
			] },
			{ type: 'text', header: 'Part b', text: 'All villages have a number of officials whose term of office runs for a full year. The most important of these are the genpa “headmen” who are appointed during the Dachang festival.' },
			{ type: 'image', src: 'culture5.png', caption: 'New Khyenga village officials selected during the Dachang festival - April 2025 ' },
			{ type: 'text', text: 'The only lifelong office in the village is that of the village priest, the Lhabon, locally pronounced lhayen, whose main duties are to propitiate local divinities. In the past, almost all villages had a Lhabon, whose main duties were to propitiate local divinities, but now there is only one left in the village of Khyenga. In this village, Lhabon Ngodrup had held the office from the age of fifty until his death in 2002 at the age of eighty-four.' },
			{ type: 'text', text: 'In the meantime, he had trained another young Lhabon, also named Ngodrup, who duly replaced him. But Ngodrup the younger died prematurely after five years, without having had an opportunity to train a successor. In response to entreaties from the village and also from Lama Tshultrim of Lubrak, who has numerous patrons in Khyenga and is greatly respected, Takla agreed to assume the position.' },
			{ type: 'text', text: 'This ancient tradition was therefore at risk of being lost forever, but fortunately, professor Charles Ramble (locally known as Yungdrung Tshewang) had complete video documentation of Lhabon Ngodrup the elder’s performance from 1995. The new Lhabon Takla, who speaks Dzardzongke and Standard Tibetan but is literate only in Nepali, transcribed the narration phonetically and memorised the whole thing in 2007. He has been the Lhabön of Khyenga ever since.' },
			{ type: 'image', src: 'culture6.png', caption: 'Lhabon Takla propitiating local gods on top of the Khyenga temple - April 2025' },
			{ type: 'quiz-single', question: 'Which village in the Dzardzongke area still has a village priest?', options: [
				{ label: 'Kagbeni', correct: false },
				{ label: 'Khyenga', correct: true },
				{ label: 'Dzar', correct: false },
				{ label: 'Dzong', correct: false },
			] },
			{ type: 'text', header: 'Part c', text: 'At 9.30 in the morning of the day of the full moon, Lhabon Takla walks over to the house of one of the village constables to have simple breakfast with a cup of arak. After breakfast, his constables help him to put on his fine clothes of silk and a turban of white cotton. He then performs a small purification ritual on the roof of the stable: he lights a fire of juniper branches, blows out the flames, and fans the smoke into his own face with his hand. ' },
			{ type: 'image', src: 'culture7.png', caption: 'Lhabon Takla prostrates in the temple - April 2025' },
			{ type: 'text', text: 'Accompanied by two of the constables, he then walks to the temple, prostrates three times to the altar – which features images of Guru Rinpoche and his two wives, flanked by two of his wrathful forms to his right and left. He lights a bundle of incense sticks and placed it on the altar, before backing out of the temple and climbing on his white horse. The constables then lead the horse and the Lhabon up the hill towards Muktinath. Along the southern wall of the courtyard of the temple are six big prayer flags. Five of them are in colours corresponding to the five elements. The sixth flag is white and with no xylographic prints. This is the flag of the Lhabön himself.' },
			{ type: 'image', src: 'culture8.png', caption: 'Village men replace the prayer flags at the new stupa - April 2025' },
			{ type: 'text', text: 'Finally, two of the other constables are chosen to consecrate the village shrines. This last group starts at the site at which Lhabon Takla later performs the propitiation ritual, the cluster of stupas jammed between a pair of huge Himalayan poplars. The site is called Jowo Dongpo, the “Lord’s trees”. One of the constables splashes red clay on the appropriate part of the main trees and the shrine, and also on the trees within the shrine enclosure, and the other administers whitewash. As they do so, one of them, loudly recites:' },
			{ type: 'text', text: 'lha darro, Khyenga Yulsa Suna Yeshe darro, mewa daro, parkha darro!' },
			{ type: 'text', text: '“May the gods flourish, may the territorial god of Khyenga, Suna Yeshe, flourish, may the “magic squares” flourish, may the trigrams flourish!”' },
			{ type: 'text', text: 'When they finish their work here, each takes a bucket of red clay and goes to a different location. One to a nearby site to the north of the trees called Khalung, and the other to a stupa located on the steep hill to the south of the village. The latter is the site of a local god called Pholha Debka or Pholha Demba.' },
			{ type: 'image', src: 'culture9.png', caption: 'Lhabon Takla meets one of the women who give him arak - April 2025' },
			{ type: 'text', text: 'Lhabon Takla meanwhile goes up to Muktinath, where he showers under each of the 108 spouts of the sacred temple. The usual procedure is that the women of the village, wearing their beautiful clothes, follow him up and collect branches from all the different varieties of trees growing around Muktinath. They meet him while he is on his way down and honour him with beer and arak. The women are called zhulema, “women with zhules”.' },
			{ type: 'quiz-single', question: 'Where does the Lhabon go on the first day of Dachang?', options: [
				{ label: 'To consecrate the Jowo Dongpo, the “Lord’s trees”', correct: false },
				{ label: 'To the stupa to put up new prayer flags', correct: false },
				{ label: 'To Muktinath to shower', correct: true },
			] },
			{ type: 'text', header: 'Part d', text: 'The two main constables help the Lhabon with the main Dachang ritual at the sacred tree on the Jowo Dongpo site. In this video you can see how they make the tormas (on the right) and the goat (on the left). Later in the ritual the Lhabon ceremonially stabs the clay goat.' },
		],
	},
];


