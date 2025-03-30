-- Создаем таблицы, если они не существуют
CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR NOT NULL UNIQUE,
    "password" VARCHAR NOT NULL,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "avatar" VARCHAR,
    "birthDate" DATE,
    "bio" TEXT,
    "phone" VARCHAR,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "post" (
    "id" SERIAL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "images" TEXT[],
    "userId" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Создаем индексы
CREATE INDEX IF NOT EXISTS "IDX_user_email" ON "user"("email");
CREATE INDEX IF NOT EXISTS "IDX_post_userId" ON "post"("userId");
CREATE INDEX IF NOT EXISTS "IDX_post_createdAt" ON "post"("createdAt"); 