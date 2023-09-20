import * as admin from "firebase-admin"

export const seedDB = async (db: admin.firestore.Firestore) => {
  const snap = await db.collection("seeds").get()
  if (snap.size) return
  db.collection("seeds").add({
    seeded: true,
  })
  const collections = [
    "users",
    "categories",
    "products",
    "items",
    "orders",
    "actions",
    "correlationActions",
  ]
  for (const collection of collections) {
    await db.collection(collection).listDocuments().then(val => {
      val.forEach(val => {
          val.delete()
      })
    })
  }

  db.collection("users").add({
    name: "Rogério Fictício",
    email: "rogerio.fictício@email.com",
    address: "endereço fictício",
    admin: false,
    createdAt: new Date(),
  })

  const bookCategory = await db.collection("categories").add({
    name: "livro",
    createdAt: new Date(),
  })
  const physicalCategory = await db.collection("categories").add({
    name: "físico",
    createdAt: new Date(),
  })
  const eletroCategory = await db.collection("categories").add({
    name: "eletrônico",
    createdAt: new Date(),
  })
  const clothingCategory = await db.collection("categories").add({
    name: "roupa",
    createdAt: new Date(),
  })


  const product = await db.collection("products").add({
    price: 150.50,
    title: "A Menina que Roubava Livros",
    categoryIds: [bookCategory.id, physicalCategory.id],
    createdAt: new Date(),
  })
  db.collection("products").add({
    price: 500.90,
    title: "Microondas",
    categoryIds: [physicalCategory.id, eletroCategory.id],
    createdAt: new Date(),
  })
  db.collection("products").add({
    price: 50.90,
    title: "Camiseta personalizada",
    categoryIds: [clothingCategory.id],
    createdAt: new Date(),
  })

  db.collection("items").add({
    qt: 1,
    price: 150.50,
    productId: product.id,
    categoryIds: [bookCategory.id, physicalCategory.id],
    createdAt: new Date(),
  })

  const duplicatedDeliveryNoteAction = await db.collection("actions").add({
    type: "duplicated delivery note",
    category: "livro",
    desc: "Gerar guia de remessa duplicada na compra de livros",
    createdAt: new Date(),
  })
  const deliveryNoteAction = await db.collection("actions").add({
    type: "delivery note",
    category: "físico",
    desc: "Gerar guia de remessa duplicada na compra de livros",
    createdAt: new Date(),
  })
  db.collection("correlationActions").add({
    entity: "category",
    entityId: bookCategory.id,
    actionId: duplicatedDeliveryNoteAction.id,
    createdAt: new Date(),
  })
  db.collection("correlationActions").add({
    entity: "category",
    entityId: physicalCategory.id,
    actionId: deliveryNoteAction.id,
    createdAt: new Date(),
  })
}
