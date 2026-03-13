-- CreateTable
CREATE TABLE "GiveawayEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "boatBrand" TEXT NOT NULL,
    "marketingConsent" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "GiveawayEntry_email_key" ON "GiveawayEntry"("email");
