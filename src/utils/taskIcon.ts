const ICON_RULES: [RegExp, string][] = [
  [/market|alışveriş|satın/i, '🛒'],
  [/arkadaş|buluş|görüş/i, '👥'],
  [/spor|gym|antrenman|koş/i, '🏋️'],
  [/fatura|ödeme|öde/i, '💳'],
  [/film|dizi|izle/i, '🎬'],
  [/kitap|oku/i, '📚'],
  [/toplantı|meeting/i, '📅'],
  [/kahve|çay/i, '☕'],
  [/temizlik|çamaşır|ütü/i, '🧺'],
  [/proje|kod|geliştir|tasarım/i, '💻'],
  [/github|repo|deploy|netlify|yayın/i, '🚀'],
  [/hediye|doğum günü/i, '🎁'],
  [/uyu|dinlen/i, '😴'],
]

export function pickTaskIcon(title: string): string {
  const match = ICON_RULES.find(([pattern]) => pattern.test(title))
  return match ? match[1] : '📝'
}
