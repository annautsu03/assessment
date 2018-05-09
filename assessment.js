(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
    * 指定した要素の子どもを全て除去する
    * @param {HTMLElement} element HTMLの要素
    */
    function removeAllChildren(element) {
        while (element.firstChild) { // 子どもの要素があるかぎり削除
            element.removeChild(element.firstChild);
        }
    }

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) { // 名前が空の時は処理を終了する
            return;
        }

        // 診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text='
        + encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    };

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick();
        }
    };

    const answers = [
        '{userName}のすごいところはお茶を濃く入れてしまうことです。{userName}のうっかりなところ、いいって人には結構いいみたい。',
        '{userName}のすごいところは顔です。{userName}に出会った人は、どうにも{userName}が気になって仕方がないでしょう。',
        '{userName}のすごいところは速さです。{userName}スピード感に誰もついていけないかもしれない…たまに振り返るとよいでしょう。',
        '{userName}のすごいところは実家に帰る回数です。{userName}の親御さんはしあわせそう。',
        '{userName}のすごいところは猫好きすぎなところです。猫としてもありがたいようです。',
        '{userName}のすごいところは大胆不敵さです。縦横無尽に世の中を渡る{userName}にみんなくぎ付け。',
        '{userName}のすごいところは感情と裏腹の笑顔です。何があっても笑顔の{userName}はみんなに畏怖をもって受け入れられているでしょう。',
        '{userName}のすごいところは歩き方です。{userName}の個性がどういうわけか歩き方に反映されています。',
        '{userName}のすごいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のすごいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のすごいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のすごいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のすごいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のすごいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のすごいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のすごいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    ];

    /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} userName ユーザーの名前
    * @return {string} 診断結果
    */
    function assessment(userName) {
        // 全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/{userName}/g, userName);
        return result;
    }

    // テストコード
    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
})();
