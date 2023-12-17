export default {
    home: {
        play: 'プレイ',
        scores: 'スコア',
        controls: 'コントロール',
    },
    modes: {
        timed: {
            label: 'タイム',
            description: 'できるまで生き延びる。',
        },
        spin: {
            label: '回転ヒーロー',
            description: '全回転する度１ポイント獲得。',
        },
        collector: {
            label: 'コレクター',
            description: '同じ色のオーブを集める。',
        },
    },
    leaderboard: {
        date: '年月日',
        score: 'スコア',
    },
    controls: {
        keyboard: 'キーボード',
        xbox: 'Xbox',        
        playstation: 'プレーステーション',        
        mobile: 'モバイル',        
    },
    howtoplay: `
        移動、回転、色を変えることができます。<br>
        プレーヤーの色と異なるオーブに触れたらアウトです。<br>
        ゲームモードを選択してゲームを始めましょう。
    `,
    footer: {
        about: 'Kaosについて',        
    },
    pause: {
        resume: '続ける',        
        quit: '辞める',        
    },
    gameover: {
        gameover: 'ゲームオーバー',
        score: 'スコア：',
        restart: 'リスタート',        
        quit: '辞める',        
    },
    hud: {
        nextcolor: '次の色：',
        score: 'スコア：',
    },
    about: `
        <p>
            Kaosはゲーム開発に挑戦した兄弟が開発したウェブゲームです。
            アイディアはもともとコロナの第一緊急事態宣による自粛中に湧き上がってきました。
            <a href='https://developer.mozilla.org/ja/docs/Web/API/Canvas_API'>
                Canvas API
            </a>
            を使用して、フロントエンドに
            <a href='https://vuejs.org/'>VueJS</a>
            を使うことにしました。
        </p>
        <p>
            僕たちはKaos開発をよく楽しんでて、プレヤーも楽しめたらな〜と思っております。
            お時間をいただきありがとうございます。
        </p>
        <p>開発元</p>
    `,
};
