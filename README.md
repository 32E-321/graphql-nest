.env.template を参考に.env ファイルを作成する
->DB を用意する

npm install
npx prisma generate // Prisma クライアントの作成
ts-node prisma/seed.ts
npm start // schema.gql の作成
