[![Build Status](https://travis-ci.com/deer-inc/GitHub-Issue-Manager.svg?branch=master)](https://travis-ci.com/deer-inc/GitHub-Issue-Manager)
![MIT License](https://img.shields.io/github/license/deer-inc/github-issue-manager.svg)

# GIM

GIM(GitHub Issue Manager)はGitHubのIssueで工数計算を行うためのツールです。Issueのタイトルに工数（時間）を設定することで、コントリビューターごとの累計稼働時間を算出できます。たとえば開発案件をチケット単位で手の空いているフリーランスに依頼する場合などに使えます。

## Usage

1. Issueのタイトルに工数を記述します。（[Example](https://github.com/deer-inc/github-manager-example-repository)）
2. Issueに担当者をアサインします。
3. アクセストークンを取得し、[GIM](https://deer-inc.github.io/gim/)をアクティベートします。
4. 工数計算をしたいリポジトリのownerとリポジトリ名を入力し、Issueを取得します。
5. 稼働時間が表示されます。
6. 稼働時間をもとに、お好みの請求書作成ツールで請求書を作成してください。（あるいは作成を促してください）

### Note

- Issue取得後に表示される画面右のコントリビューターをクリックすると金額計算ができます。
- パラメーターをつけたURLを共有すると直ちに取得結果を表示できます。（[Example](https://deer-inc.github.io/gim/?owner=deer-inc&name=github-manager-example-repository))

## コントリビュート

機能追加を希望する方はIssueを作成するか、ForkしてPull Requestを出してください。みなさんのコミットを歓迎しています！ 😀

## License

MITライセンスなので自由にご利用ください。
