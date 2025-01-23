let cards = []; // カードデータを保持する配列
let currentIndex = 0; // 現在のカードのインデックス
let isFront = true; // 表側が表示されているかどうか

const frontElement = document.getElementById("front");
const backElement = document.getElementById("back");

function updateCard() {
    if (cards.length === 0) {
        frontElement.textContent = "カードがありません";
        backElement.textContent = "";
        return;
    }
    const currentCard = cards[currentIndex];
    if (isFront) {
        frontElement.textContent = currentCard.chinese;
        backElement.textContent = ""; // 表側だけ表示
    } else {
        backElement.innerHTML = `
            <p><b>拼音:</b> ${currentCard.pinyin}</p>
            <p><b>和訳:</b> ${currentCard.translation}</p>
            <p><b>例文:</b> ${currentCard.example}</p>
            <p><b>例文 拼音:</b> ${currentCard.examplePinyin}</p>
            <p><b>例文 和訳:</b> ${currentCard.exampleTranslation}</p>
        `;
    }
}

function loadCsvFile(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const text = event.target.result;
        const lines = text.split("\n");
        cards = lines.map(line => {
            const [chinese, pinyin, translation, example, examplePinyin, exampleTranslation] = line.split(",");
            return { 
                chinese: chinese.trim(), 
                pinyin: pinyin.trim(), 
                translation: translation.trim(), 
                example: example.trim(),
                examplePinyin: examplePinyin.trim(),
                exampleTranslation: exampleTranslation.trim()
            };
        }).filter(card => card.chinese && card.pinyin && card.translation && card.example && card.examplePinyin && card.exampleTranslation);
        currentIndex = 0; // 初期化
        isFront = true;
        updateCard();
    };
    reader.readAsText(file);
}

document.getElementById("loadCsv").addEventListener("click", () => {
    const fileInput = document.getElementById("csvFile");
    const file = fileInput.files[0];
    if (file) {
        loadCsvFile(file);
    } else {
        alert("CSVファイルを選択してください");
    }
});

document.getElementById("flip").addEventListener("click", () => {
    isFront = !isFront;
    updateCard();
});

document.getElementById("next").addEventListener("click", () => {
    if (currentIndex < cards.length - 1) currentIndex++;
    isFront = true;
    updateCard();
});

document.getElementById("prev").addEventListener("click", () => {
    if (currentIndex > 0) currentIndex--;
    isFront = true;
    updateCard();
});

// 初期状態を設定
updateCard();
