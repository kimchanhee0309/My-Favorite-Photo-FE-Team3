export function mapShopListingToCard(item) {
  const photocard = item.ownership?.photocard;

  return {
    id: item.id,

    photocardId: photocard?.id,
    ownershipId: item.ownership,
    userId: item.userId,

    title: photocard?.name ?? "",
    name: photocard?.name ?? "",
    description: photocard?.description ?? "",
    imageUrl: photocard?.imageUrl ?? "",

    grade: photocard?.grade ?? "",
    genre: photocard?.genre ?? "",

    pricePerUnit: item.pricePerUnit ?? 0,
    quantity: item.quantity ?? 0,
    remainingQuantity: item.remainingQuantity ?? 0,
    status: item.status,

    sellerNickname: item.user?.nickname ?? "",
    nickname: item.user?.nickname ?? "",

    wishGrade: item.wishGrade,
    wishGenre: item.wishGenre,
    wishDescription: item.wishDescription,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function mapExchangeToOffer(exchange) {
  const photocard = exchange.photocard;

  return {
    id: exchange.id,
    status: exchange.status,
    offeredQuantity: exchange.offeredQuantity,
    message: exchange.message ?? "",

    photocardId: photocard?.id,
    name: photocard?.name ?? "",
    title: photocard?.name ?? "",
    description: photocard?.description ?? "",
    imageUrl: photocard?.imageUrl ?? "",
    grade: photocard?.grade ?? "",
    genre: photocard?.genre ?? "",

    proposerId: exchange.proposerId,
    proposerNickname: exchange.proposer?.nickname ?? "",
    nickname: exchange.proposer?.nickname ?? "",

    createdAt: exchange.createdAt,
  };
}
