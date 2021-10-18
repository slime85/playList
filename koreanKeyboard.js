const keyList = {
  a : "ㅁ",
  b : "ㅠ",
  c : "ㅊ",
  d : "ㅇ",
  e : {down: "ㄷ", up: "ㄸ"},
  f : "ㄹ",
  g : "ㅎ",
  h : "ㅗ",
  i : "ㅑ",
  j : "ㅓ",
  k : "ㅏ",
  l : "ㅣ",
  m : "ㅡ",
  n : "ㅜ",
  o : {down: "ㅐ", up: "ㅒ"},
  p : {down: "ㅔ", up: "ㅖ"},
  q : {down: "ㅂ", up: "ㅃ"},
  r : {down: "ㄱ", up: "ㄲ"},
  s : "ㄴ",
  t : {down: "ㅅ", up: "ㅆ"},
  u : "ㅕ",
  v : "ㅍ",
  w : {down: "ㅈ", up: "ㅉ"},
  x : "ㅌ",
  y : "ㅛ",
  z : "ㅋ",
}

const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ','ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ','ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ','ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ','ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ','ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ','ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ','ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const dt = ['ㄴ','ㄹ','ㅂ'];

let prevWord; // consonant = 자음, vowel = 모음, double = 겹받침
let prevWordCode;

const koreanKey = e => {
  const key = e.key;
  const lowKey = key.toLowerCase();
  let koreanKey;

  if(lowKey.match(/^[a-z]$/)) {
    koreanKey = keyList[lowKey];
  
    if(typeof(koreanKey) === "object") {
      if(e.getModifierState("CapsLock") && key.match(/^[A-Z]$/)) {
        koreanKey = koreanKey.down;
      }else if(!e.getModifierState("CapsLock") && key.match(/^[a-z]$/)) {
        koreanKey = koreanKey.down;
      }else {
        koreanKey = koreanKey.up;
      }
    }
  }

  return koreanKey;
}

const combinationKorean = (fk, sk = "", tk = "") => {
  const fn = f.indexOf(fk);
  const sn = s.indexOf(sk);
  const tn = t.indexOf(tk);

  if(sn < 0) {
    return fk;
  }else {
    return String.fromCharCode(44032 + (21 * 28 * fn) + (28 * sn) + tn);
  }
}