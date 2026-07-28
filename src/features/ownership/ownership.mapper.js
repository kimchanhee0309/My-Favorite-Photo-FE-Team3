export function mapOwnershipToCard(ownership) {
  const photocard = ownership.photocard;

  return {
    id: ownership.id,
    photocardId: photocard?.id,
    imageUrl: photocard?.imageUrl ?? "",
    title: photocard?.name ?? "",
    description: photocard?.description ?? "",
    grade: photocard?.grade ?? "",
    genre: photocard?.genre ?? "",
    minPrice: photocard?.minPrice ?? 0,
    quantity: ownership.quantity ?? 0,
  };
}
