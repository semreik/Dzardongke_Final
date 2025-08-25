// Map normalized Dzardzongke headwords to their audio asset.
// Normalization we use in code: lowercase, strip accents, spaces -> underscore.
// Keys here already follow that normalization.

export const dictionaryAudioMap: Record<string, any> = {
  // Family & people
  ajo: require('../../assets/audio/dictionary_words/ájo-older_brother.wav'),
  ama: require('../../assets/audio/dictionary_words/áma-mother.wav'),
  ani: require('../../assets/audio/dictionary_words/áni-sister.wav'),
  awu: require('../../assets/audio/dictionary_words/áwu-father.wav'),
  // Common function words
  ang: require('../../assets/audio/dictionary_words/ang-also_even.wav'),
  dang: require('../../assets/audio/dictionary_words/dang-and-1.wav'),
  dene: require('../../assets/audio/dictionary_words/dene-then-1.wav'),
  di: require('../../assets/audio/dictionary_words/di-this.wav'),
  da: require('../../assets/audio/dictionary_words/da-now-1.wav'),
  danda: require('../../assets/audio/dictionary_words/danda-now.wav'),
  // Numbers / quantifiers
  cik: require('../../assets/audio/dictionary_words/cik-one-1.wav'),
  cunyi: require('../../assets/audio/dictionary_words/cunyí-twelve.wav'),
  // Nouns
  aze: require('../../assets/audio/dictionary_words/aze-fox.wav'),
  bus: require('../../assets/audio/dictionary_words/bus-bus.wav'),
  butsi: require('../../assets/audio/dictionary_words/butsi-mouse.wav'),
  cappal: require('../../assets/audio/dictionary_words/cappal-sandal.wav'),
  choekhang: require('../../assets/audio/dictionary_words/choekhang-prayer_room.wav'),
  chu: require('../../assets/audio/dictionary_words/chu-water.wav'),
  dokur: require('../../assets/audio/dictionary_words/dokur-basket.wav'),
  dongpo: require('../../assets/audio/dictionary_words/dongpo-tree.wav'),
  dre: require('../../assets/audio/dictionary_words/dre-mule.wav'),
  // Verbs
  calai: require('../../assets/audio/dictionary_words/calai-run.wav'),
  dro: require('../../assets/audio/dictionary_words/dro-to_go.wav'),
  // Adjectives/Adverbs
  arong_che: require('../../assets/audio/dictionary_words/arong_che-quite_big.wav'),
  che: require('../../assets/audio/dictionary_words/che-big-1.wav'),
  cunga: require('../../assets/audio/dictionary_words/cunga-little.wav'),
  dranga: require('../../assets/audio/dictionary_words/dranga-cold.wav'),
  dangsang: require('../../assets/audio/dictionary_words/dangsang-fine.wav'),
  bang: require('../../assets/audio/dictionary_words/bang-wet.wav'),
  dering: require('../../assets/audio/dictionary_words/dering-today.wav'),
  // Time
  bela: require('../../assets/audio/dictionary_words/bela-time.wav'),
  dawa: require('../../assets/audio/dictionary_words/dawa-month.wav'),
  // Food & drink
  chang: require('../../assets/audio/dictionary_words/chang-beer.wav'),
  arak: require('../../assets/audio/dictionary_words/arak-liquor.wav'),
  // Kinship / children variants
  bumo: require('../../assets/audio/dictionary_words/bumo-girl_daughter.wav'),
  bisa: require('../../assets/audio/dictionary_words/bisa-son.wav'),
};

export function normalizeDzKey(input: string): string {
  // lower, strip accents, replace spaces with underscore
  const lower = input.toLowerCase();
  const stripped = lower.normalize('NFD').replace(/\p{M}+/gu, '');
  return stripped.replace(/\s+/g, '_');
}

