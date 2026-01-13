// 変数の初期化
let untyped = '';
let typed = '';
let score = 0

// HTML要素を取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typedcount = document.getElementById('typedcount');

// ランダムなテキストの配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムでテキスト生成
const createText = () => {

 typed = '';
 typedfield.textContent = typed;

 let random = Math.floor(Math.random() * textLists.length);
 untyped = textLists[random];
 untypedfield.textContent = untyped;
};

// 入力されたキーの正誤判定
const keyPress = e => {

 // 間違ってたら背景赤にして処理終了
 if (e.key !== untyped.substring(0, 1)) {
  wrap.classList.add('mistyped');
  // 100ms秒後に背景色を元に戻す
  setTimeout(() => {
   wrap.classList.remove('mistyped');
  }, 100);
  return;
 }

 // そうでなければ（合っていれば）1文字送って次の文字を取得
  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  typedcount.textContent = score;

 if(untyped === '') {
  createText();
 }
};

// ランク判定
const rankCheck = score => {

  let text = '';

  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
} else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
} else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
} else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます！`;
}

return `${score}文字打てました！\n${text}\n【OK】リトライ【キャンセル】終了`;
};

// ゲーム終了
const gameOver = id => {
 clearInterval(id);
 const result = confirm(rankCheck(score));
  if (result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
 
 // タイマー部分のHTML要素を取得する
 let time = count.textContent;
 
 const id = setInterval(() => {
  // カウントダウン
  time--;
  count.textContent = time;
  // カウントが0になったらタイマー停止
  if(time <= 0) {
   gameOver(id);
  }
 }, 1000);

};

// キーボードのイベント処理
start.addEventListener('click', () => {
 timer();
 createText();
 start.style.display = 'none';
 document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';