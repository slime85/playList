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
const dt = ['ㄳ', 'ㄵ', 'ㄶ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅄ'];

let prevWord; // consonant = 자음, vowel = 모음, double = 겹받침
let prevWordCode;
let prevText;
let prevInput;
let keyPushed = {ctrl: false};

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

const getConstantVowel = kor =>  {
  const ga = 44032;
  const uni = kor.charCodeAt(0) - ga;

  const fn = parseInt(uni / 588);
  const sn = parseInt((uni - (fn * 588)) / 28);
  const tn = parseInt(uni % 28);

  return {f: f[fn], s: s[sn], t: t[tn]};
}

const consonantCombination = (a, b = "") => {
  if(b !== "") {
    if(a === "ㄱ") {
      if(b === "ㅅ") a = "ㄳ";
    }else if(a === "ㄴ") {
      if(b === "ㅈ") a = "ㄵ";
      else if(b === "ㅎ") a = "ㄶ";
    }else if(a === "ㄹ") {
      if(b === "ㄱ") a = "ㄺ";
      else if(b === "ㅁ") a = "ㄻ";
      else if(b === "ㅂ") a = "ㄼ";
      else if(b === "ㅅ") a = "ㄽ";
      else if(b === "ㅌ") a = "ㄾ";
      else if(b === "ㅍ") a = "ㄿ";
      else if(b === "ㅎ") a = "ㅀ";
    }else if(a === "ㅂ") {
      if(b === "ㅅ") a = "ㅄ"
    }else if(a === "") {
      a = b;
    }
  }
  return a;
}

const vowelCombination = (a, b = "") => {
  if(b !== "") {
    if(a === "ㅗ") {
      if(b === "ㅏ") a = "ㅘ";
      else if(b === "ㅐ") a = "ㅙ";
      else if(b === "ㅣ") a = "ㅚ";
    }else if(a === "ㅜ") {
      if(b === "ㅓ") a = "ㅝ";
      else if(b === "ㅔ") a = "ㅞ";
      else if(b === "ㅣ") a = "ㅟ";
    }else if(a === "ㅡ") {
      if(b === "ㅣ") a = "ㅢ";
    }
  }
  return a;
}

const getConsonant = key => {
  let result = {};

  if(key === 'ㄳ') result = {val: "ㄱ", f: "ㅅ"};
  else if(key === 'ㄵ') result = {val: "ㄴ", f: "ㅈ"};
  else if(key === 'ㄶ') result = {val: "ㄴ", f: "ㅎ"};
  else if(key === 'ㄺ') result = {val: "ㄹ", f: "ㄱ"};
  else if(key === 'ㄻ') result = {val: "ㄹ", f: "ㅁ"};
  else if(key === 'ㄼ') result = {val: "ㄹ", f: "ㅂ"};
  else if(key === 'ㄽ') result = {val: "ㄹ", f: "ㅅ"};
  else if(key === 'ㄾ') result = {val: "ㄹ", f: "ㅌ"};
  else if(key === 'ㄿ') result = {val: "ㄹ", f: "ㅍ"};
  else if(key === 'ㅀ') result = {val: "ㄹ", f: "ㅎ"};
  else if(key === 'ㅄ') result = {val: "ㅂ", f: "ㅅ"};
  else result.val = key;

  return result;
}

const enToKo = e => {
  const target = e.target;
  const key = e.key;
  let value = target.value;
  let last = value.slice(-1, value.length);
  if(key.match(/^[a-z]$/i) && !keyPushed.ctrl) {
    e.preventDefault();
    const koKey = koreanKey(e)
    if(value === "" || last.match(/[^ㄱ-힣]/) || prevInput !== e.target || prevText !== last) {
      prevText = koKey;
      value = value + prevText;
    }else {
      let spe = getConstantVowel(last);
      if(koKey.match(/[ㄱ-ㅎ]/)) {
        if(last.match(/[ㄱ-ㅎ]/)) {
          let preT = last;
          last = consonantCombination(last, koKey);
          if(preT === last) {
            prevText = koKey;
            value = value + prevText;
          }else {
            prevText = last;
            value = value.slice(0, value.length - 1) + prevText;
          }
        }else {
          if(spe.f === undefined) {
            prevText = koKey;
            value = value + prevText;
          }else if(spe.t !== "") {
            let preT = spe.t;
            spe.t = consonantCombination(spe.t, koKey);
            if(preT === spe.t) {
              prevText = koKey;
              value = value + prevText;
            }else {
              prevText = combinationKorean(spe.f, spe.s, spe.t);
              value = value.slice(0, value.length - 1) + prevText;
            }
          }else {
            prevText = combinationKorean(spe.f, spe.s, koKey);
            value = value.slice(0, value.length - 1) + prevText;
          }
        }
      }else {
        if(last.match(/[ㅏ-ㅣ]/)) {
          let preS = last;
          last = vowelCombination(last, koKey);
          if(preS === last) {
            prevText = koKey;
            value = value + prevText;
          }else {
            prevText = last;
            value = value.slice(0, value.length - 1) + prevText;
          }
        }else {
          console.log("test");
          if(spe.f === undefined) {
            if(dt.indexOf(last) !== -1) {
              prevText = combinationKorean(con.f, koKey);
              value = value.slice(0, value.length - 1) + con.val + prevText;
            }else if(last.match(/[ㄱ-ㅎ]/)) {
              prevText = combinationKorean(last, koKey);
              value = value.slice(0, value.length - 1) + prevText;
            }else {
              prevText = koKey;
              value = value + prevText;
            }
          }else if(spe.t === ""){
            let preS = spe.s;
            spe.s = vowelCombination(spe.s, koKey);
            if(preS === spe.s) {
              prevText = koKey;
              value = value + prevText;
            }else {
              prevText = combinationKorean(spe.f, spe.s);
              value = value.slice(0, value.length - 1) + prevText;
            }
          }else {
            const con = getConsonant(spe.t);

            if(spe.t === con.val) {
              prevText = combinationKorean(con.val, koKey);
              value = value.slice(0, value.length - 1) + combinationKorean(spe.f, spe.s) + prevText;
            }else {
              prevText = combinationKorean(con.f, koKey);
              value = value.slice(0, value.length - 1) + combinationKorean(spe.f, spe.s, con.val) + prevText;
            }
          }
        }
      }
    }
  }else if(key === "Backspace"){
    if(last === prevText && key.match(/^[a-z]$/i) && !keyPushed.ctrl) {
      e.preventDefault();
      if(last.match(/[ㄱ-ㅎ]/)) {
        if(dt.indexOf(last) !== -1) {

        }else {
          prevText = key;
          value = value.slice(0, value.length - 1);
        }
      }
    }else {
      prevText = key;
    }
  }else {
    prevText = key;
  }
  prevInput = e.target;

  return value;
}

document.addEventListener("keydown", e => {
  if(e.key === "Control") {
    keyPushed.ctrl = true;
  }
})

document.addEventListener("keyup", e => {
  if(e.key === "Control") {
    keyPushed.ctrl = false;
  }
})