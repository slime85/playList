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
const ds = ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ'];
const dt = ['ㄳ', 'ㄵ', 'ㄶ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅄ'];

let prevText;
let prevInput;
let korean = false;

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

const getVowel = key => {
  let result = {};

  if(key === 'ㅘ') result = {val: "ㅗ", s: "ㅏ"};
  else if(key === 'ㅙ') result = {val: "ㅗ", s: "ㅐ"};
  else if(key === 'ㅚ') result = {val: "ㅗ", s: "ㅣ"};
  else if(key === 'ㅝ') result = {val: "ㅜ", s: "ㅓ"};
  else if(key === 'ㅞ') result = {val: "ㅜ", s: "ㅔ"};
  else if(key === 'ㅟ') result = {val: "ㅜ", s: "ㅣ"};
  else if(key === 'ㅢ') result = {val: "ㅡ", s: "ㅣ"};
  else result.val = key;

  return result;
}

const enToKo = e => {
  const target = e.target;
  const key = e.key;
  let value = target.value;
  let last = value.slice(-1, value.length);

  if(key.match(/^[a-z]$/i) && !e.ctrlKey) {
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
          if(spe.f === undefined) {
            if(dt.indexOf(last) !== -1) {
              const con = getConsonant(last);

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
    if(last === prevText && !e.ctrlKey) {
      e.preventDefault();
      if(last.match(/[ㄱ-ㅎ]/)) {
        if(dt.indexOf(last) !== -1) {
          const con = getConsonant(last);
          prevText = con.val
          value = value.slice(0, value.length - 1) + prevText;
        }else {
          prevText = key;
          value = value.slice(0, value.length - 1);
        }
      }else if(last.match(/[ㅏ-ㅣ]/)) {
        if(ds.indexOf(last) !== -1) {
          const con = getVowel(last );
          prevText = con.val;
          value = value.slice(0, value.length - 1) + prevText;
        }else {
          prevText = key;
          value = value.slice(0, value.length - 1);
        }
      }else {
        let spe = getConstantVowel(last);

        if(spe.t === "") {
          if(ds.indexOf(spe.s) !== -1) {
            const con = getVowel(spe.s);
            prevText = combinationKorean(spe.f, con.val);
            value = value.slice(0, value.length - 1) + prevText;
          }else {
            prevText = spe.f;
            value = value.slice(0, value.length - 1) + prevText;
          }
        }else {
          if(dt.indexOf(spe.t) !== -1) {
            const con = getConsonant(spe.t);
            prevText = combinationKorean(spe.f, spe.s, con.val);
            value = value.slice(0, value.length - 1) + prevText;
          }else {
            prevText = combinationKorean(spe.f, spe.s);
            value = value.slice(0, value.length - 1) + prevText;
          }
        }
      }
    }else {
      prevText = key;
    }
  }else {
    if(key !== "Control" && key !== "Shift") prevText = key;
  }
  prevInput = e.target;

  return value;
}

document.addEventListener("keydown", e => {
  if(e.ctrlKey && e.key === "Alt") {
    if(korean) korean = false;
    else korean = true;
  }
})